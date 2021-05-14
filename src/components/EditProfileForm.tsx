import { Col, Row } from 'antd';
import { Formik, FormikHelpers } from 'formik';
import { Form, Input, SubmitButton } from 'formik-antd';
import React from 'react';
import { useHistory } from 'react-router';
import * as Yup from 'yup';
import { t } from '../locales';
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
          <Form.Item name={'oldPassword'} label={oldPass} required={true}>
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
          <Form.Item name={'password'} label={newPass} required={true}>
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
