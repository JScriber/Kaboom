import * as React from 'react';
import Button from '@material-ui/core/Button';
import 'material-design-icons/iconfont/material-icons.css';

import './Menu.scss';

export default class Menu extends React.Component {

  public render() {
    return (
      <div className='menu'>
          <h2>Menu</h2>
          <div className='menu_button'>
            <Button className='purple-button row' variant='contained'>
                <i className='material-icons md-96 col-3'>play_circle_filled</i>
                <p className='col-6 mr-3 my-auto'>Play</p>
            </Button>
            <Button className='button row' variant='contained'>
                  <i className='material-icons md-48 col-3'>map</i>
                  <p className='col-9 my-auto'>Level Editor</p>
            </Button>
            <Button className='button row' variant='contained' disabled={true}>
                  <i className='material-icons md-48 col-3'>shopping_basket</i>
                  <p className='col-9 my-auto'>Shop</p>
            </Button>
            <Button className='button row' variant='contained' >
                  <i className='material-icons md-48 col-3'>show_chart</i>
                  <p className='col-9 my-auto'>Statistics</p>
            </Button>
            <Button className='button row' variant='contained'>
                  <i className='material-icons md-48 col-3'>help_outline</i>
                  <p className='col-9 my-auto'>Help</p>
            </Button>
        </div>
      </div>
    );
  }
}
