import * as React from 'react';
import { CircularProgress } from '@material-ui/core';

// Models.
import { IProps, IState, ListAllAlterations, Alteration } from './CreateServerSettings.model';

// Local components.
import ListSelector from './list-selector/ListSelector';
import ValuePicker from './value-picker/ValuePicker';
import { ApiService } from 'src/app/services/api/api';
import { Item } from './list-selector/ListSelector.model';

// Style.
import './CreateServerSettings.scss';

/**
 * Main settings to create a server.
 */
export default class CreateServerSettings extends React.Component<IProps, IState> {

  /** State initialization. */
  state: IState = {
    bonus: [],
    penalty: [],
    loading: true,
    numberPlayers: 4
  };

  /** API request. */
  private api: ApiService = ApiService.instance();

  /**
   * Converts an alteration to an item.
   * @param {Alteration} alteration
   * @returns {Item}
   */
  private setAsToggled(alteration: Alteration): Item {
    const item = alteration as Item;
    item.toggled = true;

    return item;
  }

  componentDidMount() {
    this.api.get('/alterations')
      .subscribe((lists: ListAllAlterations) => this.setState({
        bonus: lists.bonus.map(b => this.setAsToggled(b)),
        penalty: lists.penalties.map(p => this.setAsToggled(p)),
        loading: false
      }));
  }

  render() {
    return (
      <React.Fragment>
        <ValuePicker
          initialValue={4}
          min={2}
          max={4}
          expanded={true}
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

        {
          this.state.loading ? <CircularProgress className="alterationLoader"/> : (
            <React.Fragment>
              <ListSelector title="Bonus" placeholder="Rechercher un bonus" items={this.state.bonus}/>
              <ListSelector title="Malus" placeholder="Rechercher un malus" items={this.state.penalty}/>
            </React.Fragment>
          )
        }
      </React.Fragment>
    );
  }
}
