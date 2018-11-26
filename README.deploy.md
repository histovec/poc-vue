# Construction des elements d'histovec:
```
 # construction des images nginx+frontend et elasticsearch
 make build-all-images
 # sauvegarde des image en format tar
 make save-images
 # construction de l'archive du depot git
 make build-archive
 # construction de l archive, des images, sauvegarde des images (build-all-images+save-images+build-archive)
 make build-all
 # publication des elements
 make publish
```
# elements en entrée:
  - DC_BUILD_FRONTEND = docker-compose-build-deploy-frontend.yml
  - DC_RUN_NGINX_FRONTEND = docker-compose-run-nginx-frontend.yml
  - DC_ELASTICSEARCH = docker-compose-elasticsearch.yml

# elements en sortie sont:
  - fichier VERSION (APP_VERSION): histovec-VERSION
  - archive du depot git: histovec-${APP_VERSION}-archive.tar.gz et latest
  - frontend genere (generation javascript/html): histovec-${APP_VERSION}-frontend-dist.tar.gz et latest
  - image nginx contenant nginx et frontend genere (APP_VERSION et latest): histovec-nginx-${APP_VERSION}-image.tar
  - image elasticsearch (APP_VERSION et latest): histovec-elasticsearch-${APP_VERSION}image.tar

# Les elements sont generes dans le repertoire BUILD_DIR=histovec-build
```
 histovec-VERSION
 histovec-${APP_VERSION}-archive.tar.gz
 histovec-latest-archive.tar.gz
 histovec-${APP_VERSION}-frontend-dist.tar.gz
 histovec-nginx-latest-image.tar
 histovec-nginx-${APP_VERSION}-image.tar
 histovec-elasticsearch-latest-image.tar
 histovec-elasticsearch-${APP_VERSION}image.tar

```

# Publication des elements generes
En environnement openstack, les elements sont uploade dans un container swift du tenant de l'environnement
  * PUBLISH_URL_APP_VERSION
  * PUBLISH_URL_LATEST_VERSION

```
# generation d'un token temporaire
eval $(openstack --insecure token issue -f shell -c id -c project_id)
openstack_token=${id:-}
openstack_project_id=${project_id:-}

make publish \
 openstack_url="https://object-store.mycloud/v1" \
 openstack_auth_id="AUTH_${openstack_project_id}" \
 openstack_token="${openstack_token}"
)
```
