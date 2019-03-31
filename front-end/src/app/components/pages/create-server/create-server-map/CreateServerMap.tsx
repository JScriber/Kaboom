import * as React from 'react';
import { Typography, Tabs, Tab, CircularProgress } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { interval, Subject } from 'rxjs';

// Internal mechanism.
import { materialTranslated } from 'src/utils';

// Local models.
import { IState, IProps, styles } from './CreateServerMap.model';

// Local components.
import ListMap from './list-maps/ListMaps';

// Style.
import './CreateServerMap.scss';
import { takeUntil } from 'rxjs/operators';

/** Tabs encapsulation. */
const TabContainer = (props: any) => (
  <Typography component="div" style={{ padding: 5 * 3 }}>
    {props.children}
  </Typography>
);

/**
 * Map select orchestrator.
 */
class CreateServerMap extends React.Component<IProps, IState> {

  /** Default tab index. */
  private static readonly DEFAULT_TAB: number = 0;

  /** State initialisation. */
  state: IState = {
    selectedId: 0,
    value: CreateServerMap.DEFAULT_TAB,
    defaultMapsLoaded: false,
    defaultMaps: [],
    customMapsLoaded: false,
    customMaps: []
  };

  private destroy$: Subject<void> = new Subject();

  /** Called when a tab is clicked. */
  handleChange = (e: React.FormEvent<{}>, value: number) => {
    this.setState({ value });
  };

  /** Called when swipping. */
  handleChangeIndex = (value: number) => {
    this.setState({ value });
  };

  /**
   * Handles the selection of a map.
   * @param {number | null} id
   */
  private handleOnSelect = (id: number | null) => {
    this.setState(({ selectedId }: IState) => {
      if (id === selectedId) {
        id = null;
      }

      return { selectedId: id };
    });
  };

  componentDidMount() {
    // TODO: Replace with real request.
    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.setState({
          defaultMapsLoaded: true,
          customMapsLoaded: true,
          defaultMaps: [
            {
              id: 0,
              name: 'Golden arena'
            },
            {
              id: 1,
              name: 'Platinum stadium'
            },
            {
              id: 2,
              name: 'Lost heaven'
            },
            {
              id: 3,
              name: 'Shouting star'
            }
          ],
          customMaps: [
            {
              id: 10,
              name: 'Custom 1'
            }
          ]
        });

        this.forceUpdate();
      });
  }

  componentWillUnmount() {
    this.destroy$.next();
  }

  render() {
    const { t } = this.props;

    return (
      <div className="create-server-map">
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label={t('SERVER_CREATE.MAPS.PREDEFINED')}/>
          <Tab label={t('SERVER_CREATE.MAPS.MY_MAPS')}/>
        </Tabs>
        <SwipeableViews
          axis='x'
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer>
            { this.state.defaultMapsLoaded
              ? <ListMap previews={this.state.defaultMaps}
                  selectedId={this.state.selectedId}
                  onSelect={this.handleOnSelect}/>
              : <CircularProgress/> }
          </TabContainer>

          <TabContainer>
            { this.state.customMapsLoaded
              ? <ListMap previews={this.state.customMaps}
                  selectedId={this.state.selectedId}
                  onSelect={this.handleOnSelect}/>
              : <CircularProgress/> }
          </TabContainer>
        </SwipeableViews>
      </div>
    )
  }
}

/** Export with material theme and translations. */
export default materialTranslated(CreateServerMap, styles);
