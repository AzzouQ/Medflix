import { FormikHelpers } from 'formik';

export declare namespace FormikType {
  type onSubmit<T> = (
    values: T,
    formikHelpers: FormikHelpers<T>
  ) => void | Promise<any>;
}
