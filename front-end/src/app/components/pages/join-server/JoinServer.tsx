import * as React from 'react';
import 'material-design-icons/iconfont/material-icons.css';

import './JoinServer.scss';

import star from '../../../../assets/images/star.png';
import map from '../../../../assets/images/sky.png';

export default class JoinServer extends React.Component {

  render() {

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
        <div className='server-list col-8 my-4 p-2'>
          {items}
        </div>
      </div>
    );
  }
}
