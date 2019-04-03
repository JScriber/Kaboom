import * as React from 'react';

import { materialTranslated } from 'src/utils';
import { Paper, Avatar, Typography, ButtonBase } from '@material-ui/core';
import Person from '@material-ui/icons/Person';

import MapPreview from 'src/app/components/layout/map-preview/MapPreview';

// Model.
import { IProps, styles } from './Server.model';

/**
 * Graphical representation of a server.
 * @param props 
 */
const Server = (props: IProps) => {
  const { classes, slots, totalSlots, duration } = props;

  /** Displays missing slots. */
  const missingSlots = () => {
    const remaining = totalSlots - slots.length;
    const avatars: JSX.Element[] = [];

    for (let i = 0; i < remaining; ++ i) {
      avatars.push(
        <Avatar key={slots.length + i} className={classes.avatar}><Person/></Avatar>
      );
    }

    return avatars;
  };

  /** Handles name displaying. */
  const displayName = (name: string) => name.substring(0, 2).toUpperCase();

  return (
    <Paper elevation={0} square={true}>
      <ButtonBase className={classes.container}>
        <MapPreview dimensions="110px"/>

        <div className={classes.metadata}>
          {
            duration && (
              <Typography component="h5" variant="h5">{duration} min</Typography>
            )
          }
          <div className={classes.avatars}>
            {
              slots.map((slot, i) => (
                <Avatar key={i} className={classes.avatar}>
                  {displayName(slot)}
                </Avatar>
              ))
            }
            {
              missingSlots()
            }
          </div>
        </div>
      </ButtonBase>
    </Paper>
  );
};

/** Export with material theme and translations. */
export default materialTranslated(Server, styles);
