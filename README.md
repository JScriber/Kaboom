- [Comptes rendus](#comptes-rendus)
  - [Janvier 2019](#janvier-2019)
    - [Résumé](#r%C3%A9sum%C3%A9)
    - [Constat](#constat)
    - [Objectifs prochaine séance](#objectifs-prochaine-s%C3%A9ance)
  - [Mars 2019](#mars-2019)
    - [Résumé](#r%C3%A9sum%C3%A9-1)
    - [Constat](#constat-1)
  - [Mai 2019](#mai-2019)
    - [Résumé](#r%C3%A9sum%C3%A9-2)
      - [Retour d'Angular](#retour-dangular)
      - [Tests avec Phaser](#tests-avec-phaser)
      - [Autre](#autre)

# Comptes rendus

## Janvier 2019

### Résumé

- Pour la gestion de projet, nous nous sommes tournés vers GitHub, et ce pour tout réaliser. En effet, ce dernier nous permet de créer nos tâches, valider nos merges request, créer des versions ainsi que des deadlines, également il nous permet d'associer des catégories à nos tâches (ce qui nous sert à trouver toutes les tâches liées au back-end par exemple). Nous abandonons alors Trello qui réflétait mal le projet et sa gestion.
 
- De nombreux choix technologiques ont été effectués. Il est alors prévu d'utiliser les technologies suivantes : 
  - `Nest` (framework Node.js fortement inspiré de Spring Boot et Angular)
  - `Redis` (caching. Base de données en mémoire. Mongo a été testé mais n'a pas été retenu, étant moins performant que Redis pour notre usage)
  - `Postgrès` (Notre SGBD de prédilection)
  - `React` (client web)

- Certaines expérimentations ont été faites en parallèle du projet, avec la réalisation d'un labyrinthe tridimensionelle avec THREE.js notamment.

- Un algorithme optimisé de génération de labyrinthe a été conçu. Il sera réutilisable pour la génération aléatoire du terrain dans la partie `Edit Map` de l'applicattion.

- Pour l'architecture du back-end, nous pensons nous tourner vers une architecture CQRS à l'image de NGRX/NGXS et Redux. Cette architecture est encore à tester au niveau des performances et de la faisabilité. La partie REST classique est terminée. En effet, nous avons nos entités et nos controllers. La sécurité est mise en place avec le système de tokens.

- Création d'un service de communication avec le back-end sur le client web.

- Utilisation de Docker avec docker-compose. Celui-ci nous créé un Postgrès et un Redis prêt à l'emploi pour nos besoins.

### Constat

- Retours de décisions sur les technologies utilisées. Cependant, cela nous a permis d'expérimenter des choses et justifier nos choix. 

- Démotivation des membres du projet. Des problèmes ont été rencontrés pour lancer Docker sur les PC de ceux étant sous Windows.

### Objectifs prochaine séance

- Terminer les vues
- Avoir un début de jeu avec au moins un personnage se déplacant à l'écran.
- Commencer à écrire la logique métier dans le back-end.

## Mars 2019

### Résumé

- L'architecture CQRS est finalement non utilisée. La cause étant que cette architecture ne permet pas de distribuer un contexte entre les « handlers » (le contexte étant en l’occurrence l’état du jeu). Chaque « handler » est obligé de faire sa récupération et sa sauvegarde de l’état du jeu, ce qui, en plus de la recherche de l’handler de la commande passée, consomme trop de ressources.

- L'architecture de jeu finale déterminée et implémentée est alors la suivante: En remplacement du CQRS, nous nous sommes tournés davantage vers les fonctionnalités du JavaScript en profitant notamment du système de promesses, enrichie avec `RXJS` pour une gestion événementielle. De plus, nous avons utilisé des références vers des méthodes de service dans notre contrôleur. Cela nous permet alors de faire la séparation entre le contrôleur, ici les websockets, et la logique métier présente dans le service. Également nous avons intégré un système de queues, permettant d’attendre que la ressource, ici l’état du jeu, se libère pour être modifiée.
  
- L’état du jeu est perpétuellement envoyé à un intervalle donné à tous les clients connectés au serveur.

### Constat

- Les membres ne sont plus motivés par le projet.
- Remise en question de React, et notamment accusations sur le TypeScript qui serait « trop restrictif ». Après échange, le TypeScript ne sera pas supprimé du projet. En revanche, il est possible que React soit remplacé par une technologie plus adaptées.

## Mai 2019

### Résumé

#### Retour d'Angular

- Abandon de React pour le client web. Les raisons sont les suivantes : 
  - Technologie peu adaptée à une application de cette taille. Le système de routeur est peu convaincant
  - Problèmes d’intégration de Phaser 3
  - Multiples hacks pour parvenir à nos fins. Nous pouvons là lister la traduction, la communication avec le web service, la gestion des routes, la restriction des accès, etc.
  - Les membres ne montrent pas plus d'intéret pour la technologie, initialement démocratiqement choisie pour motiver les développeurs.

- Retour sur Angular le 18 mai 2019. Les correspondances au niveau des bibliothèques sont les suivantes : 

  - Formik et Yup → Formulaires réactifs Angular.
  - Redux et Redux router → Router Angular (intégré). Système de restriction d’accès mis au point avec le système de « guard » d’Angular.
  - Material UI → Angular Material. Bibliothèques de composants graphiques directement produits par Google.
  - Traduction → ngx-translate.

- Le passage à Angular a également permis de faire de la validation de DTO (système de sérialisation/déserialisation). Ainsi nous avons en plus du typage interne avec TypeScript, un typage à l’utilisation de l’application.

- Un service d'envoi de notifications a été mis en place

- La gestion du compte (création du compte, authentification, modification du compte, changement de mot de passe) a été remise en place avec l'Angular. 

#### Tests avec Phaser

- Création d’un petit jeu « Super Luigi » à l’aide de Phaser 2 CE. Ceci a permis d’apprendre à maîtriser le framework, également de découvrir ses faiblesses.

- Renseignement sur Phaser 3 favoriser la modularité de l’application (création de scènes, etc). Celui-ci apporte en plus une API plus consistante.
- Création d’une tilemap avec le logiciel « Tiled ». Celle-ci peut être exportée en JSON et importée directement dans Phaser.

- Création de la base du jeu, et intégration dans le client Angular. Nous avons une gestion des tiles, une gestion des collisions, et une représentation matricielle de la carte.

#### Autre

- 20 mai 2019 : Les deux autres membres quittent officiellement le projet.

- Le projet est réévalué pour être réalisé par une seule personne. Le résultat est alors que la partie *Edition de cartes* est rendue optionnelle, tout comme la partie *Statistiques*.
