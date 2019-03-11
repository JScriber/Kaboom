import * as React from 'react';
import { withStyles, InputBase, IconButton, Zoom } from '@material-ui/core';

// Icons.
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

// Models.
import { IProps, IState, styles } from './SearchBox.model';

/**
 * Searchbox.
 */
class SearchBox extends React.Component<IProps, IState> {

  /** State init. */
  state = {
    value: ''
  };

  /** Called each time the user types in the input. */
  private handleTyping = (event: React.FormEvent) => {
    const { value } = event.target as HTMLInputElement;
    this.setValue(value);
  };

  /** Clears the searchbox. */
  private clear = () => this.setValue('');

  /**
   * Sets the given value and sends it.
   * @param {strig} value
   */
  private setValue(value: string): void {
    this.setState({ value });
    this.props.onSearch(value);
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder={this.props.placeholder}
          value={value}
          onChange={this.handleTyping}/>

          <Zoom in={value.length > 0} timeout={{
            enter: 200,
            exit: 0
          }} unmountOnExit>
            <IconButton className={classes.iconButton} onClick={this.clear} aria-label="Clear">
              <ClearIcon/>
            </IconButton>
          </Zoom>

          {
            value.length === 0 && 
            <IconButton className={classes.iconButton} aria-label="Search">
              <SearchIcon/>
            </IconButton>
          }   
      </div>
    )
  }
}

/** Export with material theme. */
export default withStyles(styles, {
  withTheme: true
})(SearchBox);
