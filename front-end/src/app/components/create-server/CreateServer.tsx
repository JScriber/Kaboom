import * as React from 'react';
import { Grid, Paper } from '@material-ui/core';

// Style.
import './CreateServer.scss';

// Local components.
import CreateServerMap from './create-server-map/CreateServerMap';
import CreateServerSettings from './create-server-settings/CreateServerSettings';

/**
 * Component used to create a server.
 * Acts as an orchestrator.
 */
export default class CreateServer extends React.Component {

  render() {
    return (
      <Grid container spacing={16} className="create-server">
        <Grid item xs={8}>
          <Paper>
            <CreateServerSettings/>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper>
            <CreateServerMap/>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
