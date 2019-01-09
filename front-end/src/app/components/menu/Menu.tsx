import * as React from 'react';
import { Button } from 'react-bootstrap';

import './Menu.scss';

export default class Menu extends React.Component {

  public render() {
    return (
      <div className='menu'>
          <h2>Menu</h2>
          <div className='menu_button'>
            <Button className='play' bsSize='large' bsStyle='primary' block={true}>
                Play
            </Button>
            <Button className='button' bsSize='large' block={true}>
                Level Editor
            </Button>
            <Button className='button' bsSize='large' block={true} disabled={true}>
                Shop
            </Button>
            <Button className='button' bsSize='large' block={true}>
                Statistics
            </Button>
            <Button className='button' bsSize='large' block={true}>
                Help
            </Button>
        </div>
      </div>
    );
  }
}
