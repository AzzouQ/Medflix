import { IonCol, IonLoading, IonRow } from '@ionic/react';
import React from 'react';
import { Button, Typography } from 'antd';
import { Formik } from 'formik';
import { Form, Input, SubmitButton } from 'formik-antd';
import * as Yup from 'yup';
import { t } from 'i18n';

import { Styles } from './VideoForm.styles';

import type { VideoType } from './VideoForm.container';

const VideoForm: React.FC<VideoType.FormProps> = ({
  videoFormSubmit,
  onReset,
}) => {
  const yupValidation = Yup.object({
    title: Yup.string().required('Nom obligatoire'),
  });

  return (
    <IonRow style={Styles.container}>
      <Formik<VideoType.FormValues>
        initialValues={{ title: '', description: '' }}
        onSubmit={videoFormSubmit}
        validationSchema={yupValidation}
      >
        {(formik) => (
          <Form name={'sign-in'} size={'middle'} layout={'vertical'}>
            <IonLoading
              isOpen={formik.isSubmitting}
              message={'Please wait...'}
            />
            <IonRow>
              <IonCol size={'12'}>
                <Typography.Title level={2} style={Styles.title}>
                  {t`Publier votre vidéo !`}
                </Typography.Title>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size={'12'}>
                <Form.Item
                  name={'title'}
                  label={t`Titre de la video`}
                  required={true}
                >
                  <Input name={'title'} placeholder={t`Titre de la video`} />
                </Form.Item>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size={'12'}>
                <Form.Item
                  name={'descritpion'}
                  label={t`Descritpion de la video`}
                >
                  <Input
                    name={'descritpion'}
                    placeholder={t`Descritpion de la video`}
                  />
                </Form.Item>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size={'6'}>
                <Form.Item name={'confirm'}>
                  <SubmitButton type={'primary'} block={true}>
                    {t`Publier`}
                  </SubmitButton>
                </Form.Item>
              </IonCol>
              <IonCol size={'6'}>
                <Form.Item name={'cancel'}>
                  <Button
                    type={'default'}
                    block={true}
                    danger={true}
                    onClick={onReset}
                  >
                    {t`Annuler`}
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

export default VideoForm;
