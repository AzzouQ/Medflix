import React from 'react';
import { IonCol, IonRow } from '@ionic/react';
import { Typography, Button } from 'antd';
import { Formik } from 'formik';
import { Form, Input, SubmitButton } from 'formik-antd';
import * as Yup from 'yup';
import { t } from 'i18n';

import LoadingModal from 'components/LoadingModal';

import { Styles } from './SignUpForm.styles';

import type { SignUpType } from './SignUpForm.container';

const SignUpForm: React.FC<SignUpType.FormProps> = ({
  signUpFormSubmit,
  goToSignIn,
}) => {
  const yupValidation = Yup.object({
    name: Yup.string().required('Veuillez entrer un nom'),
    email: Yup.string()
      .required('Veuillez entrer un email')
      .email("L'email est invalide"),
    password: Yup.string().required('Veuillez entrer un mot de passe'),
  });

  return (
    <IonRow style={Styles.container}>
      <Formik<SignUpType.FormValues>
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={signUpFormSubmit}
        validationSchema={yupValidation}
      >
        {(formik) => (
          <Form name={'sign-in'} size={'middle'} layout={'vertical'}>
            <LoadingModal isLoading={formik.isSubmitting} />
            <IonRow>
              <IonCol size={'12'}>
                <Typography.Title level={2} style={Styles.title}>
                  {t`form.signUp.title`}
                </Typography.Title>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size={'12'}>
                <Form.Item
                  name={'name'}
                  label={t`form.name.label`}
                  required={true}
                >
                  <Input name={'name'} placeholder={t`form.name.placeholder`} />
                </Form.Item>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size={'12'}>
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
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size={'12'}>
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
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size={'12'}>
                <Form.Item name={'signIn'}>
                  <SubmitButton type={'primary'} block={true}>
                    {t`form.signUp.save`}
                  </SubmitButton>
                </Form.Item>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size={'12'}>
                <Form.Item name={'signUp'}>
                  <Button type={'default'} block={true} onClick={goToSignIn}>
                    {t`form.signUp.switch`}
                  </Button>
                </Form.Item>
              </IonCol>
            </IonRow>
          </Form>
        )}
      </Formik>
    </IonRow>
  );
};

export default SignUpForm;
