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
  onChangeImage,
  onRemoveImage,
  onRemove,
  uploadFormSubmit,
}) => {
  const initialValues = {
    title: '',
    description: '',
  };

  const yupValidation = Yup.object({
    title: Yup.string().required(t`form.video.required`),
  });

  return (
    <IonRow style={Styles.container}>
      <Formik<UploadType.FormValues>
        initialValues={initialValues}
        onSubmit={uploadFormSubmit}
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
                  {t`form.upload.title`}
                </Typography.Title>
              </IonCol>
            </IonRow>
            <IonRow>
              <Upload.Dragger
                accept={'video/*'}
                onChange={onChange}
                onRemove={onRemove}
                beforeUpload={() => false}
                itemRender={() => <></>}
                maxCount={1}
                style={Styles.dragger}
              >
                <PlusCircleTwoTone style={Styles.icon} />
                <Typography.Title level={5}>
                  {t`form.upload.dragger.video.title`}
                </Typography.Title>
              </Upload.Dragger>
              <Upload.Dragger
                accept={'image/*'}
                onChange={onChangeImage}
                onRemove={onRemoveImage}
                beforeUpload={() => false}
                itemRender={() => <></>}
                maxCount={1}
                style={Styles.dragger}
              >
                <PlusCircleTwoTone style={Styles.icon} />
                <Typography.Title level={5}>
                  {t`form.upload.dragger.image.title`}
                </Typography.Title>
              </Upload.Dragger>
            </IonRow>
            <IonRow style={{ marginTop: 40 }}>
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
                  <SubmitButton
                    type={'primary'}
                    block={true}
                    disabled={isDisabled}
                  >
                    {t`form.upload.save`}
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
