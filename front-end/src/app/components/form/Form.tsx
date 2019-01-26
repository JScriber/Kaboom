import * as React from 'react';
import { FormControl } from 'react-bootstrap';

import * as F from './Form.model';
import { ApiService } from '../../services/api/api';

/**
 * Base form component.
 * @template P - Props.
 * @template S - Form state.
 */
export abstract class FormComponent<P, S extends F.FormState> extends React.Component<P, S> {

  /** Form state. */
  public state: S;

  /** API request. */
  protected api: ApiService = ApiService.instance();

  constructor(p: P, s: S) {
    super(p, s);

    this.state = {
      form: this.formBuilder(),
      errors: {}
    } as S;

    // Binding for JSX usage.
    this.submit = this.submit.bind(this);
    this.formChange = this.formChange.bind(this);
  }

  /**
   * Listener for form changes.
   * @param {React.FormEvent<FormControl>} event
   */
  protected formChange({ target }: React.FormEvent<FormControl>): void {
    const { value, name } = target as HTMLInputElement;

    if (value !== undefined) {
      const form: Partial<F.Form> = this.state.form;
      form[name] = value;

      this.setState({ form: form as F.Form });
    }
  }

  /**
   * Form submition (plug form submit to it)
   * @param {React.FormEvent} e
   * @returns {boolean} - Cancelled behavior.
   */
  protected submit(e: React.FormEvent): boolean {
    // Cancel default behavior.
    e.preventDefault();

    if (this.formValid()) {
      this.submition(this.state.form);
    } else {
      this.invalidForm();
    }

    return false;
  }

  /**
   * Says if the form is valid or not.
   * @returns {boolean}
   */
  protected abstract formValid(): boolean;

  /**
   * Form building.
   * @returns {F.Form}
   */
  protected abstract formBuilder(): F.Form;

  /** Treatment during submition. */
  protected abstract submition(form: F.Form): void;

  /** Treatment when invalid form. */
  protected abstract invalidForm(): void;
}
