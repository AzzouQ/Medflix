import { Col, Row } from 'antd';
import firebase from 'firebase/app';
import { Formik, FormikHelpers } from 'formik';
import { Form, Input, SubmitButton } from 'formik-antd';
import React from 'react';
import { useHistory } from 'react-router';
import * as Yup from 'yup';
import { t } from 'i18n';

type EditProfileFormalues = {
  name: string;
  desc: string;
  email: string;
  currentPassword: string;
  password: string;
};

const EditProfileForm: React.FC = () => {
  const { push } = useHistory();

  const yupValidation = Yup.object({
    password: Yup.string().required(t`form.password.error`),
    email: Yup.string()
      .required(t`form.email.error`)
      .email(t`form.email.error2`),
  });

  const reauthenticate = (
    currentPassword: string
  ): Promise<firebase.auth.UserCredential> | undefined => {
    var user = firebase.auth().currentUser;
    if (user && user.email) {
      var cred = firebase.auth.EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      return user.reauthenticateWithCredential(cred);
    } else return undefined;
  };

  const changeName = (name: string) => {
    var user = firebase.auth().currentUser;
    user && user.updateProfile({ displayName: name });
  };

  const changeDesc = (desc: string) => {
    var user = firebase.auth().currentUser;
    // user && user.updateDesc(desc);
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    const reAuth = reauthenticate(currentPassword);
    if (reAuth) {
      await reAuth
        .then(() => {
          var user = firebase.auth().currentUser;
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
          var user = firebase.auth().currentUser;
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
    { name, desc, email, currentPassword, password }: EditProfileFormalues,
    { setSubmitting, setFieldValue }: FormikHelpers<EditProfileFormalues>
  ) => {
    setFieldValue('password', '', false);
    try {
      if (name) changeName(name);
      if (desc) changeDesc(desc);
      if (email && currentPassword) await changeEmail(currentPassword, email);
      if (currentPassword && password) {
        await changePassword(currentPassword, password);
      }
      push('/home');
    } catch (e) {
      console.log(e);
      // TODO Handle error
    } finally {
      setSubmitting(false);
    }
  };

  const save = t('SAVE');

  const renderEditName = (): React.ReactElement | null => (
    <Row gutter={20}>
      <Col span={24}>
        <Form.Item name={'name'} label={t`form.name.label`}>
          <Input name={'name'} placeholder={t`form.name.placeholder`} />
        </Form.Item>
      </Col>
    </Row>
  );

  const renderEditEmail = (): React.ReactElement | null => (
    <Row gutter={20}>
      <Col span={24}>
        <Form.Item name={'email'} label={t`form.email.label`}>
          <Input name={'email'} placeholder={t`form.email.placeholder`} />
        </Form.Item>
      </Col>
    </Row>
  );

  const renderEditPassword = (): React.ReactElement | null => (
    <>
      <Row gutter={20}>
        <Col span={24}>
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
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
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
        </Col>
      </Row>
    </>
  );

  const renderSavebutton = (): React.ReactElement | null => (
    <Row gutter={20}>
      <Col span={24}>
        <Form.Item name={'editProfile'}>
          <SubmitButton type={'primary'} style={{ width: '100%' }}>
            {t`form.editProfile.save`}
          </SubmitButton>
        </Form.Item>
      </Col>
    </Row>
  );

  return (
    <Formik<EditProfileFormalues>
      initialValues={{
        name: '',
        desc: '',
        email: '',
        currentPassword: '',
        password: '',
      }}
      onSubmit={formikSubmit}
      // validationSchema={yupValidation}
    >
      {(formik) => (
        <Form name={'edit-profile'} size={'middle'} layout={'vertical'}>
          {renderEditName()}
          {renderEditEmail()}
          {renderEditPassword()}
          {renderSavebutton()}
        </Form>
      )}
    </Formik>
  );
};

export default EditProfileForm;
