import * as React from 'react';
import { FormikProps } from 'formik';
import { WithTranslation } from 'react-i18next';

interface IProps<F> extends FormikProps<F>, WithTranslation {} 

/**
 * Base formik form.
 * @template F - Form architecture.
 * @template P - Props.
 * @template S - State.
 */
export abstract class BaseForm<F, P extends IProps<F>, S = {}> extends React.Component<P, S> {

  /**
   * Says if the given field has an error.
   * @param field
   * @returns {boolean}
   */
  protected hasError = (field: keyof(F)): boolean => {
    const { errors, touched } = this.props;

    return errors[field] !== undefined && touched[field] !== undefined;
  };

  /**
   * Shows the translated error.
   * @param field
   * @returns {string}
   */
  protected showError = (field: keyof(F)): string => {
    const error = this.props.errors[field] as string;
    const touched = this.props.touched[field] !== undefined;

    let response = '';

    if (error && touched) response = this.props.t(error);

    return response;
  };

  /**
   * Changes the value of the field.
   * @param field
   */
  protected change = (field: keyof(F) & string) => (e: React.ChangeEvent) => {
    e.persist();

    this.props.handleChange(e);
    this.props.setFieldTouched(field, true);
  };
}
