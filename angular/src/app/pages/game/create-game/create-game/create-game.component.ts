import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SelectItem } from '../select-list/select-list.component';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent {

  bonusItems: SelectItem[] = [
    {
      key: 'wallPass',
      title: 'Passe murailles',
      description: 'Permet de passer à travers les murs. Ne rend pas intangible.',
      image: '',
      initialState: false
    },
    {
      key: 'teleportation',
      title: 'Téléportation',
      description: 'Téléporte aléatoirement à un autre endroit.',
      image: '',
      initialState: false
    },
    {
      key: 'fireSuit',
      title: 'Combinaison anti-feu',
      description: 'Permet de résister aux déflagrations des bombes.',
      image: '',
      initialState: false
    },
    {
      key: 'bombUp',
      title: 'Bomb-Up',
      description: 'Augmente le nombre de bombes pouvant être posées simultanément.',
      image: '',
      initialState: false
    },
    {
      key: 'skate',
      title: 'Skate',
      description: 'Augmente la vitesse du personnage.',
      image: '',
      initialState: false
    },
    {
      key: 'yellowFlame',
      title: 'Flamme jaune',
      description: 'Augmente la portée des bombes.',
      image: '',
      initialState: false
    },
    {
      key: 'redFlame',
      title: 'Flamme rouge',
      description: 'L\'explosion d\'une bombe ne connait aucune limite.',
      image: '',
      initialState: false
    },
    {
      key: 'bombDisarmer',
      title: 'Désamorceur',
      description: 'Permet de désamorcer une bombe avant son explosion.',
      image: '',
      initialState: false
    },
    {
      key: 'powerGlove',
      title: 'Gant',
      description: 'Permet de pousser les bombes.',
      image: '',
      initialState: false
    },
    {
      key: 'push',
      title: 'Poussée',
      description: 'Permet de pousser d\'autres joueurs.',
      image: '',
      initialState: false
    },
    {
      key: 'heart',
      title: 'Coeur',
      description: 'Permet de gagner un coeur',
      image: '',
      initialState: false
    },
    {
      key: 'lifeUp',
      title: 'Vie',
      description: 'Permet de gagner une vie supplémentaire.',
      image: '',
      initialState: false
    },
    {
      key: 'swapPositions',
      title: 'Échange',
      description: 'Échange la position avec un autre joueur aléatoirement.',
      image: '',
      initialState: false
    }
  ];

  // penalties: [
  //   {
  //     name: 'Inversion',
  //     key: 'invert',
  //     description: 'Les touches directionnelles sont inversées.',
  //   },
  //   {
  //     name: 'Bomb-Down',
  //     key: 'bombDown',
  //     description: 'Diminue le nombres de bombes pouvant être posées simultanément.',
  //   },
  //   {
  //     name: 'Flamme bleue',
  //     key: 'blueFlame',
  //     description: 'Diminue la portée des bombes.',
  //   },
  //   {
  //     name: 'Freeze',
  //     key: 'speedDown',
  //     description: 'Diminue la vitesse du personnage.',
  //   },

  form: FormGroup = this.fb.group({
    timeDuration: ['', [ Validators.required, Validators.min(5), Validators.max(20) ]],
    players: [2, [ Validators.required, Validators.min(2), Validators.max(4) ]],
    timeLimit: [false, [ Validators.required ]],
    bonus: ['', [ Validators.required ]],
    malus: ['', [ Validators.required ]],
    map: ['', [ Validators.required ]]
  });

  constructor(private readonly fb: FormBuilder) {}
}
