import * as React from 'react';
import { Grid, Paper, Fab, Theme, createStyles } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

// App mechanism.
import { TranslateAndStyle, materialTranslated } from 'src/utils';

// Style.
import './CreateServer.scss';

// Local components.
import CreateServerMap from './create-server-map/CreateServerMap';
import CreateServerSettings from './create-server-settings/CreateServerSettings';

/**
 * Component styling.
 * @param theme 
 */
export const styles = ({ spacing }: Theme) => createStyles({
  fab: {
    position: "fixed",
    bottom: spacing.unit * 2,
    right: spacing.unit * 2,
  }
});

interface IProps extends TranslateAndStyle<typeof styles> {}

/**
 * Component used to create a server.
 * Acts as an orchestrator.
 */
class CreateServer extends React.Component<IProps> {

  /** Form submit. */
  private submit = () => {
    // TODO: Fetch data.
    console.log('Submit.');
  };

  render() {
    return (
      <React.Fragment>
        <Grid container spacing={16} className="create-server">
          <Grid item lg={7} md={6} sm={12}>
            <Paper>
              <CreateServerSettings/>
            </Paper>
          </Grid>

          <Grid item lg={5} md={6} sm={12}>
            <Paper>
              <CreateServerMap/>
            </Paper>
          </Grid>
        </Grid>

        <Fab color="primary" className={this.props.classes.fab} onClick={this.submit}>
          <SendIcon/>
        </Fab>
      </React.Fragment>
    );
  }
}

/** Export with material theme and translations. */
export default materialTranslated(CreateServer, styles);
