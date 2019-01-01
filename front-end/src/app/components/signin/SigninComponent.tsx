import * as React from 'react';
import {FormControl, FormGroup} from 'react-bootstrap';
import './Signin.scss';
import Card from '@material-ui/core/Card';
import {Button, CardContent, CardHeader, Paper} from '@material-ui/core';
import {Signin} from './Signin';
import { ApiService } from 'src/app/services/api/api';
import {Observable} from 'rxjs';
import {FormEvent} from 'react';


class SigninComponent extends React.Component<Signin.Props, Signin.State> {

    /** API request. */
    private apiService: ApiService = ApiService.instance();

    constructor(props: Signin.Props) {
        super(props);

        const errors: Signin.FormErrors = {},
            form: Signin.Form = {
                email: '',
                password: '',
            };
        this.state = {errors, form};
    }


    public render() {

        return (
            <div className='Signin row'>
                <Card className='col-6 mx-auto p-0'>
                    <CardHeader className='purple-card-header text-white' title='Entrez vos informations'/>
                    <CardContent className='py-4 row'>
                        <form className='col-8 mx-auto' onSubmit={this.handleSubmit} >
                            <FormGroup controlId='email' bsSize='large'>
                                <FormControl
                                    placeholder='Adresse e-mail'
                                    type='email'
                                />
                            </FormGroup>
                            < FormGroup controlId='password' bsSize='large'>
                                <FormControl
                                    placeholder='Mot de passe'
                                    type='password'
                                />
                            </FormGroup>
                            < FormGroup controlId='password-confirm' bsSize='large'>
                                <FormControl
                                    placeholder='Confirmez votre mot de passe'
                                    type='password'
                                />
                            </FormGroup>

                            <Paper elevation={2} className='col-6 mx-auto p-0'>
                                <Button
                                    className='submit_button purple-button waves-effect waves-light col'
                                    variant='contained'
                                    type='submit'>
                                    Valider
                                </Button>
                            </Paper>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

// /**
//  * Returns whether there are any errors in the errors object that is passed in
//  * @param {IErrors} errors - The field errors
//  */
// private haveErrors(errors: IFormErrors) {
//   let haveError: boolean = false;
//   Object.keys(errors).map((key: string) => {
//     if (errors[key].length > 0) {
//       haveError = true;
//     }
//   });
//   return haveError;
// }

    /**
     * Handles form submission
     * @param {FormEvent} e - The form event
     */
    private handleSubmit = (e: FormEvent): void => {
        e.preventDefault();

        if (this.formIsValid()) {
            this.submitForm().subscribe((data) => {
                this.setState({
                    submitSuccess: true
                });
                console.log('Success', data);
            }, (err) => console.log('Error', err));
        }
    }

    /**
     * Executes the validation rules for all the fields on the form and sets the error state
     * @returns {boolean} - Whether the form is valid or not
     */
    private formIsValid(): boolean {
        // TODO - validate form
        return true;
    }

    /**
     * Submits the form to the API.
     * @returns {Observable<any>} - Whether the form submission was successful or not
     */
    private submitForm(): Observable<any> {
        // TODO: Send real data.
        const data: Signin.Api = {
            username: 'Johan doe',
            password: 'root'
        };
        return this.apiService.post<boolean>('/player/signin', data);
    }
}

export default SigninComponent;
