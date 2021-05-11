import React from 'react';
import { useHistory, useLocation } from 'react-router';
import { Formik, FormikHelpers } from 'formik';
import { Form, Input, SubmitButton } from 'formik-antd';
import { Button, Row, Col, notification } from 'antd';
import * as Yup from 'yup';
import LoadingModal from './LoadingModal';
import { signIn } from '../service/firebase';

type SignInFormValues = {
  email: string;
  password: string;
};

const yupValidation = Yup.object({
  password: Yup.string().required('Veuillez entrer un password'),
  email: Yup.string()
    .required('Veuillez entrer un email')
    .email("L'email est invalide"),
});

const SignInForm: React.FC = () => {
  const { push } = useHistory();

  const formikSubmit = async (
    { email, password }: SignInFormValues,
    { setSubmitting, setFieldValue }: FormikHelpers<SignInFormValues>
  ) => {
    setFieldValue('password', '', false);
    setSubmitting(true);
    try {
      await signIn(email, password);
      notification.success({ message: `Welcome back ${email}` });
      setSubmitting(false);
    } catch (e) {
      notification.error({ message: 'error' });
      console.log(e);
      setSubmitting(false);
    }
  };

  const toSignup = () => {
    push('/signUp');
  };

  const toReset = () => {
    push('/reset');
  };

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
                <Input
                  name={'email'}
                  placeholder={'bastien.silhol@epitech.eu'}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                name={'password'}
                label={'Mot de passe'}
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
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item name={'signIn'}>
                <SubmitButton type={'primary'} style={{ width: '100%' }}>
                  {'Se connecter'}
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
                  {'Créer un compte'}
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
                  {'Mot de passe oublié'}
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
