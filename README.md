# HistoVec : Acheter un véhicule d’occasion en confiance

HistoVec permet au vendeur de partager à un acheteur intéressé l’historique des faits marquants du véhicule enregistrés dans le fichier national du SIV (Système d’Immatriculation des Véhicules), notamment :

    la date de mise en circulation,
    les changements de propriétaire,
    les sinistres à réparation contrôlée,
    la situation administrative (gage, opposition, vol)
    etc.

Ainsi, HistoVec permet à l’acheteur d’acheter en connaissance de cause, et au vendeur honnête de valoriser son offre.

# Version bêta [en ligne](https://histovec.interieur.gouv.fr)

La version bêta est une version rapide mais homologuée par le ministère de l'Intérieur destinée à piloter une expérimentation avec les usagers, avant une généralisation d'ici la fin 2018.

Le code source du présent site comporte l'ensemble des éléments fonctionnels (frontend), et bien sûr ne comporte pas les données, ni les configurations de déploiement.

## données personnelles
Les données en base d'Histovec sont intégralement chiffrées en AES256, et les données personnelles hashées (SHA256).

## composants
La version disponible sur le site fonctionne sur la base des composants suivants :
- nginx
- Boostrap 3
- Vue.js 2
- Elasticsearch 6
- Docker

## collaborez en mode développeur
```
git clone https://github.com/poc-vue
git checkout origin/dev
make build
make up
```
Les deux phases `build` et `up` permettent de construire les différents éléments (fichiers et répertoires) et structures nécessaires au fonctionnement d'Hitovec.

Pour stopper l'application, vous pouvez utiliser la commande `make down` qui arrête et supprime les conteneurs.

## changement des données

Pour charger les données (vous devez disposer du fichier `siv.csv.gz.gpg` et de la passphrase.
Copiez les données dans le répertoire `sample_data` (à créer le cas échéant).

Créer l'index et chargez les données:

```
make index-create
make index-load
```
Ce processus peut prendre un peu de temps (3 à 4 minutes pour 1M de véhicules)

Pour effacer les données :
```
make index-purge
```

## tester l'application

- rendez-vous sur : http://localhost
- depuis la page d'accueil,  cliquez sur "vendeur" ou "professionnel"
- sur la parge de recherche (mode "vendeur"), entrez les données de la personnes physique (nom, prénom, date de naissance) ou morale (raison sociale, n° SIREN) et les données identifiantes du véhicule (n° d'immatriculaion, n° de formule)
- vous obtenez le rapport. Cliquez sur "Transmettre le rapport" pour obtenir les liens à transmettre à l'acheteur. Celui-ci peut êre copié, envoyé par mail, sms ou QR-code.

## compiler

pour compiler la version statique :
```
make build
make up
```

## limitations
- version mono-noeud elasticsearch
- pas d'api pro à ce stade
- pas de donnée de test

## source
Le code a été développé en quelques heures à partir de :
https://github.com/rhanka/vue-python-docker-dev-kit

## Etat du code

[![Build Status](https://travis-ci.org/histovec/histovec-beta.svg?branch=dev)](https://travis-ci.org/histovec/histovec-beta)

