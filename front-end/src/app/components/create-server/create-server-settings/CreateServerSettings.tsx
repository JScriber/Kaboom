import * as React from 'react';

// Models.
import { IProps, IState } from './CreateServerSettings.model';
import { Duration } from './list-selector/ListSelector.model';

// Local components.
import ListSelector from './list-selector/ListSelector';
import TimeLimit from './time-limit/TimeLimit';

/**
 * Main settings to create a server.
 */
export default class CreateServerSettings extends React.Component<IProps, IState> {

  /** State initialization. */
  state: IState = {
    bonus: [{
      name: 'Passe murailles',
      description: 'Permet de passer à travers les murs. Ne rend pas intangible.',
      duration: Duration.S_10,
      toggled: true
    }, {
      name: 'Combinaison anti-feu',
      description: 'Permet de résister aux déflagrations des bombes.',
      duration: Duration.S_10,
      toggled: true
    }, {
      name: 'Flamme jaune',
      description: 'Augmente la portée des bombes.',
      duration: Duration.S_10,
      toggled: true
    }],
    penalty: [{
      name: 'Inversion',
      description: 'La position du joueur est inversée avec celle d\'un autre pris au hasard.',
      duration: Duration.None,
      toggled: true
    }],
    numberPlayers: 4
  };

  render() {
    return (
      <React.Fragment>
        <TimeLimit initialValue={5} min={3} max={20}/>
        <ListSelector title="Bonus" placeholder="Rechercher un bonus" items={this.state.bonus}/>
        <ListSelector title="Malus" placeholder="Rechercher un malus" items={this.state.penalty}/>
      </React.Fragment>
    );
  }
}
