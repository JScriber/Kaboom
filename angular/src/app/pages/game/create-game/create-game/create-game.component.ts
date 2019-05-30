import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SelectItem, SelectListComponent } from './select-list/select-list.component';
import { MatDialog } from '@angular/material';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CreateGameApiService } from '../services/api/create-game-api.service';
import { CreateGame } from '../models/create-game.model';
import { JsonConverterService, Class } from '../../../../web-service/json-converter/json-converter.service';
import { Bonus } from '../models/alterations/bonus.model';
import { Penalties } from '../models/alterations/penalties.model';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateGameComponent implements OnInit {

  /** Options for the number of players. */
  readonly numberPlayersOptions = [2, 3, 4];

  /** List of bonus. */
  bonusItems: SelectItem[] = [
    {
      key: 'wallPass',
      title: 'CREATE_GAME.ITEMS.BONUS.WALL_PASS.TITLE',
      description: 'CREATE_GAME.ITEMS.BONUS.WALL_PASS.DESCRIPTION',
      image: 'assets/game/items/wall-pass.jpg',
      state: true
    },
    {
      key: 'fireSuit',
      title: 'CREATE_GAME.ITEMS.BONUS.FIRE_SUIT.TITLE',
      description: 'CREATE_GAME.ITEMS.BONUS.FIRE_SUIT.DESCRIPTION',
      image: 'assets/game/items/fire-suit.jpg',
      state: true
    },
    {
      key: 'bombUp',
      title: 'CREATE_GAME.ITEMS.BONUS.BOMB_UP.TITLE',
      description: 'CREATE_GAME.ITEMS.BONUS.BOMB_UP.DESCRIPTION',
      image: 'assets/game/items/bomb-up.jpg',
      state: true
    },
    {
      key: 'skate',
      title: 'CREATE_GAME.ITEMS.BONUS.SKATE.TITLE',
      description: 'CREATE_GAME.ITEMS.BONUS.SKATE.DESCRIPTION',
      image: 'assets/game/items/skate.jpg',
      state: true
    },
    {
      key: 'yellowFlame',
      title: 'CREATE_GAME.ITEMS.BONUS.YELLOW_FLAME.TITLE',
      description: 'CREATE_GAME.ITEMS.BONUS.YELLOW_FLAME.DESCRIPTION',
      image: 'assets/game/items/yellow-flame.jpg',
      state: true
    },
    {
      key: 'redFlame',
      title: 'CREATE_GAME.ITEMS.BONUS.RED_FLAME.TITLE',
      description: 'CREATE_GAME.ITEMS.BONUS.RED_FLAME.DESCRIPTION',
      image: 'assets/game/items/red-flame.jpg',
      state: true
    },
    {
      key: 'bombDisarmer',
      title: 'CREATE_GAME.ITEMS.BONUS.BOMB_DISARMER.TITLE',
      description: 'CREATE_GAME.ITEMS.BONUS.BOMB_DISARMER.DESCRIPTION',
      image: 'assets/game/items/disarm.jpg',
      state: true
    },
    {
      key: 'powerGlove',
      title: 'CREATE_GAME.ITEMS.BONUS.POWER_GLOVE.TITLE',
      description: 'CREATE_GAME.ITEMS.BONUS.POWER_GLOVE.DESCRIPTION',
      image: 'assets/game/items/glove.jpg',
      state: true
    },
    {
      key: 'heart',
      title: 'CREATE_GAME.ITEMS.BONUS.HEART.TITLE',
      description: 'CREATE_GAME.ITEMS.BONUS.HEART.DESCRIPTION',
      image: 'assets/game/items/heart.jpg',
      state: true
    },
    {
      key: 'lifeUp',
      title: 'CREATE_GAME.ITEMS.BONUS.LIFE_UP.TITLE',
      description: 'CREATE_GAME.ITEMS.BONUS.LIFE_UP.DESCRIPTION',
      image: 'assets/game/items/life-up.jpg',
      state: true
    }
  ];

  /** List of penalties. */
  penaltyItems: SelectItem[] = [
    {
      key: 'bombDown',
      title: 'CREATE_GAME.ITEMS.PENALTIES.BOMB_DOWN.TITLE',
      description: 'CREATE_GAME.ITEMS.PENALTIES.BOMB_DOWN.DESCRIPTION',
      image: 'assets/game/items/bomb-down.jpg',
      state: true
    },
    {
      key: 'blueFlame',
      title: 'CREATE_GAME.ITEMS.PENALTIES.BLUE_FLAME.TITLE',
      description: 'CREATE_GAME.ITEMS.PENALTIES.BLUE_FLAME.DESCRIPTION',
      image: 'assets/game/items/blue-flame.jpg',
      state: true
    },
    {
      key: 'clog',
      title: 'CREATE_GAME.ITEMS.PENALTIES.CLOG.TITLE',
      description: 'CREATE_GAME.ITEMS.PENALTIES.CLOG.DESCRIPTION',
      image: 'assets/game/items/clog.jpg',
      state: true
    },
    {
      key: 'skull',
      title: 'CREATE_GAME.ITEMS.PENALTIES.SKULL.TITLE',
      description: 'CREATE_GAME.ITEMS.PENALTIES.SKULL.DESCRIPTION',
      image: 'assets/game/items/skull.jpg',
      state: true
    }
  ];

  /** Form. */
  form: FormGroup = this.fb.group({
    players: [2, [ Validators.required, Validators.min(2), Validators.max(4) ]],
    timeLimit: [true, [ Validators.required ]],
    timeDuration: [5, [ Validators.required, Validators.min(3), Validators.max(20) ]],
    bonus: [true, [ Validators.required ]],
    malus: [true, [ Validators.required ]],
    map: [0, [ Validators.required ]]
  });

  /** Says if the component is loading. */
  loading = false;

  constructor(private readonly fb: FormBuilder,
              private readonly dialog: MatDialog,
              private readonly webservice: CreateGameApiService,
              private readonly jsonConverter: JsonConverterService) {}

  ngOnInit() {
    this.form.get('timeLimit').valueChanges.subscribe(value => {
      const timeDuration = this.form.get('timeDuration');

      value ? timeDuration.enable() : timeDuration.disable();
    });
  }

  /** Called on form submition. */
  submit() {
    if (this.form.valid) {
      this.loading = true;

      const { value } = this.form;
      const dto = new CreateGame();

      dto.players = value.players;
      dto.map = value.map;

      // Set time limit if defined.
      if (value.timeLimit) {
        dto.duration = value.timeDuration;
      }

      // Set bonus if toggled.
      if (value.bonus) {
        dto.bonus = this.compressItems(this.bonusItems, Bonus);
      }
  
      // Set penalties if toggled.
      if (value.malus) {
        dto.penalties = this.compressItems(this.penaltyItems, Penalties);
      }

      this.webservice.create(dto).subscribe(() => {
        this.loading = false;
      }, () => {
        // TODO: Error handling.
      });
    }
  }

  /** Toggle the time limit. */
  toggleTimeLimit() {
    const control = this.form.get('timeLimit');

    control.setValue(!control.value);
  }

  /** Opens the bonus dialog. */
  openBonus() {
    this.openAlterationDialog(this.bonusItems, 'CREATE_GAME.SEARCH.BONUS').subscribe(value => {
      if (typeof value !== 'undefined') {
        this.bonusItems = value;
      }
    });
  }

  /** Opens the malus dialog. */
  openMalus() {
    this.openAlterationDialog(this.penaltyItems, 'CREATE_GAME.SEARCH.PENALTY').subscribe(value => {
      if (typeof value !== 'undefined') {
        this.penaltyItems = value;
      }
    });
  }

  /**
   * Opens up the alteration dialog.
   * @param {SelectItem[]} items - Items available.
   * @returns {Observable<SelectItem[] | undefined>}
   */
  private openAlterationDialog(items: SelectItem[], label: string): Observable<SelectItem[] | undefined> {
    let dialogRef = this.dialog.open(SelectListComponent, {
      width: '480px',
      data: {
        searchLabel: label,
        items
      }
    });

    return dialogRef.afterClosed().pipe(
      take(1)
    );
  }

  /**
   * Compresses the list of items.
   * @template T - Returned type.
   * @param {SelectItem[]} list
   * @param {Class<T>} classRef - Reference to a class.
   * @returns {T}
   */
  private compressItems<T>(list: SelectItem[], classRef: Class<T>): T {

    return this.jsonConverter.deserialize(list
      .reduce((previous, current) => ({
        ... previous,
        [current.key]: current.state
      }), {}), classRef);
  }
}
