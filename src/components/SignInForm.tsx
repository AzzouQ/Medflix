import React from 'react';
import { useHistory } from 'react-router';
import { Formik, FormikHelpers } from 'formik';
import { Form, Input, SubmitButton } from 'formik-antd';
import { Button, Row, Col } from 'antd';
import * as Yup from 'yup';

import LoadingModal from './LoadingModal';
import { signIn } from '../service/firebase';
import useTranslate from '../local/local';

type SignInFormValues = {
  email: string;
  password: string;
};

const SignInForm: React.FC = () => {
  const { push } = useHistory();

  const yupValidation = Yup.object({
    password: Yup.string()
      .required(useTranslate('PASSWORD_ERROR'))
      .email(useTranslate('PASSWORD_ERROR_2')),
    email: Yup.string()
      .required(useTranslate('EMAIL_ERROR'))
      .email(useTranslate('EMAIL_ERROR_2')),
  });

  const formikSubmit = async (
    { email, password }: SignInFormValues,
    { setSubmitting, setFieldValue }: FormikHelpers<SignInFormValues>
  ) => {
    setFieldValue('password', '', false);
    try {
      await signIn(email, password);
      push('/home');
    } catch (e) {
      console.log(e);
      // TODO Handle error
    } finally {
      setSubmitting(false);
    }
  };

  const toSignup = () => {
    push('/signUp');
  };

  const toReset = () => {
    push('/reset');
  };

  const email = useTranslate('EMAIL');
  const emailPlaceholder = useTranslate('EMAIL_PLACEHOLDER');
  const password = useTranslate('PASSWORD');
  const passwordPlaceholder = useTranslate('PASSWORD_PLACEHOLDER');
  const connect = useTranslate('CONNECT');
  const createAccount = useTranslate('CREATE_ACCOUNT');
  const forgottenPassword = useTranslate('FORGOTTEN_PASSWORD');
  return (
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
              <Form.Item name={'email'} label={'E-mail'} required={true}>
                <Input name={email} placeholder={emailPlaceholder} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item name={'password'} label={password} required={true}>
                <Input.Password
                  name={password}
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
            <Col span={12}>
              <Form.Item name={'signUp'}>
                <Button
                  type={'default'}
                  style={{ width: '100%' }}
                  onClick={toSignup}
                >
                  {createAccount}
                </Button>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={'resetPassword'}>
                <Button
                  type={'default'}
                  style={{ width: '100%' }}
                  onClick={toReset}
                >
                  {forgottenPassword}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
