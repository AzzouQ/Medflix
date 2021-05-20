import React from 'react';
import { IonCol, IonRow } from '@ionic/react';
import { Typography, Button } from 'antd';
import { Formik } from 'formik';
import { Form, Input, SubmitButton } from 'formik-antd';
import * as Yup from 'yup';
import { t } from 'i18n';

import LoadingModal from 'components/LoadingModal';

import { Styles } from './SignInForm.styles';

import type { SignInType } from './SignInForm.container';

const SignInForm: React.FC<SignInType.FormProps> = ({
  signInFormSubmit,
  goToSignUp,
}) => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .required('Veuillez entrer un email')
      .email("L'email est invalide"),
    password: Yup.string().required('Veuillez entrer un password'),
  });

  return (
    <IonRow style={Styles.container}>
      <Formik<SignInType.FormValues>
        initialValues={{ email: '', password: '' }}
        onSubmit={signInFormSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form name={'sign-in'} size={'middle'} layout={'vertical'}>
            <LoadingModal isLoading={formik.isSubmitting} />
            <IonRow>
              <IonCol size={'12'}>
                <Typography.Title level={2} style={Styles.title}>
                  {t`form.signIn.title`}
                </Typography.Title>
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
                    {t`form.signIn.save`}
                  </SubmitButton>
                </Form.Item>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size={'12'}>
                <Form.Item name={'signUp'}>
                  <Button type={'default'} block={true} onClick={goToSignUp}>
                    {t`form.signIn.switch`}
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

export default SignInForm;
