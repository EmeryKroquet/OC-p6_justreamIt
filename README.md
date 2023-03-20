# OpenClassrooms Projet 6 JustStreamIt

![](justreamit.png)

## Développez une interface utilisateur pour une application web Python

Ce projet est dans le but Interagir avec une API REST.
De Développer la partie Front-End d’une application avec HTML, CSS et JavaScript.

Le projet OCMovies-API est une application web à éxécuter localement dans le cadre de projets éducatifs. Cette application est implémentée sous la forme d'une API REST. Elle fournit des informations cinématogratphiques à partir d'urls interrogeables à l'aide d'un client HTTP graphique comme un navigateur web ou postman, ou d'un client HTTP programmatique comme requests en python ou fetch/axios en javascript. Les points d'entrées fournis par cette API de test sont consultables en lecture-seule avec des points d'entrée limités aux requêtes GET.

## I. Comment télécharger le projet depuis le depos Github sur son ordinateur ?

1. Cloner ce dépôt de code à l'aide de la commande:
   `$ git clone clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git`

2. Rendez-vous depuis un terminal à la racine du répertoire ocmovies-api-fr avec la commande:
   `$ cd OCMovies-api-FR-EN `

3. Créer un environnement virtuel pour le projet avec
   `$ python -m venv env` sous windows ou
   `$ python3 -m venv env` sous macos ou linux.

4. Activez l'environnement virtuel avec
   `$ env\Scripts\activate` sous windows ou
   `$ source env/bin/activate` sous macos ou linux.

5. Installez les dépendances du projet à l'aide de la commande:
   `$ pipenv install`

6. Créer et alimenter la base de données

7. Démarrer le serveur

### Comment installer le projet ?

### Comment installer les dépence dependances du projet ?

`$ pipenv install`

### Comment alimenter la base de données ?

Entrez la commande:
` $ pipenv run python manage.py create_db`

### Comment demarer le projet ?

Démarrer le serveur avec pipenv run:
`$ python manage.py runserver`
