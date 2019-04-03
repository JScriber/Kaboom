import * as React from 'react';
import { withStyles } from '@material-ui/core';

import { IProps, IState, styles } from './MapPreview.model';

/**
 * Displays a preview of a game map.
 */
class MapPreview extends React.Component<IProps> {

  /** State initialization. */
  state: IState = {};

  render() {
    const { classes, dimensions } = this.props;

    return <div className={classes.root} style={{ width: dimensions, height: dimensions }}></div>
  }
}

export default withStyles(styles)(MapPreview);
