import { Formik, FormikHelpers } from 'formik';
import { Form, Input, SubmitButton } from 'formik-antd';
import React from 'react';
import { useHistory } from 'react-router';
import * as Yup from 'yup';
import { t } from 'i18n';
import { IonCol, IonRow } from '@ionic/react';
import type { EditProfileType } from './EditProfileForm.container';
import firebase, { auth, database } from 'service/firebase';
import { useDispatch } from 'react-redux';
import { userActions } from 'slices';

type EditProfileFormalues = {
  name: string;
  email: string;
  currentPassword: string;
  password: string;
};

const EditProfileForm: React.FC<EditProfileType.FormProps> = ({
  user,
  setModalOpen,
}) => {
  const { push } = useHistory();
  const dispatch = useDispatch();

  const yupValidation = Yup.object({
    password: Yup.string().required(t`form.password.error`),
    email: Yup.string()
      .required(t`form.email.error`)
      .email(t`form.email.error2`),
  });

  const reauthenticate = (
    currentPassword: string
  ): Promise<firebase.auth.UserCredential> | undefined => {
    var user = auth.currentUser;
    if (user && user.email) {
      var cred = firebase.auth.EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      return user.reauthenticateWithCredential(cred);
    } else return undefined;
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    const reAuth = reauthenticate(currentPassword);
    if (reAuth) {
      await reAuth
        .then(() => {
          var user = auth.currentUser;
          user &&
            user
              .updatePassword(newPassword)
              .then(() => {
                console.log('Password updated!');
              })
              .catch((error) => {
                console.log(error);
              });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const changeEmail = async (currentPassword: string, newEmail: string) => {
    const reAuth = reauthenticate(currentPassword);
    if (reAuth) {
      await reAuth
        .then(() => {
          var user = auth.currentUser;
          user &&
            user
              .updateEmail(newEmail)
              .then(() => {
                console.log('Email updated!');
              })
              .catch((error) => {
                console.log(error);
              });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const formikSubmit = async (
    { name, email, currentPassword, password }: EditProfileFormalues,
    { setSubmitting, setFieldValue }: FormikHelpers<EditProfileFormalues>
  ) => {
    setFieldValue('password', '', false);
    try {
      if (email && currentPassword) await changeEmail(currentPassword, email);
      if (currentPassword && password) {
        await changePassword(currentPassword, password);
      }
      await database.ref(`/users/${user!.uid}`).update({
        name: name,
        email: email,
      });
      const userInfos = await database.ref(`/users/${user!.uid}`).get();
      dispatch(
        userActions.initUser({ user: { ...userInfos.val(), uid: user!.uid } })
      );
      push('/home');
    } catch (e) {
      console.log(e);
      // TODO Handle error
    } finally {
      setSubmitting(false);
      setModalOpen(false);
    }
  };

  const renderEditName = (): React.ReactElement | null => (
    <IonCol size={'auto'}>
      <Form.Item name={'name'} label={t`form.name.label`}>
        <Input
          name={'name'}
          placeholder={t`form.name.placeholder`}
          allowClear={true}
        />
      </Form.Item>
    </IonCol>
  );

  const renderEditEmail = (): React.ReactElement | null => (
    <IonCol size={'auto'}>
      <Form.Item name={'email'} label={t`form.email.label`}>
        <Input
          name={'email'}
          placeholder={t`form.email.placeholder`}
          allowClear={true}
        />
      </Form.Item>
    </IonCol>
  );

  const renderEditPassword = (): React.ReactElement | null => (
    <IonRow>
      <IonCol size={'auto'}>
        <Form.Item
          name={'currentPassword'}
          label={t`form.editProfile.oldPassword.label`}
        >
          <Input.Password
            name={'currentPassword'}
            placeholder={t`form.editProfile.oldPassword.placeholder`}
            allowClear={true}
          />
        </Form.Item>
      </IonCol>

      <IonCol size={'auto'}>
        <Form.Item
          name={'password'}
          label={t`form.editProfile.newPassword.label`}
        >
          <Input.Password
            name={'password'}
            placeholder={t`form.editProfile.newPassword.placeholder`}
            allowClear={true}
          />
        </Form.Item>
      </IonCol>
    </IonRow>
  );

  const renderSavebutton = (): React.ReactElement | null => (
    <IonCol size={'auto'}>
      <Form.Item name={'editProfile'}>
        <SubmitButton type={'primary'} style={{ width: '100%' }}>
          {t`form.editProfile.save`}
        </SubmitButton>
      </Form.Item>
    </IonCol>
  );

  return (
    <IonRow
      style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}
    >
      <Formik<EditProfileFormalues>
        initialValues={{
          name: user?.name ? user.name : '',
          email: user?.email ? user.email : '',
          currentPassword: '',
          password: '',
        }}
        onSubmit={formikSubmit}
        // validationSchema={yupValidation}
      >
        {(formik) => (
          <Form name={'edit-profile'} size={'middle'} layout={'vertical'}>
            <IonCol size={'auto'}>
              {renderEditName()}
              {renderEditEmail()}
              {renderEditPassword()}
              {renderSavebutton()}
            </IonCol>
          </Form>
        )}
      </Formik>
    </IonRow>
  );
};

export default EditProfileForm;
