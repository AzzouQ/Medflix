import React from 'react';
import { IonCol, IonLoading, IonRow } from '@ionic/react';
import { Typography } from 'antd';
import { Formik } from 'formik';
import { Form, Input, SubmitButton } from 'formik-antd';
import * as Yup from 'yup';
import { t } from 'i18n';

import CloseModalContainer from 'components/CloseModal';

import { Styles } from './EditProfileForm.styles';
import type { EditProfileFormType } from './EditProfileForm.container';

const EditProfileForm: React.FC<EditProfileFormType.FormProps> = ({
  formikSubmit,
  user,
  setModalOpen,
}) => {
  const initialValues = {
    name: user?.name ?? undefined,
    email: user?.email ?? undefined,
    currentPassword: undefined,
    newPassword: undefined,
  };

  const yupValidation = Yup.object({
    name: Yup.string().required(t`form.name.required`),
    email: Yup.string()
      .required(t`form.email.required`)
      .email(t`form.email.error`),
    currentPassword: Yup.string().when(['email', 'newPassword'], {
      is: (email: string, newPassword: string) => {
        return user?.email !== email || newPassword;
      },
      then: (schema) => {
        return schema.required(t`Votre mot de passe est requis.`);
      },
      otherwise: (schema) => {
        return schema.notRequired();
      },
    }),
  });

  return (
    <IonRow style={Styles.container}>
      <CloseModalContainer {...{ setModalOpen }} />
      <Formik<EditProfileFormType.FormValues>
        initialValues={initialValues}
        onSubmit={formikSubmit}
        validationSchema={yupValidation}
      >
        {(formik) => (
          <Form name={'edit-profile'} size={'middle'} layout={'vertical'}>
            <IonLoading
              isOpen={formik.isSubmitting}
              message={t`loading.generic`}
            />
            <IonRow>
              <IonCol size={'12'}>
                <Typography.Title level={2} style={Styles.title}>
                  {t`form.edit.title`}
                </Typography.Title>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size={'12'}>
                <Form.Item
                  name={'name'}
                  label={t('form.name.label')}
                  required={true}
                >
                  <Input
                    name={'name'}
                    placeholder={t('form.name.placeholder')}
                  />
                </Form.Item>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size={'12'}>
                <Form.Item
                  name={'email'}
                  label={t('form.email.label')}
                  required={true}
                >
                  <Input
                    name={'email'}
                    placeholder={t('form.email.placeholder')}
                  />
                </Form.Item>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size={'12'}>
                <Form.Item
                  name={'newPassword'}
                  label={t`form.newPassword.label`}
                >
                  <Input.Password
                    name={'newPassword'}
                    placeholder={t`form.newPassword.placeholder`}
                    allowClear={true}
                  />
                </Form.Item>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size={'12'}>
                <Form.Item
                  name={'currentPassword'}
                  label={t`form.currentPassword.label`}
                >
                  <Input.Password
                    name={'currentPassword'}
                    placeholder={t`form.currentPassword.placeholder`}
                    allowClear={true}
                  />
                </Form.Item>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size={'12'}>
                <Form.Item name={'editProfile'}>
                  <SubmitButton type={'primary'} style={{ width: '100%' }}>
                    {t('form.edit.save')}
                  </SubmitButton>
                </Form.Item>
              </IonCol>
            </IonRow>
          </Form>
        )}
      </Formik>
    </IonRow>
  );
};

export default EditProfileForm;
