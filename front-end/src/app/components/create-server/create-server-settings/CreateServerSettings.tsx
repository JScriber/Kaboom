import * as React from 'react';
import { withStyles } from '@material-ui/core';

// Models.
import { IProps, IState, styles } from './CreateServerSettings.model';
import ListSelector from './list-selector/ListSelector';
import { Duration } from './list-selector/ListSelector.model';

/**
 * Main settings to create a server.
 */
class CreateServerSettings extends React.Component<IProps, IState> {

  /** State initialization. */
  state: IState = {
    expanded: null,
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
        <ListSelector title="Bonus" items={this.state.bonus}/>
        <ListSelector title="Malus" items={this.state.penalty}/>
      </React.Fragment>
    );
  }
}

/** Export with material theme. */
export default withStyles(styles, {
  withTheme: true
})(CreateServerSettings);
