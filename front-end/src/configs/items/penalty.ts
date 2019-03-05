import { Duration, Item } from 'src/app/components/create-server/create-server-settings/list-selector/ListSelector.model';

// TODO: Migrate in back.
export const PENALTY_CONF: Item[] = [
  {
    name: 'Inversion',
    description: 'Les touches directionnelles sont inversées.',
    duration: Duration.S_10,
    toggled: true
  },
  {
    name: 'Bomb-Down',
    description: 'Diminue le nombres de bombes pouvant être posées simultanément.',
    duration: Duration.S_10,
    toggled: true
  },
  {
    name: 'Flamme bleue',
    description: 'Diminue la portée des bombes.',
    duration: Duration.S_10,
    toggled: true
  },
  {
    name: 'Freeze',
    description: 'Diminue la vitesse du personnage.',
    duration: Duration.S_10,
    toggled: true
  },
];

