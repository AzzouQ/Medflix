import ImgCrop from 'antd-img-crop';

import { PictureOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { t } from '../locales';
import React from 'react';

type Props = { isLoading: boolean };

const { Dragger } = Upload;
const props = {
  name: 'file',
  multiple: false,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info: UploadChangeParam) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const ThumbnailUpload = ({ isLoading }: Props) => {
  return (
    <div>
      <ImgCrop>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <PictureOutlined />
          </p>
          <p className="ant-upload-text">
            {t('ADD_PICTURE_MESSAGE')}
          </p>
          <p className="ant-upload-hint">
            {t('ADD_PICTURE_WARNING')}
          </p>
        </Dragger>
      </ImgCrop>
    </div>
  );
};

export default ThumbnailUpload;
