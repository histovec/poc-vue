#######################
# Step 1: Base target #
#######################
FROM node:12-slim as base
ARG http_proxy
ARG https_proxy
ARG no_proxy
ARG npm_registry
ARG sass_registry
ARG MIRROR_DEBIAN
ARG app_path
ARG app_name
ARG app_ver
ENV APP ${APP}
ENV APP_VERSION ${app_ver}

WORKDIR /$app_path

# update debian w/proxy & mirror
RUN echo "$http_proxy $no_proxy" && set -x && [ -z "$MIRROR_DEBIAN" ] || \
   sed -i.orig -e "s|http://deb.debian.org\([^[:space:]]*\)|$MIRROR_DEBIAN/debian9|g ; s|http://security.debian.org\([^[:space:]]*\)|$MIRROR_DEBIAN/debian9-security|g" /etc/apt/sources.list
RUN apt-get update

# install git in case of github deps
RUN buildDeps="git" ; \
   apt-get install -qy --no-install-recommends $buildDeps ; \
   git config --global url."https://".insteadOf git://

# use proxy & private npm registry
RUN if [ ! -z "$http_proxy" ] ; then \
        npm config delete proxy; \
        npm config set proxy $http_proxy; \
        npm config set https-proxy $https_proxy ; \
        npm config set no-proxy $no_proxy; \
   fi ; \
   [ -z "$npm_registry" ] || npm config set registry=$npm_registry; \
   [ -z "$sass_registry" ] || npm config set sass_binary_site=$sass_registry;

RUN npm i npm@latest -g

COPY package.json ./
RUN npm --no-git-tag-version version ${APP_VERSION}
RUN npm install
RUN npm audit fix --registry=https://registry.npmjs.org

################################
# Step 2: "development" target #
################################
FROM base as development
ARG http_proxy
ARG https_proxy
ARG no_proxy
ARG npm_registry
ARG sass_registry
ARG MIRROR_DEBIAN
ARG app_path
ARG app_name
ARG app_ver
ENV APP ${APP}
ENV APP_VERSION ${app_ver}

VOLUME /$app_path/src
VOLUME /$app_path/build
VOLUME /$app_path/config
VOLUME /$app_path/dist

EXPOSE 8080
CMD ["npm","run","dev"]

################################
# Step 3:   "build" target     #
################################
FROM base as build
ARG http_proxy
ARG https_proxy
ARG no_proxy
ARG npm_registry
ARG sass_registry
ARG MIRROR_DEBIAN
ARG app_path
ARG app_name
ARG app_ver
ENV APP ${APP}
ENV APP_VERSION ${app_ver}

VOLUME /$app_path/dist

COPY index.html ./
COPY .babelrc .editorconfig .eslintignore .eslintrc.js ./
COPY src src
COPY config config
COPY build build
COPY static static

CMD ["npm","run","build"]

################################
# Step 4:"build-deploy" target #
################################
FROM base as build-deploy
ARG http_proxy
ARG https_proxy
ARG no_proxy
ARG npm_registry
ARG sass_registry
ARG MIRROR_DEBIAN
ARG app_path
ARG app_name
ARG app_ver
ENV APP ${APP}
ENV APP_VERSION ${app_ver}

COPY ${app_name}-${app_ver}-frontend.tar.gz .

RUN  set -ex ; tar -zxvf ${app_name}-${app_ver}-frontend.tar.gz  && \
     npm run build 2>&1 | tee npm.log; egrep -E '(ERROR|error)' npm.log && exit 1 ; rm -rf npm.log \
     rm -rf /${app_name}-${app_ver}-frontend.tar.gz

CMD ["npm","run","build"]
