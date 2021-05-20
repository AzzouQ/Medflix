import React from 'react';
import { VideoCameraAddOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';

import { videoUpload } from '../service/firebase/upload';
import { useDispatch } from 'react-redux';
import { t } from '../i18n';

type Props = { isLoading: boolean };

const { Dragger } = Upload;

const FilePicker = ({ isLoading }: Props) => {
  const dispatch = useDispatch();

  const beforeUplaod = (file: RcFile) => {
    const isVideo = file.type.indexOf('video/') === 0;
    if (!isVideo) {
      message.error('You can only upload video file!');
    }

    // You can remove this validation if you want
    const isLt1G = file.size / 1024 / 1024 / 1024 < 1;
    if (!isLt1G) {
      message.error('Video must smaller than 1GB!');
    }
    return isVideo && isLt1G;
  };

  const onChange = (info: UploadChangeParam) => {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <div>
      <Dragger
        accept="video/*"
        onChange={onChange}
        beforeUpload={beforeUplaod}
        customRequest={(props) => videoUpload(props, dispatch)}
      >
        <p className="ant-upload-drag-icon">
          <VideoCameraAddOutlined />
        </p>
        <p className="ant-upload-text">{t`form.create.addVideoMessage`}</p>
        <p className="ant-upload-hint">{t`form.create.addVideoWarning`}</p>
      </Dragger>
    </div>
  );
};

export default FilePicker;
