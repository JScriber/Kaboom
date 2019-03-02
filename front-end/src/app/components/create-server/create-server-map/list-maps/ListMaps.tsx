import * as React from 'react';
import { IProps, IState } from './ListMaps.model';

/**
 * Displays the map preview.
 */
class ListMapTile extends React.Component {

  render() {
    return <div>Hello</div>
  }
}

/** No content to display. */
const NoContent = () => <div>No content</div>;

/**
 * Map list.
 */
export default class ListMap extends React.Component<IProps, IState> {

  /** State initialisation. */
  state: IState = {
    previews: []
  };

  /** Updates the state. */
  componentWillReceiveProps({ previews }: IProps) {
    this.setState({ previews });
  }

  render() {
    const { previews } = this.state;

    return (
      <React.Fragment>
        {
          previews.length > 0
            ? previews.map(p => <ListMapTile/>)
            : <NoContent/>
        }
      </React.Fragment>
    );
  }
}
