import React from 'react';
import { IonRow, IonCol, IonLoading } from '@ionic/react';
import { Typography } from 'antd';
import { Formik } from 'formik';
import { Form, Input, SubmitButton } from 'formik-antd';
import * as Yup from 'yup';
import { t } from 'i18n';

import CloseModalContainer from 'components/CloseModal';

import { Styles } from './EditModal.styles';
import type { EditModalType } from './EditModal.container';

const EditModal: React.FC<EditModalType.Props> = ({
  setModalOpen,
  formikSubmit,
  video,
}) => {
  const initialValues = {
    title: video.title,
    description: video.description,
  };

  const yupValidation = Yup.object({
    title: Yup.string().required(t`form.video.required`),
  });

  return (
    <IonRow style={Styles.container}>
      <CloseModalContainer {...{ setModalOpen }} />
      <Formik<EditModalType.FormValues>
        initialValues={initialValues}
        onSubmit={formikSubmit}
        validationSchema={yupValidation}
      >
        {(formik) => (
          <Form name={'sign-in'} size={'middle'} layout={'vertical'}>
            <IonLoading
              isOpen={formik.isSubmitting}
              message={t`loading.generic`}
            />
            <IonRow>
              <IonCol size={'12'}>
                <Typography.Title level={2} style={Styles.title}>
                  {t`form.edit.video`}
                </Typography.Title>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size={'12'}>
                <Form.Item
                  name={'title'}
                  label={t`form.video.label`}
                  required={true}
                >
                  <Input
                    name={'title'}
                    placeholder={t`form.video.placeholder`}
                  />
                </Form.Item>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size={'12'}>
                <Form.Item
                  name={'description'}
                  label={t`form.description.label`}
                >
                  <Input
                    name={'description'}
                    placeholder={t`form.description.placeholder`}
                  />
                </Form.Item>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size={'12'}>
                <Form.Item name={'signIn'}>
                  <SubmitButton type={'primary'} block={true}>
                    {t`header.button.edit`}
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

export default EditModal;
