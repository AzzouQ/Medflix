import React from 'react';
import { IonCol, IonLoading, IonRow } from '@ionic/react';
import { Typography, Button } from 'antd';
import { Formik } from 'formik';
import { Form, Input, SubmitButton } from 'formik-antd';
import * as Yup from 'yup';
import { t } from 'i18n';
import CloseModalContainer from 'components/CloseModal';

import { Styles } from './SignInForm.styles';

import type { SignInType } from './SignInForm.container';

const SignInForm: React.FC<SignInType.FormProps> = ({
  formikSubmit,
  goToSignUp,
  onGoogle,
  setModalOpen,
}) => {
  const initialValues = {
    email: '',
    password: '',
  };

  const yupValidation = Yup.object({
    email: Yup.string()
      .required(t`form.email.required`)
      .email(t`form.email.error`),
    password: Yup.string().required(t`form.password.required`),
  });

  return (
    <IonRow style={Styles.container}>
      <CloseModalContainer {...{ setModalOpen }} />
      <Formik<SignInType.FormValues>
        initialValues={initialValues}
        onSubmit={formikSubmit}
        validationSchema={yupValidation}
      >
        {(formik) => (
          <Form name={'sign-in'} size={'middle'} layout={'vertical'}>
            <IonLoading isOpen={formik.isSubmitting} message={t`loading`} />
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
                  label={t`form.currentPassword.label`}
                  required={true}
                >
                  <Input.Password
                    name={'password'}
                    placeholder={t`form.currentPassword.placeholder`}
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
            <IonRow>
              <IonCol size={'12'}>
                <Form.Item name={'google'}>
                  <Button
                    type={'primary'}
                    style={{ backgroundColor: 'white' }}
                    block={true}
                    onClick={onGoogle}
                  >
                    {t`Google`}
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
