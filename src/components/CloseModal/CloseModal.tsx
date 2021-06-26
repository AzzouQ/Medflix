import React from 'react';
import { Button } from 'antd';

import { Styles } from './CloseModal.styles';
import type { CloseModalType } from './CloseModal.container';

import { CloseOutlined } from '@ant-design/icons';

const CloseModal: React.FC<CloseModalType.Props> = ({ onCloseModal }) => {
  return (
    <Button
      type={'primary'}
      icon={<CloseOutlined />}
      onClick={onCloseModal}
      style={Styles.closeButton}
    />
  );
};

export default CloseModal;
