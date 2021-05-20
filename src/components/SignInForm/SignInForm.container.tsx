import React, { useCallback } from 'react';

import translateFirebaseError from 'service/translateFirebaseError';
import { initializeMessaging } from 'service/firebase/messaging';

import { auth, database } from 'service/firebase';

import SignInForm from './SignInForm';

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
  const signInFormSubmit: SignInType.FormSubmit = async (
    { email, password },
    { setFieldError, setSubmitting }
  ) => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      if (user) {
        await database
          .ref(`/user/${user.uid}`)
          .update({ updateDate: +new Date() });
        await initializeMessaging(user);
      }
      setModalOpen(false);
    } catch (error) {
      const { field, message } = translateFirebaseError(error);
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
