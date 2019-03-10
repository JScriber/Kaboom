import { Controller, Get } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { ListAllAlterations } from '@dto/alterations/alterations.dto';

@ApiUseTags('Alterations')
@Controller('alterations')
export class AlterationsController {

  /** Informations on the current user. */
  @Get()
  list(): ListAllAlterations {
    return {
      bonus: [
        {
          name: 'Passe murailles',
          key: 'wallPass',
          description: 'Permet de passer à travers les murs. Ne rend pas intangible.',
        },
        {
          name: 'Téléportation',
          key: 'teleportation',
          description: 'Téléporte aléatoirement à un autre endroit.',
        },
        {
          name: 'Combinaison anti-feu',
          key: 'fireSuit',
          description: 'Permet de résister aux déflagrations des bombes.',
        },
        {
          name: 'Bomb-Up',
          key: 'bombUp',
          description: 'Augmente le nombre de bombes pouvant être posées simultanément.',
        },
        {
          name: 'Skate',
          key: 'skate',
          description: 'Augmente la vitesse du personnage.',
        },
        {
          name: 'Flamme jaune',
          key: 'yellowFlame',
          description: 'Augmente la portée des bombes.',
        },
        {
          name: 'Flamme rouge',
          key: 'redFlame',
          description: 'L\'explosion d\'une bombe ne connait aucune limite.',
        },
        {
          name: 'Désamorceur',
          key: 'bombDisarmer',
          description: 'Permet de désamorcer une bombe avant son explosion.',
        },
        {
          name: 'Gant',
          key: 'powerGlove',
          description: 'Permet de pousser les bombes.'
        },
        {
          name: 'Poussée',
          key: 'push',
          description: 'Permet de pousser d\'autres joueurs.',
        },
        {
          name: 'Coeur',
          key: 'heart',
          description: 'Permet de gagner un coeur',
        },
        {
          name: 'Vie',
          key: 'lifeUp',
          description: 'Permet de gagner une vie supplémentaire.'
        },
        {
          name: 'Échange',
          key: 'swapPositions',
          description: 'Échange la position avec un autre joueur aléatoirement.',
        }
      ],
      penalties: [
        {
          name: 'Inversion',
          key: 'invert',
          description: 'Les touches directionnelles sont inversées.',
        },
        {
          name: 'Bomb-Down',
          key: 'bombDown',
          description: 'Diminue le nombres de bombes pouvant être posées simultanément.',
        },
        {
          name: 'Flamme bleue',
          key: 'blueFlame',
          description: 'Diminue la portée des bombes.',
        },
        {
          name: 'Freeze',
          key: 'speedDown',
          description: 'Diminue la vitesse du personnage.',
        },
      ]
    };
  }
}
