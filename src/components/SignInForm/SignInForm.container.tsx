import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
  auth,
  database,
  translateError,
  initializeMessaging,
} from 'service/firebase';

import SignInForm from './SignInForm';
import { userActions } from 'slices';

import type { FormikType, GoToType } from 'types';

export declare namespace SignInType {
  type FormValues = {
    email: string;
    password: string;
  };
  type FormSubmit = FormikType.onSubmit<FormValues>;
  type FormProps = {
    signInFormSubmit: FormSubmit;
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

  const signInFormSubmit: SignInType.FormSubmit = async (
    { email, password },
    { setFieldError, setSubmitting }
  ) => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      await database
        .ref(`/user/${user!.uid}`)
        .update({ updateDate: +new Date() });
      await initializeMessaging(user!);
      const userInfos = await database.ref(`/user/${user!.uid}`).get();
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

  return <SignInForm {...{ signInFormSubmit, goToSignUp }} />;
};

export default SignInFormContainer;
