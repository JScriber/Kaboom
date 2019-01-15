import * as React from 'react';
import './ServerList.scss';
import {Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import 'material-design-icons/iconfont/material-icons.css';

import star from '../../../assets/images/star.png';
import map from '../../../assets/images/sky.png';

export default class ServerListComponent extends React.Component {

  public render() {

    const items = [];
    // items est temporaire et sera à remplacer par la liste des serveurs avec la map en cours et l'avatar des joueurs
    // Il faut garder les className pour le SCSS
    for (let i = 0; i < 15; i++) {
      items.push(
      <div className='item row m-1 p-2'>
        <div className='col-4 p-0'>
          <img className='map' src={map}/>
        </div>
        <div className='col-8 p-0'>
          <p>10 minutes</p>
          <div className='avatar-list'>
            <img className='m-1' src={star}/>
            <img className='m-1' src={star}/>
            <img className='m-1' src={star}/>
            <img className='m-1' src={star}/>
          </div>
        </div>
      </div>);
      }

    return (
      <div className='server-list-component'>
        <div className='row'>
          <div className='col-2'>
          <Link to={{
                      pathname: '/home'
                  }}>
            <Button className='button waves-effect waves-light mx-1' variant='outlined'>Accueil</Button>
            </Link>
          </div>
          <h2 className='col-8'>Liste des parties</h2>
        </div>

        <div className='server-list col-8 my-4 p-2'>
          {items}
        </div>
        <Button className='purple-button waves-effect waves-light mx-1' variant='outlined'>
          <i className='material-icons mr-2 md-24'>add_circle</i>
          <p className='my-auto'>Créer une partie</p>
        </Button>
      </div>
    );
  }
}
