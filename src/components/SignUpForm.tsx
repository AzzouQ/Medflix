import React from 'react';
import { useHistory } from 'react-router';
import { Formik, FormikHelpers } from 'formik';
import { Form, Input, SubmitButton } from 'formik-antd';
import { Button, Row, Col } from 'antd';
import * as Yup from 'yup';

import LoadingModal from './LoadingModal';
import { signUp } from '../service/firebase';
import useTranslate from '../local/local';

type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
};

const SignUpForm: React.FC = () => {
  const { push } = useHistory();

  const yupValidation = Yup.object({
    password: Yup.string().required('Veuillez entrer un password'),
    email: Yup.string()
      .required('Veuillez entrer un email')
      .email("L'email est invalide"),
    name: Yup.string().required('Veuillez entrer un name'),
  });

  const formikSubmit = async (
    { name, email, password }: SignUpFormValues,
    { setSubmitting, setFieldValue }: FormikHelpers<SignUpFormValues>
  ) => {
    setFieldValue('password', '', false);
    try {
      await signUp(name, email, password);
      push('/home');
    } catch (error) {
      console.log(error);
      // TODO Handle error
    } finally {
      setSubmitting(false);
    }
  };

  const toSignIn = () => {
    push('/signIn');
  };

  const name = useTranslate("NAME")
  const namePlaceholder = useTranslate("NAME_PLACEHOLDER")
  const mail = useTranslate('EMAIL');
  const mailPlaceholder = useTranslate('EMAIL_PLACEHOLDER');
  const password = useTranslate('PASSWORD');
  const passwordPlaceholder = useTranslate('PASSWORD_PLACEHOLDER');
  const createAccount = useTranslate("CREATE_ACCOUNT")
  const alreadyregistered = useTranslate("ALREADY_REGISTERED")
  return (
    <Formik<SignUpFormValues>
      initialValues={{ name: '', email: '', password: '' }}
      onSubmit={formikSubmit}
      validationSchema={yupValidation}
    >
      {(formik) => (
        <Form name={'sign-up'} size={'middle'} layout={'vertical'}>
          <LoadingModal isLoading={formik.isSubmitting} />
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item name={'name'} label={name} required={true}>
                <Input name={'name'} placeholder={namePlaceholder} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item name={'email'} label={mail} required={true}>
                <Input
                  name={'email'}
                  placeholder={mailPlaceholder}
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
            <Col span={12}>
              <Form.Item name={'signUp'}>
                <SubmitButton type={'primary'} style={{ width: '100%' }}>
                  {createAccount}
                </SubmitButton>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={'signIn'}>
                <Button
                  type={'default'}
                  style={{ width: '100%' }}
                  onClick={toSignIn}
                >
                  {alreadyregistered}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
