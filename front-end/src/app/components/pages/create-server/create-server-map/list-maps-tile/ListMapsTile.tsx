import * as React from 'react';
import { ButtonBase, Typography, withStyles } from '@material-ui/core';
import * as classNames from 'classnames';

// Class models.
import { IProps, IState, styles } from './ListMapsTile.model';
import MapPreview from 'src/app/components/layout/map-preview/MapPreview';

/**
 * Displays the map preview.
 */
class ListMapTile extends React.Component<IProps, IState> {

  /** State initialisation. */
  state: IState = {
    map: {
      id: -1,
      name: ''
    },
    selected: false
  };

  /** Selects the tile. */
  private select = () => {
    const { id } = this.state.map;
    this.props.onSelect(id);
  }

  /** Called when the props change. */
  componentWillReceiveProps(props: IProps) {
    this.setState({
      selected: props.selected,
      map: props.map
    });
  }

  render() {
    const { classes } = this.props;

    const { selected, map } = this.state;
    let baseClasses;
    
    if (selected) {
      baseClasses = classNames(classes.container, classes.selected);
    } else {
      baseClasses = classNames(classes.container);      
    }

    return (
      <ButtonBase focusRipple className={baseClasses} onClick={this.select} color="primary">
        <MapPreview/>

        <Typography
          className={classes.label}
          noWrap={true}
          color={selected ? 'primary' : 'default'}
        >{map.name}</Typography>
      </ButtonBase>
    )
  }
}

export default withStyles(styles)(ListMapTile);
