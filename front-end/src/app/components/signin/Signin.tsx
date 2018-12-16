import * as React from 'react';
import {FormControl, FormGroup} from 'react-bootstrap';
import './Signin.scss';
import Card from '@material-ui/core/Card';
import {Button, CardContent, CardHeader, Paper} from "@material-ui/core";

// TODO: Move all those interfaces out of this file.
interface IFormProps {
    /* The http path that the form will be posted to */
    action: string;
}

export interface IFormValues {
    /* Key value pairs for all the field values with key being the field name */
    [key: string]: any;
}

export interface IFormErrors {
    /* The validation error messages for each field (key is the field name */
    [key: string]: string;
}

export interface IFormState {
    /* The field values */
    values: IFormValues;

    /* The field validation error messages */
    errors: IFormErrors;

    /* Whether the form has been successfully submitted */
    submitSuccess?: boolean;
}

class Signin extends React.Component<IFormProps, IFormState> {
    constructor(props: IFormProps) {
        super(props);

        const errors: IFormErrors = {};
        const values: IFormValues = {};
        this.state = {
            errors,
            values
        };
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

    // /**
    //  * Handles form submission
    //  * @param {React.FormEvent<HTMLFormElement>} e - The form event
    //  */
    // private handleSubmit = async (
    //   e: React.FormEvent<HTMLFormElement>
    // ): Promise<void> => {
    //   e.preventDefault();
    //
    //   if (this.validateForm()) {
    //     const submitSuccess: boolean = await this.submitForm();
    //     this.setState({submitSuccess});
    //   }
    // };

    // /**
    //  * Executes the validation rules for all the fields on the form and sets the error state
    //  * @returns {boolean} - Whether the form is valid or not
    //  */
    // private validateForm(): boolean {
    //   // TODO - validate form
    //   return true;
    // }
    //
    // /**
    //  * Submits the form to the http api
    //  * @returns {boolean} - Whether the form submission was successful or not
    //  */
    // private async submitForm(): Promise<boolean> {
    //   // TODO - submit the form
    //   return true;
    // }

    public render() {

        return (
            <div className="Signin row">
                <Card className="col-6 mx-auto p-0 mt-5">
                    <CardHeader className="purple-card-header text-white" title="Entrez vos informations"/>
                    <CardContent className="py-4 row">
                        <form className="col-8 mx-auto">
                            <FormGroup controlId="email" bsSize="large">
                                <FormControl
                                    placeholder="Adresse e-mail"
                                    type="email"
                                />
                            </FormGroup>
                            < FormGroup controlId="password" bsSize="large">
                                <FormControl
                                    placeholder="Mot de passe"
                                    type="password"
                                />
                            </FormGroup>
                            < FormGroup controlId="password-confirm" bsSize="large">
                                <FormControl
                                    placeholder="Confirmez votre mot de passe"
                                    type="password"
                                />
                            </FormGroup>

                            <Paper elevation={2} className="row">
                            <Button
                                className="submit_button purple-button waves-effect waves-light col"
                                variant="contained"
                                type="submit">
                                Valider
                            </Button>
                            </Paper>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default Signin;
