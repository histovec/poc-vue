##############################################
# WARNING : THIS FILE SHOULDN'T BE TOUCHED   #
#    FOR ENVIRONNEMENT CONFIGURATION         #
# CONFIGURABLE VARIABLES SHOULD BE OVERRIDED #
# IN THE 'artifacts' FILE, AS NOT COMMITTED  #
##############################################


export PORT=80
export APP=histovec
export COMPOSE_PROJECT_NAME=${APP}
export APP_PATH := $(shell pwd)
export APP_VERSION	:= $(shell git describe --tags || cat VERSION )
export BACKEND=${APP_PATH}/backend
export FRONTEND=${APP_PATH}/frontend
export LOGS=${APP_PATH}/log
export DC_DIR=${APP_PATH}
export DC_PREFIX=${DC_DIR}/docker-compose
export USE_TTY := $(shell test -t 1 && USE_TTY="-t")
export ES_MEM=2048m
export ES_HOST=elasticsearch
export API_USER_LIMIT_RATE=1r/m
export API_USER_BURST=3 nodelay
export API_USER_SCOPE=http_x_forwarded_for
export API_GLOBAL_LIMIT_RATE=5r/s
export API_GLOBAL_BURST=20 nodelay


# data prep (data not included in repo)
export datadir=sample_data
export datasource=${datadir}/siv.csv.gz
export datasource_crypt=${datadir}/siv.csv.gz.gpg
export datasource_json=${datadir}/siv.json.gz
export dataset=siv
export ES_CHUNK=5000
export ES_VERBOSE=100000
export ES_JOBS=3
export FROM=1
export stress=10
export stress_verbose=1000
export PASSPHRASE=CHANGEME
export settings={"index": {"number_of_shards": 1, "refresh_interval": "300s", "number_of_replicas": 0}}
export mapping={"_all": {"enabled": false}, "dynamic": false, "properties": {"idv": {"type": "keyword"}, "ida1": {"type": "keyword"}, "ida2": {"type": "keyword"}}}
export header="idv;ida1;ida2;v"
export index_log=${datadir}/index.log.gz

date                := $(shell date -I)
id                  := $(shell cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 8 | head -n 1)

vm_max_count		:= $(shell cat /etc/sysctl.conf | egrep vm.max_map_count\s*=\s*262144 && echo true)

dummy               := $(shell touch artifacts)
include ./artifacts

DC := docker-compose

install-prerequisites:
ifeq ("$(wildcard /usr/bin/docker)","")
	echo install docker-ce, still to be tested
	sudo apt-get update
	sudo apt-get install \
        apt-transport-https \
        ca-certificates \
        curl \
        software-properties-common

	curl -fsSL https://download.docker.com/linux/${ID}/gpg | sudo apt-key add -
	sudo add-apt-repository \
                "deb https://download.docker.com/linux/ubuntu \
                `lsb_release -cs` \
                stable"
	sudo apt-get update
	sudo apt-get install -y docker-ce
	@(if (id -Gn ${USER} | grep -vc docker); then sudo usermod -aG docker ${USER} ;fi) > /dev/null
endif
ifeq ("$(wildcard /usr/bin/gawk)","")
	@echo installing gawk
	@sudo apt-get install -y gawk
endif
ifeq ("$(wildcard /usr/bin/jq)","")
	@echo installing jq
	@sudo apt-get install -y jq
endif
ifeq ("$(wildcard /usr/bin/parallel)","")
	@echo installing parallel
	@sudo apt-get install -y parallel
endif
ifeq ("$(wildcard /usr/local/bin/docker-compose)","")
	@echo installing docker-compose
	@sudo curl -s -L https://github.com/docker/compose/releases/download/1.19.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
	@sudo chmod +x /usr/local/bin/docker-compose
endif

index-purge: network elasticsearch
	@sleep 3
	@docker exec ${APP}-elasticsearch curl -s -XPUT localhost:9200/${dataset}/_settings -H 'content-type:application/json' -d'{"index.blocks.read_only": false}' | sed 's/{"acknowledged":true.*/${dataset} index prepared for deletion\n/;s/.*no such index.*//'
	@docker exec ${APP}-elasticsearch curl -s -XDELETE localhost:9200/${dataset} | sed 's/{"acknowledged":true.*/${dataset} index purged\n/;s/.*no such index.*//'
	@docker exec ${APP}-elasticsearch curl -s -XDELETE localhost:9200/contact | sed 's/{"acknowledged":true.*/contact index purged\n/;s/.*no such index.*//'
	@docker exec ${APP}-elasticsearch curl -s -XDELETE localhost:9200/feedback | sed 's/{"acknowledged":true.*/feedback purged\n/;s/.*no such index.*//'
	@echo

index-create: network elasticsearch
ifeq ("$(shell docker exec -i ${USE_TTY} ${APP}-elasticsearch curl -s -XGET 'localhost:9200/${dataset}' | grep mapping | wc -l)","1")
else
	@echo
	@docker exec -i ${USE_TTY} ${APP}-elasticsearch curl -s -H "Content-Type: application/json" -XPUT localhost:9200/${dataset} -d '{"settings": ${settings}, "mappings": { "${dataset}": ${mapping}}}' | sed 's/{"acknowledged":true.*/${dataset} index created with mapping\n/'
	@docker exec -i ${USER_TTY} ${APP}-elasticsearch curl -s -XPUT localhost:9200/contact | sed 's/{"acknowledged":true.*/contact index created\n/'
	@docker exec -i ${USE_TTY} ${APP}-elasticsearch curl -s -XPUT localhost:9200/feedback | sed 's/{"acknowledged":true.*/feedback created\n/'
	@echo
	@echo wating a few seconds for index being up
	@sleep 10

endif

index-status: network elasticsearch
	@docker exec -i ${USE_TTY} ${APP}-elasticsearch curl -s -XGET localhost:9200/${dataset}?pretty
	@docker exec -i ${USE_TTY} ${APP}-elasticsearch curl -s -XGET localhost:9200/_cat/indices

index-load: index-create
ifeq ("$(wildcard ${datasource})","")
	@echo WARNING: missing data source ${datasource}
endif
ifeq ("$(shell docker exec -i ${USE_TTY} ${APP}-elasticsearch curl -s -XGET 'localhost:9200/${dataset}' | grep mapping | wc -l)","1")
	@# split -l ${ES_CHUNK} --filter=
	@# parallel : parallel --no-notice --block-size 10M -N ${ES_CHUNK} -j${ES_JOBS} --pipe
	@((zcat ${datasource}) || (gpg --quiet --batch --yes --passphrase "${PASSPHRASE}" -d ${datasource_crypt} | gunzip)) | awk 'BEGIN{n = 1;print "decrypting data - injection into elasticsearch will begin from line ${FROM}" > "/dev/stderr"; print ${header}}{if ((n == 1) || (n>=${FROM})) {print};if ((n%1000000)==0) {print "decrypted " n " lines" > "/dev/stderr"} n++}' |  perl -e 'while(<>){s/\"(.*?);(.*?)\"/\1,\2/g;print}' | perl -e '$$header=1;while(<>){ chomp;if ($$header) {@fields=split(/;/,$$_);$$header=0; }else {print "{\"index\": {\"_index\": \"'"${dataset}"'\", \"_type\": \"'"${dataset}"'\"}}\n";$$i=0;print "{".join(", ",map("\"@fields[$$i++]\": \"$$_\"",split(/;/,$$_)))."}\n";}}'| sed 's/\\//g;s/""/"/g;s/ ",/ "",/g;s/"{/{/g;s/}"/}/g;s/"\[/[/g;s/\]"/]/g' | parallel --no-notice --block-size 10M -N ${ES_CHUNK} -j${ES_JOBS} --pipe 'docker exec -i ${APP}-elasticsearch curl -s -H "Content-Type: application/json" localhost:9200/_bulk  --data-binary @-;echo ' | jq -c '.items[].index.result' | awk 'BEGIN{ok=${FROM}-1;ko=0}{if ($$1 == "\"created\"") { ok++ } else {ko++} if (((ok+ko)%${ES_VERBOSE} == 0)) {print strftime("%Y%m%d-%H:%M") " indexed:" ok " rejected:" ko}}'
	@docker exec -i ${USE_TTY} ${APP}-elasticsearch curl -XPUT localhost:9200/${dataset}/_settings -H 'content-type:application/json' -d'{"index.refresh_interval": "1s", "index.blocks.read_only": true}'
endif


index-test:
ifeq ("$(shell docker exec -i ${USE_TTY} ${APP}-elasticsearch curl -s -XGET 'localhost:9200/${dataset}' | grep mapping | wc -l)","1")
	@echo index test
	@gpg --quiet --batch --yes --passphrase "${PASSPHRASE}" -d sample_data/siv.csv.gz.gpg | gunzip| awk -F ';' 'BEGIN{n=0}{n++;if (n>1){print $$1}}' | parallel --no-notice -j1 'curl -s -XGET localhost:${PORT}/histovec/api/v0/id/{} ' | jq -c '{"took": .took, "hit": .hits.total}'
endif

index-stress:
ifeq ("$(shell docker exec -i ${USE_TTY} ${APP}-elasticsearch curl -s -XGET 'localhost:9200/${dataset}' | grep mapping | wc -l)","1")
	@echo stress test
	@gpg --quiet --batch --yes --passphrase "${PASSPHRASE}" -d sample_data/siv.csv.gz.gpg | gunzip| awk -F ';' 'BEGIN{n=0;print "reading file from line ${FROM}" > "/dev/stderr"}{n++;if (n>${FROM}){print $$1}}' | parallel --no-notice -j${stress} 'curl -s -XGET localhost:${PORT}/histovec/api/v0/id/{}' | jq -c -r '[.took, .hits.total] | @csv' | awk -F ',' 'BEGIN{n=0;t=0}{n++;t+=$$1;ok+=$$2;if ((n%${stress_verbose})==0) {total+=n; printf("%s with ${stress} parallel threads, total %d calls, %.0f%% hit, each response takes %.2fms\n",strftime("%Y%m%d-%H:%M"),total,ok/n*100,t/n);ok=0;t=0;n=0}}'
endif

docker-clean: stop
	docker container rm ${APP}-build-front ${APP}-nginx

frontend-clean:
	@echo cleaning ${APP} frontend npm dist
	sudo rm -rf ${FRONTEND}/dist

clean: index-purge docker-clean frontend-clean

network-stop:
	@echo cleaning ${APP} docker network
	docker network rm ${APP}

network: install-prerequisites
	@docker network create ${APP} 2> /dev/null; true

tor:
ifeq ("$(wildcard nginx/tor-ip.conf)","")
	wget -q https://www.dan.me.uk/torlist/ -O - | sed 's/^/deny /g; s/$$/;/g' >  nginx/tor-ip.conf
endif

vm_max:
ifeq ("$(vm_max_count)", "")
	@echo updating vm.max_map_count $(vm_max_count) to 262144
	sudo sysctl -w vm.max_map_count=262144
endif

elasticsearch: vm_max
ifeq ("$(wildcard ${BACKEND}/esdata/)","")
	@echo creating elasticsearch data directory
	@mkdir -p ${BACKEND}/esdata
	@chmod 777 ${BACKEND}/esdata/.
endif
	@${DC} -f ${DC_PREFIX}-elasticsearch.yml up -d 2>&1 | grep -v orphan

elasticsearch-stop:
	${DC} -f ${DC_PREFIX}-elasticsearch.yml down

first-backup:
	@mkdir -p ${BACKEND}/backup/esdata && \
		echo `date +'%Y%m%d_%H:%M'` first rsync && \
		rsync -a ${BACKEND}/esdata/. ${BACKEND}/backup/esdata/. 
last-backup:
	@mkdir -p ${BACKEND}/backup/esdata && \
		echo `date +'%Y%m%d_%H:%M'` last rsync && \
		rsync -a ${BACKEND}/esdata/. ${BACKEND}/backup/esdata/.

post-backup:
	@echo `date +'%Y%m%d_%H:%M'` taring && \
        	cd ${BACKEND}/backup/ && tar cf `date +%Y%m%d`_histovec.tar esdata/.
		echo `date +'%Y%m%d_%H:%M'` cleaning tmp dir && \
		rm -rf ${BACKEND}/backup/esdata && \
		echo `date +'%Y%m%d_%H:%M'` backup done in ${BACKEND}/backup/`date +%Y%m%d`_histovec.tar

backup: first-backup elasticsearch-stop last-backup elasticsearch post-backup

frontend-dev: network tor
	@echo docker-compose up frontend for dev ${VERSION}
	${DC} -f ${DC_PREFIX}-dev-frontend.yml up --build -d --force-recreate 2>&1 | grep -v orphan

frontend-dev-stop:
	${DC} -f ${DC_PREFIX}-dev-frontend.yml down

dev-log:
	${DC} -f ${DC_PREFIX}-dev-frontend.yml logs
	${DC} -f ${DC_PREFIX}-backend.yml logs

dev: network elasticsearch frontend-dev

dev-stop: backend-stop elasticsearch-stop frontend-dev-stop network-stop


frontend-build: network
	@echo building ${APP} frontend
	@echo building frontend in ${FRONTEND}
	@sudo mkdir -p ${FRONTEND}/dist-build
	${DC} -f ${DC_PREFIX}-build-frontend.yml up --build 2>&1 | grep -v orphan
	mkdir -p ${FRONTEND}/dist/
	@sudo rsync -avz --delete ${FRONTEND}/dist-build/. ${FRONTEND}/dist/.

build: frontend-build

update:
	git pull
	@echo building ${APP} frontend
	@echo building frontend in ${FRONTEND}
	@sudo mkdir -p ${FRONTEND}/dist-build
	${DC} -f ${DC_PREFIX}-build-frontend.yml up --build 2>&1 | grep -v orphan
	mkdir -p ${FRONTEND}/dist/
	@sudo rsync -avz --delete ${FRONTEND}/dist-build/. ${FRONTEND}/dist/.

frontend-stop:
	@${DC} -f ${DC_PREFIX}-run-frontend.yml down

frontend: network tor
	@${DC} -f ${DC_PREFIX}-run-frontend.yml up -d 2>&1 | grep -v orphan


up: network elasticsearch frontend

down: frontend-stop elasticsearch-stop network-stop
