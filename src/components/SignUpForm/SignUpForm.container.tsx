import React, { useCallback } from 'react';

import { auth, database, translateError } from 'service/firebase';
import { initializeMessaging } from 'service/firebase/messaging';

import SignUpForm from './SignUpForm';

import type { FormikType, GoToType } from 'types';

export declare namespace SignUpType {
  type FormValues = {
    name: string;
    email: string;
    password: string;
  };
  type FormSubmit = FormikType.onSubmit<FormValues>;
  type FormProps = {
    signUpFormSubmit: FormSubmit;
    goToSignIn: GoToType;
  };
}

type Props = {
  setModalOpen: (value: boolean) => void;
  setFormMode: (value: 'signIn' | 'signUp') => void;
};

const SignUpFormContainer: React.FC<Props> = ({
  setModalOpen,
  setFormMode,
}) => {
  const signUpFormSubmit: SignUpType.FormSubmit = async (
    { name, email, password },
    { setFieldError, setSubmitting }
  ) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (user) {
        await database.ref(`/user/${user?.uid}`).set({
          name: name,
          createDate: +new Date(),
          updateDate: +new Date(),
          subscribers: null,
          subscriptions: null,
          subscribersCount: 0,
          subscriptionsCount: 0,
        });
        await initializeMessaging(user);
      }
      setModalOpen(false);
    } catch (error) {
      const { field, message } = translateError(error);
      setFieldError(field, message);
    } finally {
      setSubmitting(false);
    }
  };

  const goToSignIn: GoToType = useCallback(() => {
    setFormMode('signIn');
  }, [setFormMode]);

  return <SignUpForm {...{ signUpFormSubmit, goToSignIn }} />;
};

export default SignUpFormContainer;
