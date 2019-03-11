import * as React from 'react';
import Button from '@material-ui/core/Button';
import 'material-design-icons/iconfont/material-icons.css';

import './Home.scss';
import { Link } from 'react-router-dom';
import { pathRoutes } from 'src/root.routes';

export default class HomeComponent extends React.Component {

  public render() {
    return (
      <div className='home'>
          <h2>Home</h2>
          <div className='home_button'>
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
            <Link to={pathRoutes.serverCreate}>
              <Button className='button row' variant='contained'>
                    <i className='material-icons md-48 col-3'>help_outline</i>
                    <p className='col-9 my-auto'>Help</p>
              </Button>
            </Link>
        </div>
      </div>
    );
  }
}
