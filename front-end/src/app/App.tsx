import * as React from 'react';
import './App.scss';
import RouterOutlet from '../RouterOutlet';

/** Main component of the app. */
export default class App extends React.Component {
  public render(): JSX.Element {
    return (
      <div className="App">
        <header>
          <h1>Kaboom</h1>
        </header>

        <RouterOutlet/>
      </div>
    );
  }
}
