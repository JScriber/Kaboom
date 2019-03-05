import * as React from 'react';
import { withStyles, ExpansionPanel, ExpansionPanelSummary, Switch, Typography,
  ExpansionPanelDetails, List, ListItem, ListItemAvatar, Avatar, ListItemText,
  ListItemSecondaryAction, Divider } from '@material-ui/core';

// Icons.
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Timer10Icon from '@material-ui/icons/Timer10Rounded';
import TimerOffIcon from '@material-ui/icons/TimerOff';

// Models.
import { IProps, IState, styles, Duration, Item } from './ListSelector.model';
import SearchBox from './search-box/SearchBox';

/**
 * List of options.
 */
class ListSelector extends React.Component<IProps, IState> {

  /** State initilisation. */
  state: IState = {
    expanded: true,
    items: [],
    filter: null
  };

  /** Called when the panel is expanded or closed. */
  private handleExpanded = (_: any, expanded: boolean) => {
    this.setState({ expanded });
  };

  /** Main toggle handling. */
  private handleMainToggle = (event: React.FormEvent) => {
    event.stopPropagation();
    const { checked } = event.target as HTMLInputElement;

    this.setState((state: IState) => {
      state.items = state.items.map(i => {
        i.toggled = checked;

        return i;
      });
      state.expanded = checked;

      return state;
    });
  };

  /** Handles simple option toggle. */
  private handleToggle = (item: Item) => () => {
    const index = this.state.items.indexOf(item);

    if (index !== -1) {
      this.setState((state: IState) => {
        const item = state.items[index];
        item.toggled = !item.toggled;
  
        return state;
      });
    }
  };

  /** State of the main toggle. */
  private mainToggleState = (): boolean => this.state.items.every(i => i.toggled);

  /** Filters the results. */
  private filtering = (filter: string | null) => {
    if (filter === '') filter = null;

    this.setState({ filter });
  };

  /**
   * Determines which icon to display.
   * @param {Duration} duration
   * @returns {JSX.Element}
   */
  private timeIcon = (duration: Duration): JSX.Element => {
    switch (duration) {
      case Duration.S_10:
        return <Timer10Icon/>;

      case Duration.None:
        return <TimerOffIcon/>;
    }
  };

  private textTestFilter = (text: string): boolean => {
    const { filter } = this.state;

    if (filter === null) {
      return true;
    }

    const regex = new RegExp(filter, 'gi');
    return regex.test(text);
  };

  /** On init. */
  componentDidMount() {
    this.setState({ items: this.props.items });
  }

  /** On change. */
  componentWillReceiveProps({ items }: IProps) {
    this.setState({ items });
  }

  render() {
    const { classes, title } = this.props;
    const { filter } = this.state;

    return (
      <ExpansionPanel expanded={this.state.expanded} onChange={this.handleExpanded}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Switch
            checked={this.mainToggleState()}
            onClick={this.handleMainToggle}
            color="primary"
          />
          <Typography className={classes.heading}>{title}</Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails className={classes.panel}>
          <SearchBox placeholder={this.props.placeholder} onSearch={this.filtering}/>
          <Divider className={classes.divider}/>

          <List className={classes.root}>
            {
              this.state.items
                .filter(item => filter === null
                  || this.textTestFilter(item.name)
                  || this.textTestFilter(item.description))
                .map((item, i) => (
                  <React.Fragment key={i}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          {this.timeIcon(item.duration)}
                        </Avatar>
                      </ListItemAvatar>

                      <ListItemText primary={item.name} secondary={
                        <Typography className={classes.secondaryText}>
                          {item.description}
                        </Typography>
                      }/>

                      <ListItemSecondaryAction>
                        <Switch
                          checked={item.toggled}
                          onChange={this.handleToggle(item)}
                          color="primary"
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    { i !== this.state.items.length - 1 && <Divider light />}
                  </React.Fragment>
                ))
            }
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

/** Export with material theme. */
export default withStyles(styles, {
  withTheme: true
})(ListSelector);