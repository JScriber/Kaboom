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
  <Typography component="div" style={{ padding: 8 * 3 }}>
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
        customMapsLoaded: true
      });
    })
  }

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
              ? <ListMap previews={this.state.defaultMaps}/>
              : <CircularProgress/> }
          </TabContainer>

          <TabContainer>
            { this.state.customMapsLoaded
              ? <ListMap previews={this.state.customMaps}/>
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
