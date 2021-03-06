import React from 'react';
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
    setModalOpen: (value: boolean) => void;
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
      }
      if (currentPassword) {
        const credential = firebase.auth.EmailAuthProvider.credential(
          user!.email!,
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
      }
      const userInfos = await database.ref(`/users/${user!.uid}`).get();
      dispatch(
        userActions.initUser({ user: { ...userInfos.val(), uid: user!.uid } })
      );
      setModalOpen(false);
    } catch (error) {
      console.log(error.code);
      const { field, message } = translateError(error);
      setFieldError(field, message);
    } finally {
      setSubmitting(false);
    }
  };

  return <EditProfileForm {...{ formikSubmit, user, setModalOpen }} />;
};

export default EditProfileFormContainer;
