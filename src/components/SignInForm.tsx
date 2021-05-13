import React, { useCallback } from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { Formik, FormikHelpers } from 'formik';
import { Form, Input, SubmitButton } from 'formik-antd';
import * as Yup from 'yup';

import { signIn } from '../service/firebase/auth';
import translateFirebaseError from '../service/translateFirebaseError';
import LoadingModal from './LoadingModal';
import useTranslate from '../local/local';

type SignInFormValues = {
  email: string;
  password: string;
};

type Props = {
  setModalOpen: (value: boolean) => void;
  setFormMode: (value: 'signIn' | 'signUp') => void;
};

const SignInForm: React.FC<Props> = ({ setModalOpen, setFormMode }) => {
  const yupValidation = Yup.object({
    email: Yup.string()
      .required('Veuillez entrer un email')
      .email("L'email est invalide"),
    password: Yup.string().required('Veuillez entrer un password'),
  });

  const formikSubmit = async (
    { email, password }: SignInFormValues,
    { setSubmitting, setFieldError }: FormikHelpers<SignInFormValues>
  ) => {
    setSubmitting(true);
    try {
      await signIn(email, password);
      setModalOpen(false);
    } catch (error) {
      const { field, message } = translateFirebaseError(error);
      setFieldError(field, message);
    } finally {
      setSubmitting(false);
    }
  };

  const goToSignUp = useCallback(() => {
    setFormMode('signUp');
  }, [setFormMode]);

  const email = useTranslate('EMAIL');
  const emailPlaceholder = useTranslate('EMAIL_PLACEHOLDER');
  const password = useTranslate('PASSWORD');
  const passwordPlaceholder = useTranslate('PASSWORD_PLACEHOLDER');
  const connect = useTranslate('CONNECT');
  const createAccount = useTranslate('CREATE_ACCOUNT');
  return (
    <Row justify={'center'} align={'middle'} style={{ flex: 1 }}>
      <Formik<SignInFormValues>
        initialValues={{ email: '', password: '' }}
        onSubmit={formikSubmit}
        validationSchema={yupValidation}
      >
        {(formik) => (
          <Form name={'sign-in'} size={'middle'} layout={'vertical'}>
            <LoadingModal isLoading={formik.isSubmitting} />
            <Row gutter={20}>
              <Col span={24}>
                <Typography.Title level={2}>
                  {'Connectez-vous !'}
                </Typography.Title>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={24}>
                <Form.Item name={'email'} label={email} required={true}>
                  <Input
                    name={'email'}
                    placeholder={emailPlaceholder}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={24}>
                <Form.Item
                  name={'password'}
                  label={password}
                  required={true}
                >
                  <Input.Password
                    name={'password'}
                    placeholder={passwordPlaceholder}
                    allowClear={true}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={24}>
                <Form.Item name={'signIn'}>
                  <SubmitButton type={'primary'} style={{ width: '100%' }}>
                    {connect}
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
                    onClick={goToSignUp}
                  >
                    {createAccount}
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

export default SignInForm;
