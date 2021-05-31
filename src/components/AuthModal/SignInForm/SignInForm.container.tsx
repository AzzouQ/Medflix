import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  auth,
  database,
  initializeMessaging,
  translateError,
} from 'service/firebase';
import { userActions } from 'slices';
import type { FormikType, GoToType } from 'types';
import SignInForm from './SignInForm';

export declare namespace SignInType {
  type FormValues = {
    email: string;
    password: string;
  };
  type FormSubmit = FormikType.onSubmit<FormValues>;
  type FormProps = {
    formikSubmit: FormSubmit;
    goToSignUp: GoToType;
  };
}

type Props = {
  setModalOpen: (value: boolean) => void;
  setFormMode: (value: 'signIn' | 'signUp') => void;
};

const SignInFormContainer: React.FC<Props> = ({
  setModalOpen,
  setFormMode,
}) => {
  const dispatch = useDispatch();

  const formikSubmit: SignInType.FormSubmit = async (
    { email, password },
    { setFieldError, setSubmitting }
  ) => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      await database
        .ref(`/users/${user!.uid}`)
        .update({ updateDate: +new Date() });
      await initializeMessaging(user!);
      const userInfos = await database.ref(`/users/${user!.uid}`).get();
      dispatch(
        userActions.initUser({ user: { ...userInfos.val(), uid: user!.uid } })
      );
      setModalOpen(false);
    } catch (error) {
      const { field, message } = translateError(error);
      setFieldError(field, message);
    } finally {
      setSubmitting(false);
    }
  };

  const goToSignUp: GoToType = useCallback(() => {
    setFormMode('signUp');
  }, [setFormMode]);

  return <SignInForm {...{ formikSubmit, goToSignUp }} />;
};

export default SignInFormContainer;
