import React, { useState } from 'react';
import { Button, Row, Col, Form, Input } from 'antd';
import * as Yup from 'yup';

import LoadingModal from './LoadingModal';
import { useHistory } from 'react-router';
import { login } from '../service/firebase';

const SignInForm = () => {
  const { push } = useHistory();

  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const yupValidation = Yup.object({
    password: Yup.string().required('Veuillez entrer un mot de passe'),
    email: Yup.string()
      .required('Veuillez entrer un email')
      .email("L'email est invalide"),
  });

  const doLogin = async () => {
    try {
      await login(mail, pass);
      push('/')
    } catch (e) {
      // TODO Handle error
    } 
  };

  const toSignup = () => {
    push('/register');
  };

  const toReset = () => {
    push('/reset');
  };

  return (
    <Form name={'sign-in'} size={'middle'} layout={'vertical'}>
      <LoadingModal isLoading={isLoading} />
      <Row gutter={20}>
        <Col span={24}>
          <Form.Item name={'email'} label={'E-mail'} required={true}>
            <Input
              name={'email'}
              placeholder={'E-mail'}
              value={mail}
              onChange={(e) => setMail(e.target.value!)}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <Form.Item name={'password'} label={'Mot de passe'} required={true}>
            <Input.Password
              value={pass}
              onChange={(e) => setPass(e.target.value!)}
              name={'password'}
              placeholder={'Mot de passe'}
              allowClear={true}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <Form.Item name={'signIn'}>
            <Button
              type={'primary'}
              style={{ width: '100%' }}
              onClick={doLogin}
            >
              {'Se connecter'}
            </Button>
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
  );
};

export default SignInForm;
