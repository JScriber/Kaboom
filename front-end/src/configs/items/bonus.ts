import { Duration, Item } from 'src/app/components/create-server/create-server-settings/list-selector/ListSelector.model';

// TODO: Migrate in back.
export const BONUS_CONF: Item[] = [
  {
    name: 'Passe murailles',
    description: 'Permet de passer à travers les murs. Ne rend pas intangible.',
    duration: Duration.S_10,
    toggled: true
  },
  {
    name: 'Téléportation',
    description: 'Téléporte aléatoirement à un autre endroit.',
    duration: Duration.None,
    toggled: true
  },
  {
    name: 'Combinaison anti-feu',
    description: 'Permet de résister aux déflagrations des bombes.',
    duration: Duration.S_10,
    toggled: true
  },
  {
    name: 'Bomb-Up',
    description: 'Augmente le nombre de bombes pouvant être posées simultanément.',
    duration: Duration.S_10,
    toggled: true
  },
  {
    name: 'Super vitesse',
    description: 'Augmente la vitesse du personnage.',
    duration: Duration.S_10,
    toggled: true
  },
  {
    name: 'Flamme jaune',
    description: 'Augmente la portée des bombes.',
    duration: Duration.S_10,
    toggled: true
  },
  {
    name: 'Flamme rouge',
    description: 'L\'explosion d\'une bombe ne connait aucune limite.',
    duration: Duration.None,
    toggled: true
  },
  {
    name: 'Désamorceur',
    description: 'Permet de désamorcer une bombe avant son explosion.',
    duration: Duration.S_10,
    toggled: true
  },
  {
    name: 'Gant',
    description: 'Permet de pousser les bombes.',
    duration: Duration.S_10,
    toggled: true
  },
  {
    name: 'Poussée',
    description: 'Permet de pousser d\'autres joueurs.',
    duration: Duration.S_10,
    toggled: true
  },
  {
    name: 'Coeur',
    description: 'Permet de gagner un coeur',
    duration: Duration.None,
    toggled: true
  },
  {
    name: 'Vie',
    description: 'Permet de gagner une vie supplémentaire.',
    duration: Duration.None,
    toggled: true
  },
  {
    name: 'Échange',
    description: 'Échange la position avec un autre joueur aléatoirement.',
    duration: Duration.None,
    toggled: true
  }
];

