import React from 'react';
import { IonButtons, IonToolbar } from '@ionic/react';
import { Progress, Button } from 'antd';
import {
  PauseOutlined,
  CloseOutlined,
  CaretRightOutlined,
} from '@ant-design/icons';

import { Styles } from './ProgressBar.styles';

import type { ProgressBarType } from './ProgressBar.container';

const ProgressBar: React.FC<ProgressBarType.Props> = ({
  onPlay,
  onCancel,
  onNext: { isRunning, progress },
}) => {
  return (
    <IonToolbar style={Styles.container}>
      <IonButtons slot={'start'} style={Styles.buttons}>
        <Button
          type={'primary'}
          size={'middle'}
          shape={'circle'}
          icon={isRunning ? <PauseOutlined /> : <CaretRightOutlined />}
          onClick={onPlay}
          style={Styles.buttonSpace}
        />
        <Button
          type={'primary'}
          size={'middle'}
          shape={'circle'}
          icon={<CloseOutlined />}
          onClick={onCancel}
        />
      </IonButtons>
      <Progress
        strokeColor={{
          '0%': '#177ddc',
          '100%': '#3dc2ff',
        }}
        percent={progress}
        showInfo={false}
        style={Styles.progressBar}
      />
    </IonToolbar>
  );
};

export default ProgressBar;
