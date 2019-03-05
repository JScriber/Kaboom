import * as React from 'react';
import { IProps, IState } from './ListMaps.model';
import { ListMapTile } from '../list-maps-tile/ListMapsTile';
import { Grid } from '@material-ui/core';
import { GridSpacing } from '@material-ui/core/Grid';

/** No content to display. */
const NoContent = () => <div>No content</div>;

/**
 * Map list.
 */
export default class ListMap extends React.Component<IProps, IState> {

  /** Space between the tiles. */
  private static readonly TILE_SPACING: GridSpacing = 24;

  /** State initialisation. */
  state: IState = {
    selectedId: null,
    previews: []
  };

  /**
   * Changes the selected tile.
   * @param {number | null} id
   */
  private selection = (id: number | null) => this.props.onSelect(id);

  /** Updates the state. */
  componentWillReceiveProps({ previews, selectedId }: IProps) {
    this.setState({ previews, selectedId });
  }

  /**
   * Renders all the tiles.
   * @returns {JSX.Element}
   */
  private renderTiles = (): JSX.Element => (
    <Grid container spacing={ListMap.TILE_SPACING}>
      {
        this.state.previews.map((p, i) => (
          <Grid item md={4} sm={3} key={i}>
            <ListMapTile
              map={p}
              selected={this.state.selectedId === p.id}
              onSelect={this.selection}/>
          </Grid>
        ))
      }
    </Grid>
  );

  render() {
    const { previews } = this.state;

    return (
      <React.Fragment>
        {
          previews.length > 0
            ? this.renderTiles()
            : <NoContent/>
        }
      </React.Fragment>
    );
  }
}
