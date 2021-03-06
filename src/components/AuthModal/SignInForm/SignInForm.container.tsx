import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import GravatarAPI from 'gravatar-api';
import {
  FacebookLogin,
  FacebookLoginResponse,
} from '@capacitor-community/facebook-login';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

import firebase, {
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
    formikSubmit: FormSubmit;
    goToSignUp: GoToType;
    onGoogle: GoToType;
    onFacebook: GoToType;
    setModalOpen: (value: boolean) => void;
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

  const onGoogle: GoToType = async () => {
    try {
      const response = await GoogleAuth.signIn();
      const credential = firebase.auth.GoogleAuthProvider.credential(
        response.authentication.idToken
      );
      const { user } = await auth.signInWithCredential(credential);
      const userInfosSnap = await database.ref(`/users/${user!.uid}`).get();
      const userInfos = userInfosSnap.val();
      if (userInfos) {
        await database
          .ref(`/users/${user!.uid}`)
          .update({ updateDate: +new Date() });
      } else {
        await database.ref(`/users/${user!.uid}`).set({
          name: user?.displayName,
          email: user?.email,
          createDate: +new Date(),
          updateDate: +new Date(),
          subscribersCount: 0,
          subscriptionsCount: 0,
          imageUrl: await GravatarAPI.imageUrl({
            email: user?.email,
            parameters: {
              size: 500,
              default: 'identicon',
            },
          }),
        });
      }
      await initializeMessaging(user!);
      dispatch(
        userActions.initUser({ user: { ...userInfos, uid: user!.uid } })
      );
      setModalOpen(false);
    } catch (error) {
      console.log('Google Error: ', error);
    }
  };

  const onFacebook: GoToType = async () => {
    try {
      const response: FacebookLoginResponse = await FacebookLogin.login(
        { permissions: ['public_profile', 'email'] }
      );
      const credential = firebase.auth.FacebookAuthProvider.credential(
        response.accessToken?.token ?? ''
      );
      console.log('HAVE BEEN UPDATED ?');
      const { user } = await auth.signInWithCredential(credential);
      const userInfosSnap = await database.ref(`/users/${user!.uid}`).get();
      const userInfos = userInfosSnap.val();
      if (userInfos) {
        await database
          .ref(`/users/${user!.uid}`)
          .update({ updateDate: +new Date() });
      } else {
        await database.ref(`/users/${user!.uid}`).set({
          name: user?.displayName,
          email: user?.email,
          createDate: +new Date(),
          updateDate: +new Date(),
          subscribersCount: 0,
          subscriptionsCount: 0,
          imageUrl: await GravatarAPI.imageUrl({
            email: user?.email,
            parameters: {
              size: 500,
              default: 'identicon',
            },
          }),
        });
      }
      await initializeMessaging(user!);
      dispatch(
        userActions.initUser({ user: { ...userInfos, uid: user!.uid } })
      );
      setModalOpen(false);
    } catch (error) {
      console.log('Facebook Error: ', error);
    }
  };

  return (
    <SignInForm
      {...{ formikSubmit, goToSignUp, onGoogle, onFacebook, setModalOpen }}
    />
  );
};

export default SignInFormContainer;
