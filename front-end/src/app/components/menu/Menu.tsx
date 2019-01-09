import * as React from 'react';
import { Button } from 'react-bootstrap';
import 'material-design-icons/iconfont/material-icons.css';

import './Menu.scss';

export default class Menu extends React.Component {

  public render() {
    return (
      <div className='menu'>
          <h2>Menu</h2>
          <div className='menu_button'>
            <Button className='play' bsSize='large' bsStyle='primary' block={true}>
              <div className='row'>
                <i className='material-icons md-96 col-3'>play_circle_filled</i>
                <p className='col-6'>Play</p>
              </div>
            </Button>
            <Button className='button' bsSize='large' block={true}>
              <div className='row'>
                  <i className='material-icons md-48 col-3'>map</i>
                  <p className='col-9'>Level Editor</p>
              </div>
            </Button>
            <Button className='button' bsSize='large' block={true} disabled={true}>
              <div className='row'>
                  <i className='material-icons md-48 col-3'>shopping_basket</i>
                  <p className='col-9'>Shop</p>
              </div>
            </Button>
            <Button className='button' bsSize='large' block={true}>
              <div className='row'>
                  <i className='material-icons md-48 col-3'>show_chart</i>
                  <p className='col-9'>Statistics</p>
              </div>
            </Button>
            <Button className='button' bsSize='large' block={true}>
              <div className='row'>
                  <i className='material-icons md-48 col-3'>help_outline</i>
                  <p className='col-9'>Help</p>
              </div>
            </Button>
        </div>
      </div>
    );
  }
}
