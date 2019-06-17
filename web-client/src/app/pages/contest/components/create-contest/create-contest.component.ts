import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SelectItem, SelectListComponent } from './select-list/select-list.component';
import { MatDialog } from '@angular/material';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ContestForm } from '../../models/create-contest/contest-form.model';
import { JsonConverterService, Class } from '../../../../web-service/json-converter/json-converter.service';
import { Bonus } from '../../models/create-contest/alterations/bonus.model';
import { Penalties } from '../../models/create-contest/alterations/penalties.model';
import { ContestApiService } from '../../services/contest-api/api/contest-api.service';

@Component({
  selector: 'app-create-contest',
  templateUrl: './create-contest.component.html',
  styleUrls: ['./create-contest.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateContestComponent implements OnInit {

  /** Options for the number of players. */
  readonly numberPlayersOptions = [2, 3, 4];

  /** List of bonus. */
  bonusItems: SelectItem[] = [
    {
      key: 'wallPass',
      title: 'CREATE_CONTEST.ITEMS.BONUS.WALL_PASS.TITLE',
      description: 'CREATE_CONTEST.ITEMS.BONUS.WALL_PASS.DESCRIPTION',
      image: 'assets/game/items/wall-pass.jpg',
      state: true
    },
    {
      key: 'fireSuit',
      title: 'CREATE_CONTEST.ITEMS.BONUS.FIRE_SUIT.TITLE',
      description: 'CREATE_CONTEST.ITEMS.BONUS.FIRE_SUIT.DESCRIPTION',
      image: 'assets/game/items/fire-suit.jpg',
      state: true
    },
    {
      key: 'bombUp',
      title: 'CREATE_CONTEST.ITEMS.BONUS.BOMB_UP.TITLE',
      description: 'CREATE_CONTEST.ITEMS.BONUS.BOMB_UP.DESCRIPTION',
      image: 'assets/game/items/bomb-up.jpg',
      state: true
    },
    {
      key: 'skate',
      title: 'CREATE_CONTEST.ITEMS.BONUS.SKATE.TITLE',
      description: 'CREATE_CONTEST.ITEMS.BONUS.SKATE.DESCRIPTION',
      image: 'assets/game/items/skate.jpg',
      state: true
    },
    {
      key: 'yellowFlame',
      title: 'CREATE_CONTEST.ITEMS.BONUS.YELLOW_FLAME.TITLE',
      description: 'CREATE_CONTEST.ITEMS.BONUS.YELLOW_FLAME.DESCRIPTION',
      image: 'assets/game/items/yellow-flame.jpg',
      state: true
    },
    {
      key: 'redFlame',
      title: 'CREATE_CONTEST.ITEMS.BONUS.RED_FLAME.TITLE',
      description: 'CREATE_CONTEST.ITEMS.BONUS.RED_FLAME.DESCRIPTION',
      image: 'assets/game/items/red-flame.jpg',
      state: true
    },
    {
      key: 'bombDisarmer',
      title: 'CREATE_CONTEST.ITEMS.BONUS.BOMB_DISARMER.TITLE',
      description: 'CREATE_CONTEST.ITEMS.BONUS.BOMB_DISARMER.DESCRIPTION',
      image: 'assets/game/items/disarm.jpg',
      state: true
    },
    {
      key: 'powerGlove',
      title: 'CREATE_CONTEST.ITEMS.BONUS.POWER_GLOVE.TITLE',
      description: 'CREATE_CONTEST.ITEMS.BONUS.POWER_GLOVE.DESCRIPTION',
      image: 'assets/game/items/glove.jpg',
      state: true
    },
    {
      key: 'heart',
      title: 'CREATE_CONTEST.ITEMS.BONUS.HEART.TITLE',
      description: 'CREATE_CONTEST.ITEMS.BONUS.HEART.DESCRIPTION',
      image: 'assets/game/items/heart.jpg',
      state: true
    },
    {
      key: 'lifeUp',
      title: 'CREATE_CONTEST.ITEMS.BONUS.LIFE_UP.TITLE',
      description: 'CREATE_CONTEST.ITEMS.BONUS.LIFE_UP.DESCRIPTION',
      image: 'assets/game/items/life-up.jpg',
      state: true
    }
  ];

  /** List of penalties. */
  penaltyItems: SelectItem[] = [
    {
      key: 'bombDown',
      title: 'CREATE_CONTEST.ITEMS.PENALTIES.BOMB_DOWN.TITLE',
      description: 'CREATE_CONTEST.ITEMS.PENALTIES.BOMB_DOWN.DESCRIPTION',
      image: 'assets/game/items/bomb-down.jpg',
      state: true
    },
    {
      key: 'blueFlame',
      title: 'CREATE_CONTEST.ITEMS.PENALTIES.BLUE_FLAME.TITLE',
      description: 'CREATE_CONTEST.ITEMS.PENALTIES.BLUE_FLAME.DESCRIPTION',
      image: 'assets/game/items/blue-flame.jpg',
      state: true
    },
    {
      key: 'clog',
      title: 'CREATE_CONTEST.ITEMS.PENALTIES.CLOG.TITLE',
      description: 'CREATE_CONTEST.ITEMS.PENALTIES.CLOG.DESCRIPTION',
      image: 'assets/game/items/clog.jpg',
      state: true
    },
    {
      key: 'skull',
      title: 'CREATE_CONTEST.ITEMS.PENALTIES.SKULL.TITLE',
      description: 'CREATE_CONTEST.ITEMS.PENALTIES.SKULL.DESCRIPTION',
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
    map: [1, [ Validators.required ]]
  });

  /** Says if the component is loading. */
  loading = false;

  constructor(private readonly fb: FormBuilder,
              private readonly dialog: MatDialog,
              private readonly router: Router,
              private readonly webservice: ContestApiService,
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
      const dto = new ContestForm();

      dto.players = value.players;
      dto.map = value.map;

      // Set time limit if defined.
      if (value.timeLimit) {
        dto.duration = value.timeDuration;
      }

      // Set bonus if toggled.
      if (value.bonus) {
        dto.bonus = this.compressItems(this.bonusItems, Bonus);
      } else {
        dto.bonus = this.toggleOff(this.bonusItems, Bonus);
      }
  
      // Set penalties if toggled.
      if (value.malus) {
        dto.penalties = this.compressItems(this.penaltyItems, Penalties);
      } else {
        dto.penalties = this.toggleOff(this.penaltyItems, Penalties);
      }

      this.webservice.create(dto).subscribe(information => {
        this.loading = false;

        this.router.navigate(['/game/join', information.uuid]);
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
    this.openAlterationDialog(this.bonusItems, 'CREATE_CONTEST.SEARCH.BONUS').subscribe(value => {
      if (typeof value !== 'undefined') {
        this.bonusItems = value;
      }
    });
  }

  /** Opens the malus dialog. */
  openMalus() {
    this.openAlterationDialog(this.penaltyItems, 'CREATE_CONTEST.SEARCH.PENALTY').subscribe(value => {
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
      autoFocus: false,
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

  /**
   * Compresses the list of items. Set false to all.
   * @template T - Returned type.
   * @param {SelectItem[]} list
   * @param {Class<T>} classRef - Reference to a class.
   * @returns {T}
   */
  private toggleOff<T>(list: SelectItem[], classRef: Class<T>): T {

    return this.jsonConverter.deserialize(
      list.reduce((previous, current) => ({
        ... previous,
        [current.key]: false
      }), {}),
      classRef
    );
  }
}
