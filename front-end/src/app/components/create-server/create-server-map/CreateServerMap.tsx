import * as React from 'react';
import { Typography, Zoom, Tabs, Tab, Fab, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import SwipeableViews from 'react-swipeable-views';

// Local models.
import { IMapState, IMapProps, styles } from './CreateServerMap.model';

// Local components.
import ListMap from './list-maps/ListMaps';

// Style.
import './CreateServerMap.scss';
import { interval } from 'rxjs';

/** Tabs encapsulation. */
const TabContainer = (props: any) => (
  <Typography component="div" style={{ padding: 5 * 3 }}>
    {props.children}
  </Typography>
);

/**
 * Map select orchestrator.
 */
class CreateServerMap extends React.Component<IMapProps, IMapState> {

  /** Default tab index. */
  private static readonly DEFAULT_TAB: number = 0;

  /** State initialisation. */
  state: IMapState = {
    selectedId: 0,
    value: CreateServerMap.DEFAULT_TAB,
    defaultMapsLoaded: false,
    defaultMaps: [],
    customMapsLoaded: false,
    customMaps: []
  };

  /** Called when a tab is clicked. */
  handleChange = (e: React.FormEvent<{}>, value: number) => {
    this.setState({ value });
  };

  /** Called when swipping. */
  handleChangeIndex = (value: number) => {
    this.setState({ value });
  };

  componentDidMount() {
    // TODO: Replace with real request.
    interval(1000).subscribe(() => {
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
          },
          {
            id: 4,
            name: 'Warrior arena'
          },
          {
            id: 5,
            name: 'Night sight'
          },
          {
            id: 6,
            name: 'Roaring lion'
          },
        ],
        customMaps: [
          {
            id: 10,
            name: 'Custom 1'
          }
        ]
      });

      this.forceUpdate();
    })
  }

  /**
   * Handles the selection of a map.
   * @param {number | null} id
   */
  private handleOnSelect = (id: number | null) => {
    this.setState(({ selectedId }: IMapState) => {
      if (id === selectedId) {
        id = null;
      }

      return { selectedId: id };
    });
  };

  render() {
    return (
      <div className="create-server-map">
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Cartes prédéfinies"/>
          <Tab label="Mes cartes"/>
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

        <Zoom
          key="primary"
          in={this.state.value === 1}
          unmountOnExit
        >
          <Fab color="primary" className={this.props.classes.fab}>
          <EditIcon />
          </Fab>
        </Zoom>
      </div>
    )
  }
}

/** Export with material theme. */
export default withStyles(styles, {
  withTheme: true
})(CreateServerMap);
