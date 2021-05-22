import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { auth, database, translateError } from 'service/firebase';
import { initializeMessaging } from 'service/firebase/messaging';

import SignUpForm from './SignUpForm';
import { userActions } from 'slices';

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
  const dispatch = useDispatch();

  const signUpFormSubmit: SignUpType.FormSubmit = async (
    { name, email, password },
    { setFieldError, setSubmitting }
  ) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await database.ref(`/user/${user!.uid}`).set({
        name: name,
        email: email,
        createDate: +new Date(),
        updateDate: +new Date(),
        subscribersCount: 0,
        subscriptionsCount: 0,
      });
      await initializeMessaging(user!);
      const userInfos = await database.ref(`/user/${user!.uid}`).get();
      dispatch(userActions.setUser({ user: userInfos.val() }));
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
