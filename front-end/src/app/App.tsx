import * as React from 'react';
import './App.scss';
import RouterOutlet from '../RouterOutlet';
import Header from './components/header/Header';

/** Main component of the app. */
export default class App extends React.Component {
  public render(): JSX.Element {
    return (
      <div className='App'>
        <Header/>

        <RouterOutlet/>
      </div>
    );
  }
}
