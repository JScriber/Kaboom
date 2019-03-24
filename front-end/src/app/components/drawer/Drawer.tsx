import * as React from 'react';
import { ListItemIcon, ListItemText, Divider, List, ListItem } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';

import { IProps, styles, IState, Link } from './Drawer.model';
import { materialTranslated } from 'src/utils';
import { pathRoutes } from 'src/root.routes';
import { push } from 'connected-react-router';
import { store } from 'src/app/redux';

// Icons.
import ListIcon from '@material-ui/icons/PlayCircleFilledOutlined';
import AddIcon from '@material-ui/icons/LibraryAddOutlined';
import MapIcon from '@material-ui/icons/MapOutlined';
import ChartIcon from '@material-ui/icons/BarChartOutlined';
import HelpIcon from '@material-ui/icons/HelpOutline';
import i18next from 'i18next';

/**
 * Drawer component.
 * Allows the user to access all the pages instantly.
 */
class DrawerComponent extends React.Component<IProps> {

  /** Main links. */
  private mainLinks: Link[] = [
    {
      name: 'DRAWER.JOIN_GAME',
      icon: <ListIcon/>,
      link: pathRoutes.home
    },
    {
      name: 'DRAWER.CREATE_GAME',
      icon: <AddIcon/>,
      link: pathRoutes.serverCreate
    },
    {
      name: 'DRAWER.EDIT_MAPS',
      icon: <MapIcon/>,
      link: pathRoutes.levelEditor
    }
  ];

  /** Other links, less important. */
  private otherLinks: Link[] = [
    {
      name: 'DRAWER.MY_STATS',
      icon: <ChartIcon/>,
      link: pathRoutes.stats
    },
    {
      name: 'DRAWER.INFORMATIONS',
      icon: <HelpIcon/>,
      link: pathRoutes.informations
    }
  ];

  /**
   * Displays the given links in a list.
   * @param {Link[]} links - List of links.
   * @param {i18next.TFunction} - Translation function.
   */
  private displayLinks = (links: Link[], t: i18next.TFunction) => {
    return links.map((link, index) => (
      <ListItem button key={index} onClick={() => store.dispatch(push(link.link))}>
        <ListItemIcon>{link.icon}</ListItemIcon>
        <ListItemText primary={t(link.name)} />
      </ListItem>
    ));
  };

  render() {
    const { open, classes, t } = this.props;

    return (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar}/>

        <List>
          {this.displayLinks(this.mainLinks, t)}
        </List>
        <Divider/>
        <List>
          {this.displayLinks(this.otherLinks, t)}
        </List>
      </Drawer>
    );
  }
}

/** Export with material theme and translations. */
export default materialTranslated(DrawerComponent, styles);

