############################
# Artillery.io load tester #
############################
FROM python:3-slim
ARG http_proxy
ARG https_proxy
ARG no_proxy
ARG MIRROR_DEBIAN

# Base dir /app

WORKDIR /dataprep

VOLUME /dataprep/decrypted/
VOLUME /dataprep/encrypted/

RUN echo "$http_proxy $no_proxy" && set -x && [ -z "$MIRROR_DEBIAN" ] || \
   sed -i.orig -e "s|http://deb.debian.org\([^[:space:]]*\)|$MIRROR_DEBIAN/debian9|g ; s|http://security.debian.org\([^[:space:]]*\)|$MIRROR_DEBIAN/debian9-security|g" /etc/apt/sources.list
RUN apt-get update

RUN buildDeps="build-essential libssl-dev libffi-dev python-dev" ; \
   apt-get install -qy --no-install-recommends $buildDeps ;

COPY requirements.txt ./
RUN pip install `echo $http_proxy | sed 's/\(\S\S*\)/--proxy \1/'` --upgrade pip
RUN pip install `echo $http_proxy | sed 's/\(\S\S*\)/--proxy \1/'` -r requirements.txt

COPY crypt.py ./
COPY inject.py ./

ENTRYPOINT [ "python" ]
CMD ["crypt.py", "decrypted/", "encrypted/"]
