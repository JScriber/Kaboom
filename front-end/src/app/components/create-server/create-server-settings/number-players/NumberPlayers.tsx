import * as React from 'react';
import { withStyles } from '@material-ui/core';
import Slider from '@material-ui/lab/Slider';

// Models.
import { IProps, IState, styles } from './NumberPlayers.model';

/**
 * Time limit selection.
 */
class NumberPlayers extends React.Component<IProps, IState> {

  /** State initialisation. */
  state: IState = {
    numberPlayers: 2
  };

  /** Handles slide changes. */
  private handleChange = (_: React.FormEvent, numberPlayers: number) => {
    this.setState({ numberPlayers });
  };

  componentDidMount() {
    const players = this.props.default || this.props.min;
    this.setState({ numberPlayers: players });
  }

  render() {
    const { classes, min, max } = this.props;

    return (
      <React.Fragment>
          <Slider
            classes={{ container: classes.slider }}
            value={this.state.numberPlayers}
            min={min}
            max={max}
            step={1}
            onChange={this.handleChange}
          />
      </React.Fragment>
    );
  }
}

/** Export with material theme. */
export default withStyles(styles, {
  withTheme: true
})(NumberPlayers);
