import { Col, Row } from 'antd';
import firebase from 'firebase/app';
import { Formik, FormikHelpers } from 'formik';
import { Form, Input, SubmitButton } from 'formik-antd';
import React from 'react';
import { useHistory } from 'react-router';
import * as Yup from 'yup';
import { t } from 'i18n';
import LoadingModal from './LoadingModal';

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
    password: Yup.string().required('Veuillez entrer un password'),
    email: Yup.string()
      .required('Veuillez entrer un email')
      .email("L'email est invalide"),
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

  const name = t('NAME');
  const namePlaceholder = t('NAME_PLACEHOLDER');
  const desc = t('DESC_TITLE');
  const descPlaceholder = t('DESC_PLACEHOLDER');
  const mail = t('EMAIL');
  const mailPlaceholder = t('EMAIL_PLACEHOLDER');
  const oldPass = t('OLD_PASSWORD_TITLE');
  const oldPassPlaceholder = t('OLD_PASSWORD_PLACEHOLDER');
  const newPass = t('NEW_PASSWORD_TITLE');
  const newPassPlaceholder = t('NEW_PASSWORD_PLACEHOLDER');
  const save = t('SAVE');

  const renderEditName = (): React.ReactElement | null => (
    <Row gutter={20}>
      <Col span={24}>
        <Form.Item name={'name'} label={name}>
          <Input name={'name'} placeholder={namePlaceholder} />
        </Form.Item>
      </Col>
    </Row>
  );

  const renderEditDesc = (): React.ReactElement | null => (
    <Row gutter={20}>
      <Col span={24}>
        <Form.Item name={'desc'} label={desc}>
          <Input name={'desc'} placeholder={descPlaceholder} />
        </Form.Item>
      </Col>
    </Row>
  );

  const renderEditEmail = (): React.ReactElement | null => (
    <Row gutter={20}>
      <Col span={24}>
        <Form.Item name={'email'} label={mail}>
          <Input name={'email'} placeholder={mailPlaceholder} />
        </Form.Item>
      </Col>
    </Row>
  );

  const renderEditPassword = (): React.ReactElement | null => (
    <>
      <Row gutter={20}>
        <Col span={24}>
          <Form.Item name={'currentPassword'} label={oldPass}>
            <Input.Password
              name={'currentPassword'}
              placeholder={oldPassPlaceholder}
              allowClear={true}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <Form.Item name={'password'} label={newPass}>
            <Input.Password
              name={'password'}
              placeholder={newPassPlaceholder}
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
            {save}
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
          <LoadingModal isLoading={formik.isSubmitting} />
          {renderEditName()}
          {renderEditDesc()}
          {renderEditEmail()}
          {renderEditPassword()}
          {renderSavebutton()}
        </Form>
      )}
    </Formik>
  );
};

export default EditProfileForm;
