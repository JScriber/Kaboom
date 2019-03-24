import * as React from 'react';
import { withStyles, ExpansionPanel, ExpansionPanelSummary, Switch, Typography, ExpansionPanelDetails } from '@material-ui/core';
import Slider from '@material-ui/lab/Slider';

// Icons.
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Models.
import { IProps, IState, styles } from './ValuePicker.model';

/**
 * Value selection.
 */
class ValuePicker extends React.Component<IProps, IState> {

  /** State initialisation. */
  state: IState = {
    toggled: true,
    expanded: true,
    value: 0
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
  private handleSlide = (_: React.FormEvent, value: number) => {
    this.setState({ value, toggled: true });
  };

  /** On Init. */
  componentDidMount() {
    let { initialValue, min, max, expanded } = this.props;

    if (initialValue > max || initialValue < min) {
      initialValue = min;
    }

    this.setState({ value: initialValue, expanded });
  }

  render() {
    const { classes, title, min, max, togglable } = this.props;
    const { value } = this.state;

    return (
      <ExpansionPanel expanded={this.state.expanded} onChange={this.handleExpanded}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          {
            this.props.togglable &&
            <Switch
              checked={this.state.toggled}
              onClick={this.toggle}
              color="primary"
            />
          }
          <Typography className={classes.heading}>{title}</Typography>

          {
            (this.state.toggled || !togglable) && <Typography className={classes.secondaryHeading}>
              {this.props.displaying(value)}
            </Typography>
          }
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Slider
            classes={{ container: classes.slider }}
            value={value}
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
})(ValuePicker);
