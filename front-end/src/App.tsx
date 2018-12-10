import * as React from 'react';
import './assets/App.scss';
import Routes from './Routes';


class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <header>
                    <h1>Kaboom</h1>
                </header>
                <Routes />
                <body/>


                <footer/>
            </div>
        );
    }
}

export default App;

