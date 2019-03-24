import * as React from 'react';
import { CircularProgress } from '@material-ui/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Internal mechanism.
import { materialTranslated } from 'src/utils';

// Models.
import { IProps, IState, ListAllAlterations, Alteration, styles } from './CreateServerSettings.model';

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
class CreateServerSettings extends React.Component<IProps, IState> {

  /** State initialization. */
  state: IState = {
    bonus: [],
    penalty: [],
    loading: true,
    numberPlayers: 4
  };

  /** Subscription manager. */
  private destroy$: Subject<void> = new Subject();

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
      .pipe(takeUntil(this.destroy$))
      .subscribe((lists: ListAllAlterations) => this.setState({
        bonus: lists.bonus.map(b => this.setAsToggled(b)),
        penalty: lists.penalties.map(p => this.setAsToggled(p)),
        loading: false
      }));
  }

  componentWillUnmount() {
    this.destroy$.next();
  }

  render() {
    const { classes, t } = this.props;

    return (
      <React.Fragment>
        {
          this.state.loading
          ? (
              <div className={classes.loader}>
                <CircularProgress/>
              </div>
            ) : (
            <React.Fragment>
              <ValuePicker
                initialValue={4}
                min={2}
                max={4}
                expanded={true}
                togglable={false}
                title={t('SERVER_CREATE.SETTINGS.PLAYERS.TITLE')}
                displaying={v => v + ' ' + t('SERVER_CREATE.SETTINGS.PLAYERS.UNIT')}
              />
      
              <ValuePicker
                initialValue={5}
                min={3}
                max={20}
                expanded={true}
                togglable={true}
                title={t('SERVER_CREATE.SETTINGS.TIME_LIMIT.TITLE')}
                displaying={v => v + ' ' + t('SERVER_CREATE.SETTINGS.TIME_LIMIT.UNIT')}
              />
      
              <ListSelector
                title={t('SERVER_CREATE.SETTINGS.BONUS.TITLE')}
                placeholder={t('SERVER_CREATE.SETTINGS.BONUS.SEARCH')}
                items={this.state.bonus}
              />

              <ListSelector
                title={t('SERVER_CREATE.SETTINGS.PENALTIES.TITLE')}
                placeholder={t('SERVER_CREATE.SETTINGS.PENALTIES.SEARCH')}
                items={this.state.penalty}
              />
            </React.Fragment>
          )
        }
      </React.Fragment>
    );
  }
}

/** Export with material theme and translations. */
export default materialTranslated(CreateServerSettings, styles);
