import * as React from 'react';
import './Header.scss';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import { pathRoutes } from 'src/root.routes';

interface IHeaderProps {
    name?: string;
}

export default class Header extends React.Component<IHeaderProps> {

    public render() {
        return (
            <Paper elevation={2} className='mb-4'>
                <div className='header p-1'>
                  <div className='header-left'>
                  <Link to={{
                              pathname: pathRoutes.home
                          }}>
                    <img className='logo'src={logo} alt='KABOOM logo bomb'/>
                  </Link>
                  </div>
                  <div className='header-right my-auto'>
                    {this.props.name != null &&
                    <div className='disconnection'>
                    < p>Bonjour {this.props.name}
                     <Link to={{
                              pathname: '/'
                          }}>
                          <Button className='purple-button mx-1 waves-effect waves-light' variant='contained' >
                              Déconnexion
                          </Button>
                      </Link>
                      </p>
                    </div>}
                    {this.props.name == null &&
                      <div className='connection'>
                          <Link to={{
                              pathname: '/login'
                          }}>
                          <Button className='purple-button mx-1 waves-effect waves-light' variant='contained' >
                              Connexion
                          </Button>
                          </Link>
                          <Link to={{
                              pathname: '/signin'
                          }}>
                          <Button className='purple-button mx-1 waves-effect waves-light' variant='contained'>
                              Inscription
                          </Button>
                          </Link>
                        </div>
                    }</div>
                </div>
            </Paper>
        );
    }
}
