FROM node:10
# on récupère l'image de la version 10 de node car une des dépenses
# de notre application est compilé sur node.js version 10
# Donc on ne peut pas la version plus récente.
LABEL version="1.0"
# ajout de la version en tant que label. Pas d'utilité technique mais
# permet de manipuler les LABEL
RUN mkdir -p /usr/src/app
# RUN permet de lancer une commande. Ici, on crée un répertoire pour
# notre application.
WORKDIR /usr/src/app
# On défini notre dossier de travail dans le répertoire qu'on vient de
# creer.
COPY package.json /usr/src/app/
# on copie le fichier "package.json" qui contient toutes les informations
# à propos des dépendances dans le repertoire.
RUN npm install
# on lance "npm install" qui va installer toutes les dépendances de
# notra application web.
COPY . /usr/src/app
# Enfin, on copie les données de notre application.

EXPOSE 8080
# On ouvre le port 8080.

CMD [ "npm", "start" ]
# On execute dans le terminal propre à docker "npm start".

