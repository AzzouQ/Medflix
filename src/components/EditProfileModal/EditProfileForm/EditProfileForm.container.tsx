import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import firebase, { auth, database, translateError } from 'service/firebase';

import EditProfileForm from './EditProfileForm';
import { userActions, userSelectors, UserState } from 'slices';

import type { FormikType } from 'types';

export declare namespace EditProfileFormType {
  type FormValues = {
    name: string | undefined;
    email: string | undefined;
    currentPassword: string | undefined;
    newPassword: string | undefined;
  };
  type FormSubmit = FormikType.onSubmit<FormValues>;
  type FormProps = {
    formikSubmit: FormSubmit;
    user: UserState;
  };
}

type Props = {
  setModalOpen: (value: boolean) => void;
};

const EditProfileFormContainer: React.FC<Props> = ({ setModalOpen }) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.getUser);

  const formikSubmit: EditProfileFormType.FormSubmit = async (
    { name, email, currentPassword, newPassword },
    { setSubmitting, setFieldError }
  ) => {
    try {
      if (name !== user?.name) {
        await database.ref(`/users/${user!.uid}`).update({ name });
      } else if (currentPassword) {
        const credential = firebase.auth.EmailAuthProvider.credential(
          email!,
          currentPassword
        );
        await auth.currentUser?.reauthenticateWithCredential(credential);
        if (email !== user?.email) {
          await auth.currentUser?.updateEmail(email!);
          await database.ref(`/users/${user!.uid}`).update({ email });
        }
        if (newPassword) {
          await auth.currentUser?.updatePassword(newPassword);
        }
      } else if (name !== user?.name) {
        await database.ref(`/users/${user!.uid}`).update({ name });
      }
      const userInfos = await database.ref(`/users/${user!.uid}`).get();
      dispatch(userActions.initUser({ user: userInfos.val() }));
      setModalOpen(false);
    } catch (error) {
      console.log('Formik Error: ', JSON.stringify(error, null, 2));
      const { field, message } = translateError(error);
      setFieldError(field, message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const initUser = async (currentUser: firebase.User) => {
      const user = await database.ref(`/users/${currentUser!.uid}`).get();
      dispatch(
        userActions.initUser({ user: { ...user.val(), uid: currentUser!.uid } })
      );
    };
    !user &&
      auth.onAuthStateChanged((currentUser) => {
        if (currentUser) {
          initUser(currentUser);
        }
      });
  }, [dispatch, user]);

  return <EditProfileForm {...{ formikSubmit, user }} />;
};

export default EditProfileFormContainer;
