import * as React from 'react';
import { withStyles, ExpansionPanel, ExpansionPanelSummary, Switch, Typography, ExpansionPanelDetails } from '@material-ui/core';
import Slider from '@material-ui/lab/Slider';

// Icons.
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Models.
import { IProps, IState, styles } from './TimeLimit.model';

/**
 * Time limit selection.
 */
class TimeLimit extends React.Component<IProps, IState> {

  /** State initialisation. */
  state: IState = {
    toggled: true,
    expanded: true,
    duration: 0
  };

  /** Called when the panel is expanded or closed. */
  private handleExpanded = (_: any, expanded: boolean) => {
    this.setState({ expanded, toggled: expanded });
  };

  /**
   * Toggles the switch.
   * @param {React.FormEvent} event
   */
  private toggle = (event: React.FormEvent) => {
    event.stopPropagation();
    const { checked } = event.target as HTMLInputElement;

    this.setState({
      toggled: checked,
      expanded: checked
    });
  };

  /** Handles slider value change. */
  private handleSlide = (_: React.FormEvent, duration: number) => {
    this.setState({ duration, toggled: true });
  };

  /** On Init. */
  componentDidMount() {
    let { initialValue, min, max } = this.props;

    if (initialValue > max || initialValue < min) {
      initialValue = min;
    }

    this.setState({ duration: initialValue });
  }

  render() {
    const { classes, min, max } = this.props;

    return (
      <ExpansionPanel expanded={this.state.expanded} onChange={this.handleExpanded}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Switch
            checked={this.state.toggled}
            onClick={this.toggle}
            color="primary"
          />
          <Typography className={classes.heading}>Limite de temps</Typography>

          {
            this.state.toggled && <Typography className={classes.secondaryHeading}>
              {this.state.duration} min
            </Typography>
          }
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Slider
            classes={{ container: classes.slider }}
            value={this.state.duration}
            min={min}
            max={max}
            step={1}
            onChange={this.handleSlide}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

/** Export with material theme. */
export default withStyles(styles, {
  withTheme: true
})(TimeLimit);
