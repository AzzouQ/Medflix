import React, { useCallback } from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { Formik, FormikHelpers } from 'formik';
import { Form, Input, SubmitButton } from 'formik-antd';
import * as Yup from 'yup';
import { t } from '../i18n';

import LoadingModal from './LoadingModal';
import translateFirebaseError from '../service/translateFirebaseError';
import { signUp } from '../service/firebase/auth';

type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
};

type Props = {
  setModalOpen: (value: boolean) => void;
  setFormMode: (value: 'signIn' | 'signUp') => void;
};

const SignUpForm: React.FC<Props> = ({ setModalOpen, setFormMode }) => {
  const yupValidation = Yup.object({
    name: Yup.string().required('Veuillez entrer un nom'),
    email: Yup.string()
      .required('Veuillez entrer un email')
      .email("L'email est invalide"),
    // password: Yup.string().required('Veuillez entrer un mot de passe'),
  });

  const formikSubmit = async (
    { name, email, password }: SignUpFormValues,
    { setSubmitting, setFieldError }: FormikHelpers<SignUpFormValues>
  ) => {
    setSubmitting(true);
    try {
      await signUp(name, email, password);
      setModalOpen(false);
    } catch (error) {
      const { field, message } = translateFirebaseError(error);
      setFieldError(field, message);
    } finally {
      setSubmitting(false);
    }
  };

  const goToSignIn = useCallback(() => {
    setFormMode('signIn');
  }, [setFormMode]);

  return (
    <Row justify={'center'} align={'middle'} style={{ flex: 1 }}>
      <Formik<SignUpFormValues>
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={formikSubmit}
        validationSchema={yupValidation}
      >
        {(formik) => (
          <Form name={'sign-in'} size={'middle'} layout={'vertical'}>
            <LoadingModal isLoading={formik.isSubmitting} />
            <Row gutter={20}>
              <Col span={24}>
                <Typography.Title
                  level={2}
                >{t`form.signUp.title`}</Typography.Title>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={24}>
                <Form.Item
                  name={'name'}
                  label={t`form.name.label`}
                  required={true}
                >
                  <Input name={'name'} placeholder={t`form.name.placeholder`} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={24}>
                <Form.Item
                  name={'email'}
                  label={t`form.email.label`}
                  required={true}
                >
                  <Input
                    name={'email'}
                    placeholder={t`form.email.placeholder`}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={24}>
                <Form.Item
                  name={'password'}
                  label={t`form.password.label`}
                  required={true}
                >
                  <Input.Password
                    name={'password'}
                    placeholder={t`form.password.placeholder`}
                    allowClear={true}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={24}>
                <Form.Item name={'signIn'}>
                  <SubmitButton type={'primary'} style={{ width: '100%' }}>
                    {t`form.signUp.save`}
                  </SubmitButton>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={24}>
                <Form.Item name={'signUp'}>
                  <Button
                    type={'default'}
                    style={{ width: '100%' }}
                    onClick={goToSignIn}
                  >
                    {t`form.signUp.switch`}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Row>
  );
};

export default SignUpForm;
