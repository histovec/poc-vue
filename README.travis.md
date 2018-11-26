# build travis

## Prerequis
* Sur https://github.com/histovec/histovec-beta/settings/hooks , sur le repo, ajouter un webhook vers travis
  * Ajouter un webhook vers https://notify.travis-ci.org
    * Ajouter Payload URL: https://notify.travis-ci.org/
    * Selectionner "Which events would you like to trigger this webhook?:" Just the push event

* Authorisation github/travis
  * Autoriser travis et github: https://github.com/settings/applications

* Sur https://travis-ci.org/
  * s'authenfifier avec son compte github
  * activer le build pour le repository https://github.com/histovec/histovec-beta

## Fichier Travis
* Optionnel: Completer le fichier .travis.yml si necessaire
  * section script:
    - make build
    - make test
