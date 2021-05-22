import React from 'react';
import { IonCol, IonLoading, IonRow } from '@ionic/react';
import { Typography, Upload } from 'antd';
import { PlusCircleTwoTone } from '@ant-design/icons';
import { Formik } from 'formik';
import { Form, Input, SubmitButton } from 'formik-antd';
import * as Yup from 'yup';
import { t } from 'i18n';

import { Styles } from './UploadForm.styles';

import type { UploadType } from './UploadForm.container';

const UploadForm: React.FC<UploadType.FormProps> = ({
  isDisabled,
  onChange,
  onRemove,
  uploadFormSubmit,
}) => {
  const yupValidation = Yup.object({
    title: Yup.string().required(t`-Obligatoire`),
  });

  return (
    <IonRow style={Styles.container}>
      <Formik<UploadType.FormValues>
        initialValues={{ title: '', description: '' }}
        onSubmit={uploadFormSubmit}
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
                  {t`-Video`}
                </Typography.Title>
              </IonCol>
            </IonRow>
            <IonRow style={Styles.container}>
              <Upload.Dragger
                accept={'video/*'}
                onChange={onChange}
                onRemove={onRemove}
                beforeUpload={() => false}
                maxCount={1}
                name={t`-Ready to go`}
                style={Styles.dragger}
              >
                <PlusCircleTwoTone style={Styles.icon} />
                <Typography.Title level={5}>
                  {'Ajouter une vidéo'}
                </Typography.Title>
                <Typography.Text>{'Cliquez ou faites glissez'}</Typography.Text>
              </Upload.Dragger>
            </IonRow>
            <IonRow style={{ marginTop: 40 }}>
              <IonCol size={'12'}>
                <Form.Item name={'title'} label={t`-Title`} required={true}>
                  <Input name={'title'} placeholder={t`-Title`} />
                </Form.Item>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size={'12'}>
                <Form.Item name={'description'} label={t`-Description`}>
                  <Input name={'description'} placeholder={t`-Description`} />
                </Form.Item>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size={'12'}>
                <Form.Item name={'signIn'}>
                  <SubmitButton
                    type={'primary'}
                    block={true}
                    disabled={isDisabled}
                  >
                    {t`-Upload`}
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

export default UploadForm;
