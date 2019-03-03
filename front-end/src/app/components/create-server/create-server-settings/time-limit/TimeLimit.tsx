import * as React from 'react';
import { withStyles } from '@material-ui/core';

// Models.
import { IProps, IState, styles } from './TimeLimit.model';

/**
 * Time limit selection.
 */
class TimeLimit extends React.Component<IProps, IState> {

  render() {
    return (
      <div>Hello</div>
    );
  }
}

/** Export with material theme. */
export default withStyles(styles, {
  withTheme: true
})(TimeLimit);
