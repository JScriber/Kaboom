import * as React from 'react';
import './Header.scss';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';

interface IHeaderProps {
    name?: string;
}

export default class Header extends React.Component<IHeaderProps> {

    public render() {
        return (
            <Paper elevation={2} className='mb-5'>
                <div className='Header row text-left pl-2'>
                    <div className='header-title col'>Kaboom !</div>
                    <div className='col-auto'>
                        {this.props.name != null && <p>Bonjour {this.props.name}</p>}
                    </div>
                    <div className='col-auto my-auto'>{
                        this.props.name == null &&
                        <div>
                            <Link to={{
                                pathname: '/login'
                            }}>
                            <Button variant='contained' className='purple-button mx-1 waves-effect waves-light'>
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
