import React from 'react';
import { useHistory } from 'react-router';
import { Formik, FormikHelpers } from 'formik';
import { Form, Input, SubmitButton } from 'formik-antd';
import { Button, Row, Col } from 'antd';
import * as Yup from 'yup';

import LoadingModal from './LoadingModal';
import useTranslate from '../local/local';

type EditProfileFormalues = {
  name: string;
  desc: string;
  email: string;
  oldPassword: string;
  password: string;
};

const EditProfileForm: React.FC = () => {
  const { push } = useHistory();

  const yupValidation = Yup.object({
    password: Yup.string()
      .required('Veuillez entrer un password')
      .email('Le password est invalide'),
    email: Yup.string()
      .required('Veuillez entrer un email')
      .email("L'email est invalide"),
  });

  const formikSubmit = async (
    { name, desc, email, oldPassword, password }: EditProfileFormalues,
    { setSubmitting, setFieldValue }: FormikHelpers<EditProfileFormalues>
  ) => {
    setFieldValue('password', '', false);
    try {
      //   await signIn(email, password);
      push('/profile');
    } catch (e) {
      console.log(e);
      // TODO Handle error
    } finally {
      setSubmitting(false);
    }
  };

  const toProfile = () => {
    push('/profile');
  };

  const name = useTranslate("NAME")
  const namePlaceholder = useTranslate("NAME_PLACEHOLDER")
  const desc = useTranslate("DESC_TITLE")
  const descPlaceholder = useTranslate("DESC_PLACEHOLDER")
  const mail = useTranslate("EMAIL")
  const mailPlaceholder = useTranslate("EMAIL_PLACEHOLDER")
  const oldPass = useTranslate("OLD_PASSWORD_TITLE")
  const oldPassPlaceholder = useTranslate("OLD_PASSWORD_PLACEHOLDER")
  const newPass = useTranslate("NEW_PASSWORD_TITLE")
  const newPassPlaceholder = useTranslate("NEW_PASSWORD_PLACEHOLDER")
  const save = useTranslate("SAVE")
  
  const renderEditName = (): React.ReactElement | null => (
    <Row gutter={20}>
      <Col span={24}>
        <Form.Item name={'name'} label={name} required={true}>
          <Input name={'name'} placeholder={namePlaceholder} />
        </Form.Item>
      </Col>
    </Row>
  );
  const renderEditDesc = (): React.ReactElement | null => (
    <Row gutter={20}>
      <Col span={24}>
        <Form.Item name={'desc'} label={desc} required={true}>
          <Input name={'desc'} placeholder={descPlaceholder} />
        </Form.Item>
      </Col>
    </Row>
  );

  const renderEditEmail = (): React.ReactElement | null => (
    <Row gutter={20}>
      <Col span={24}>
        <Form.Item name={'email'} label={mail} required={true}>
          <Input name={'email'} placeholder={mailPlaceholder} />
        </Form.Item>
      </Col>
    </Row>
  );

  const renderEditPassword = (): React.ReactElement | null => (
    <>
      <Row gutter={20}>
        <Col span={24}>
          <Form.Item
            name={'oldPassword'}
            label={oldPass}
            required={true}
          >
            <Input.Password
              name={'oldPassword'}
              placeholder={oldPassPlaceholder}
              allowClear={true}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <Form.Item
            name={'password'}
            label={newPass}
            required={true}
          >
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
        oldPassword: '',
        password: '',
      }}
      onSubmit={formikSubmit}
      validationSchema={yupValidation}
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
