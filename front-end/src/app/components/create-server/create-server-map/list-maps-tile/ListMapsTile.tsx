import * as React from 'react';
import { ButtonBase, Typography } from '@material-ui/core';
import * as classNames from 'classnames';

// Style.
import './ListMapsTile.scss';

// Class models.
import { IProps, IState } from './ListMapsTile.model';

/**
 * Displays the map preview.
 */
export class ListMapTile extends React.Component<IProps, IState> {

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
    const { selected, map } = this.state;
    const classes = classNames('list-tile-container', { selected });

    return (
      <ButtonBase focusRipple className={classes} onClick={this.select} color="primary">
        <div className="list-tile">
          <div className="list-tile-image">
            
          </div>
          <Typography>{map.name}</Typography>
        </div>
      </ButtonBase>
    )
  }
}
