import * as React from 'react';

// Configurations.
import { BONUS_CONF } from 'src/configs/items/bonus';
import { PENALTY_CONF } from 'src/configs/items/penalty';

// Models.
import { IProps, IState } from './CreateServerSettings.model';

// Local components.
import ListSelector from './list-selector/ListSelector';
import ValuePicker from './value-picker/ValuePicker';

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
        <ValuePicker
          initialValue={4}
          min={2}
          max={4}
          expanded={false}
          togglable={false}
          title="Nombre de joueurs"
          displaying={v => v + ' joueurs'}
        />

        <ValuePicker
          initialValue={5}
          min={3}
          max={20}
          expanded={true}
          togglable={true}
          title="Limite de temps"
          displaying={v => v + ' min'}
        />

        <ListSelector title="Bonus" placeholder="Rechercher un bonus" items={this.state.bonus}/>
        <ListSelector title="Malus" placeholder="Rechercher un malus" items={this.state.penalty}/>
      </React.Fragment>
    );
  }
}
