import React, { useCallback } from 'react';

import translateFirebaseError from 'service/translateFirebaseError';
import { initializeMessaging } from 'service/firebase/messaging';

import { auth, database } from 'service/firebase';

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

// export const signUp = async (name: string, email: string, password: string) => {
//   const { user } = await auth.createUserWithEmailAndPassword(email, password);
//   const date = +new Date();
//   await database.ref(`/user/${user?.uid}`).set({
//     name,
//     creationDate: date,
//     lastOnline: date,
//     followerNb: 0,
//     followers: [],
//     following: [],
//     followingNb: 0,
//   });
//   await setFcm();
// };

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
          subscribers: [],
          subscriptions: [],
          subscribersCount: 0,
          subscriptionsCount: 0,
        });
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

  const goToSignIn: GoToType = useCallback(() => {
    setFormMode('signIn');
  }, [setFormMode]);

  return <SignUpForm {...{ signUpFormSubmit, goToSignIn }} />;
};

export default SignUpFormContainer;
