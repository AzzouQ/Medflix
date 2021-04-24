import React, { useState } from 'react';
import { Button, Row, Col, Form, Input } from 'antd';
import * as Yup from 'yup';
import LoadingModal from './LoadingModal';
import { useHistory } from 'react-router';
import { register } from '../service/firebase';

const SignInForm = () => {
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [siret, setSiret] = useState('');

  const { push } = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const toLogin = () => {
    push('/login');
  };

  const doRegister = async () => {
    setIsLoading(true)
    try {
    await register(mail, pass, address, phone, siret)
    push('/home');
    } catch (error) {
        // TODO Handle error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form name={'sign-up'} size={'middle'} layout={'vertical'}>
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
              name={'password'}
              placeholder={'Mot de passe'}
              allowClear={true}
              value={pass}
              onChange={(e) => setPass(e.target.value!)}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <Form.Item name={'address'} label={'Adresse'} required={true}>
            <Input
              name={'address'}
              placeholder={'Adresse'}
              value={address}
              onChange={(e) => setAddress(e.target.value!)}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item name={'phone'} label={'Téléphone'} required={true}>
            <Input
              name={'phone'}
              placeholder={'Téléphone'}
              value={phone}
              onChange={(e) => setPhone(e.target.value!)}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={'siret'} label={'Siret'} required={false}>
            <Input
              name={'siret'}
              placeholder={'Siret'}
              value={siret}
              onChange={(e) => setSiret(e.target.value!)}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item name={'signUp'}>
            <Button type={'primary'} style={{ width: '100%' }} onClick={doRegister}>
              {'Créer mon compte'}
            </Button>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={'signIn'}>
            <Button
              type={'default'}
              style={{ width: '100%' }}
              onClick={toLogin}
            >
              {'Déjà inscrit ?'}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default SignInForm;
