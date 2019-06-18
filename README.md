# HistoVec : Acheter un véhicule d’occasion en confiance

HistoVec permet au vendeur de partager à un acheteur intéressé l’historique des faits marquants du véhicule enregistrés dans le fichier national du SIV (Système d’Immatriculation des Véhicules), notamment :

    la date de mise en circulation,
    les changements de propriétaire,
    les sinistres à réparation contrôlée,
    la situation administrative (gage, opposition, vol)
    etc.

Ainsi, HistoVec permet à l’acheteur d’acheter en connaissance de cause, et au vendeur honnête de valoriser son offre.

Prochainement, HistoVec permettra également de connaître l'historique des contrôles techniques et le kilométrage grâce à une interface avec l'UTAC-CERAM.

# Version [en ligne](https://histovec.interieur.gouv.fr)

La version en ligne v0 a été homologuée par le ministère de l'Intérieur et est en phase de généralisation. HistoVec devrait revêtir un caractère obligatoire à terme. L'application permet aujourd'hui de produire 2500 à 3500 rapports uniques par jour. La mesure obligatoire devrait porter ce nombre à environ 15000.

Le code source du présent site comporte l'ensemble des éléments fonctionnels (frontend), et bien sûr ne comporte pas les données, ni les configurations de déploiement.

## données personnelles
Les données en base d'Histovec sont intégralement chiffrées en AES256, et les données personnelles hashées (SHA256).

## composants
La version disponible sur le site fonctionne sur la base des composants suivants :
- nginx 1.15+
- Boostrap 3.4
- Vue.js 2.6+
- Elasticsearch 6.7+
- Docker 18.09+

## collaborez en mode développeur
```
git clone https://github.com/poc-vue
git checkout origin/dev
make dev
```
Le mode de développement lance les services suivant:
- un reverse-proxy nginx (histovec-nginx-dev)
- un serveur node de développement pour le frontend (avec hot reload) (histovec-frontend-dev)
- le serveur de données elasticsearch (histovec-elasticsearch)
- un serveur node de développement pour le backend (histovec-backend)
- un seveur de cache Redis inmemory pour limiter les requêtes à l'API UTAC (histovec-cache)
- un serveur note de bouchon pour l'API UTAC (otc-fake)

Les 4 derniers services servent au développement de la v1, pas encore en production.

## chargement des données

Il existe plusieurs modes de chargement des données.

### données de développement (anonymisées)
Un jeu de donnée de développement est dorénavant disponible pour permettre de développer HistoVec ou l'utiliser pour des tests en interface avec d'autres applications (Capsule, UTAC-Ceram).

Ce jeu de donnée dispose d'identifiant personnels factices associées à des données de véhicules représentatifs de la diversité des véhicules (~2000 pour les plaques SIV, après 2009, et 800 pour les plaques IVT, avant 2009).

Les données sont lisibles via un suite office pour permettre de faire les tests d'insertion dans le formulaire, et seront utilisés prochainement pour des tests fonctionnels automatisés.

Pour les insérer dans la base HistoVec:

```
make data-encrypt index-load
```

Attention, cette opération réalise d'abord une purge de l'index.

pour vérifier le bon chargement des données:

```
make index-status
```

doit fournir les statistiques Elasticsearch, avec environ 3000 données chargées dans l'index `siv`

### chargement de données chiffrées depuis le répertoire local
Si vous disposez d'un jeu de données chiffrées produites par le Ministère pour faire des tests avec HistoVec, celles-ci doivent être placées dans le repertoire `data/encrypted`.

Pour les insérer en base :
```
make index-load
```

### chargement direct depuis le réseau du ministère
Un chargement direct depuis le stockage objet est également possible. Il faut alors disposer des données de paramétrage du stockage objet et les placer dans le fichier `artifacts`.

Une fois ces paramètres configurés, l'insertion directe depuis le stockage objet se fait ainsi :
```
make index-direct-load
```

Il existe également un mode incrémental depuis le stockage objet :
```
make index-direct-update
```

### autres opérations relatives aux données

Pour effacer les données dans Elasticsearch.

```
make index-purge
```

## tester l'application

- rendez-vous sur : http://localhost
- depuis la page d'accueil,  cliquez sur "vendeur" ou "professionnel"
- sur la parge de recherche (mode "vendeur"), entrez les données de la personnes physique (nom, prénom, date de naissance) ou morale (raison sociale, n° SIREN) et les données identifiantes du véhicule (n° d'immatriculaion, n° de formule)
- vous obtenez le rapport. Cliquez sur "Transmettre le rapport" pour obtenir les liens à transmettre à l'acheteur. Celui-ci peut êre copié, envoyé par mail, sms ou QR-code.

Ces opérations peuvent être accélérées en utilisant un copier coller avec les différentes données depuis un tableur.

## mode iso-production (compilé)

L'arrêt des services se fait ainsi :
```
make dev-stop
```

Le mode compilé, correspondant à la production se lance ainsi:
```
make build
make up
```

Il ne lance à ce stade que la v0 d'HistoVec :
- temporairement, un serveur node qui compile l'application
- nginx (avec le code compilé)
- elasticsearch

Les deux phases `build` et `up` permettent de construire les différents éléments (fichiers et répertoires) et structures nécessaires au fonctionnement d'HitoVec.

Pour stopper l'application, vous pouvez utiliser la commande `make down` qui arrête et supprime les conteneurs.

## performances

HistoVec utilise artillery.io pour scenariser ses tests de performance.
Pour lancer l'ensemble des scenarios (environ 15 minutes):
```
make index-stress
```

Ce test n'a de véritable sens qu'avec un index pleinement chargé. Des données factices peuvent être chargées. La volumétrie actuelle d'HistoVec représente 85M de véhicules.

La performance actuellement évaluée (8 vCPU, 8Go de Ram)
- 300 sessions utilisateur / seconde (api v0 actuelle)
- 300 sessions utilisateur / seconde (api v1 avec backend)
- 200 sessions utilisateur / second (api v1 avec bouchon UTAC)


## autres opérations relatives aux conteneurs

Redémarrer Elasticsearch seul :
```
make elasticsearc-stop elasticsearch
```

Redémarrer nginx ou le frontend (en mode dev):
```
make frontend-dev-stop frontend-dev
```

Redémarrer


## Etat du code

[![Build Status](https://travis-ci.org/histovec/histovec-beta.svg?branch=dev)](https://travis-ci.org/histovec/histovec-beta)


## compatibilité navigateur

En affichage, ok jusqu'au search :

  - Edge 15+, ie 11
  - Safari 10.1+
  - Chrome 49+
  - Firefox 47+

