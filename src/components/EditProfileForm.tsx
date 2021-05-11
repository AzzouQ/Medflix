import React from 'react';
import { useHistory } from 'react-router';
import { Formik, FormikHelpers } from 'formik';
import { Form, Input, SubmitButton } from 'formik-antd';
import { Button, Row, Col } from 'antd';
import * as Yup from 'yup';

import LoadingModal from './LoadingModal';

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
    password: Yup.string().required('Veuillez entrer un password'),
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

  const renderEditName = (): React.ReactElement | null => (
    <Row gutter={20}>
      <Col span={24}>
        <Form.Item name={'name'} label={'Nom'} required={true}>
          <Input name={'name'} placeholder={'bastien'} />
        </Form.Item>
      </Col>
    </Row>
  );
  const renderEditDesc = (): React.ReactElement | null => (
    <Row gutter={20}>
      <Col span={24}>
        <Form.Item name={'desc'} label={'Description'} required={true}>
          <Input name={'desc'} placeholder={'je lés aime tousse...'} />
        </Form.Item>
      </Col>
    </Row>
  );

  const renderEditEmail = (): React.ReactElement | null => (
    <Row gutter={20}>
      <Col span={24}>
        <Form.Item name={'email'} label={'E-mail'} required={true}>
          <Input name={'email'} placeholder={'bastien.silhol@epitech.eu'} />
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
            label={'Ancien mot de passe'}
            required={true}
          >
            <Input.Password
              name={'oldPassword'}
              placeholder={'p4sSw0rD'}
              allowClear={true}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <Form.Item
            name={'password'}
            label={'Nouveau mot de passe'}
            required={true}
          >
            <Input.Password
              name={'password'}
              placeholder={'p4sSw0rD'}
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
            {'Enregistrer'}
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
