import * as React from 'react';

// Configurations.
import { BONUS_CONF } from 'src/configs/items/bonus';
import { PENALTY_CONF } from 'src/configs/items/penalty';

// Models.
import { IProps, IState } from './CreateServerSettings.model';

// Local components.
import NumberPlayers from './number-players/NumberPlayers';
import ListSelector from './list-selector/ListSelector';
import TimeLimit from './time-limit/TimeLimit';

/**
 * Main settings to create a server.
 */
export default class CreateServerSettings extends React.Component<IProps, IState> {

  /** State initialization. */
  state: IState = {
    bonus: BONUS_CONF,
    penalty: PENALTY_CONF,
    numberPlayers: 4
  };

  render() {
    return (
      <React.Fragment>
        <NumberPlayers min={2} max={4} default={2}/>
        <TimeLimit initialValue={5} min={3} max={20}/>
        <ListSelector title="Bonus" placeholder="Rechercher un bonus" items={this.state.bonus}/>
        <ListSelector title="Malus" placeholder="Rechercher un malus" items={this.state.penalty}/>
      </React.Fragment>
    );
  }
}
