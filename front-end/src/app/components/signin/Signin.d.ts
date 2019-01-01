export namespace Signin {

    export interface Form {
        email: string;
        password: string;
    }

    export interface FormErrors {
        /* The validation error messages for each field (key is the field name */
        [key: string]: string;
    }

    /** State of the Signin component. */
    export interface State {
        /* The field values. */
        form: Form;

        /* The field validation error messages. */
        errors: FormErrors;

        /* Whether the form has been successfully submitted. */
        submitSuccess?: boolean;
    }

    /** Props of the signin component. */
    export interface Props {
        /** The HTTP path that the form will be posted to. */
        action: string;
    }

    export interface Api {
        username: string;
        password: string;
    }
}
