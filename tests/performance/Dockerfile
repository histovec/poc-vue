############################
# Artillery.io load tester #
############################
FROM node:8-alpine
ARG http_proxy
ARG https_proxy
ARG no_proxy
ARG npm_registry
ARG MIRROR_DEBIAN

# Base dir /app

WORKDIR /artillery

VOLUME /artillery/reports/

# use proxy & private npm registry
RUN if [ ! -z "$http_proxy" ] ; then \
        npm config delete proxy; \
        npm config set proxy $http_proxy; \
        npm config set https-proxy $https_proxy; \
        npm config set no-proxy $no_proxy; \
   fi ; \
   [ -z "$npm_registry" ] || npm config set registry=$npm_registry

RUN npm install -g artillery@1.6.0-2
ENV PERF_MAX_USERS=40
ENTRYPOINT [ "artillery" ]
CMD ["run -e development", "-o reports/report.json", "scenario.yml"]
