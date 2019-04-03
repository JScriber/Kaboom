import * as React from 'react';
import { Grid } from '@material-ui/core';

import { materialTranslated } from 'src/utils';
import { IProps, IState, styles } from './JoinServer.model';

import Server from './server/Server';

/**
 * Allows the user to join a server.
 * Servers are automatically refreshed.
 */
class JoinServer extends React.Component<IProps, IState> {

  /** State initialization. */
  state: IState = {
    games: []
  };

  componentDidMount() {
    this.setState({
      games: [
        {
          duration: 5,
          slots: [
            'Maelenn',
            'Anthony'
          ],
          totalSlots: 3
        },
        {
          duration: 10,
          slots: [
            'J1',
            'J2',
            'J3'
          ],
          totalSlots: 4
        }
      ]
    })
  }

  render() {
    return (
      <Grid container spacing={16}>
        {
          this.state.games.map((game, i) => (
            <Grid item lg={3} md={4} sm={6} key={i}>
              <Server key={i} {... game}/>
            </Grid>
          ))
        }
      </Grid>
    );
  }
}

/** Export with material theme and translations. */
export default materialTranslated(JoinServer, styles);
