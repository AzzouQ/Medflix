import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import GravatarAPI from 'gravatar-api';

import {
  auth,
  database,
  translateError,
  initializeMessaging,
} from 'service/firebase';

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
    formikSubmit: FormSubmit;
    goToSignIn: GoToType;
    setModalOpen: (value: boolean) => void;
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

  const formikSubmit: SignUpType.FormSubmit = async (
    { name, email, password },
    { setFieldError, setSubmitting }
  ) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await database.ref(`/users/${user!.uid}`).set({
        name: name,
        email: email,
        createDate: +new Date(),
        updateDate: +new Date(),
        subscribersCount: 0,
        subscriptionsCount: 0,
        imageUrl: await GravatarAPI.imageUrl({
          email: email,
          parameters: {
            size: 500,
            default: 'identicon',
          },
        }),
      });
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

  const goToSignIn: GoToType = useCallback(() => {
    setFormMode('signIn');
  }, [setFormMode]);

  return <SignUpForm {...{ formikSubmit, goToSignIn, setModalOpen }} />;
};

export default SignUpFormContainer;
