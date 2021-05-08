import React, { useState } from 'react';
import { Button, Row, Col, Form, Input } from 'antd';

import LoadingModal from './LoadingModal';
import { useHistory } from 'react-router';
import { signIn } from '../service/firebase';

const SignInForm = () => {
  const { push } = useHistory();

  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const doSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn(mail, pass);
      push('/home')
    } catch (e) {
      console.log(e)
      // TODO Handle error
    } finally {
      setIsLoading(false)
    }
  };

  const toSignup = () => {
    push('/signUp');
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
              style={{ width: '100%', backgroundColor: 'pink' }}
              onClick={doSignIn}
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
