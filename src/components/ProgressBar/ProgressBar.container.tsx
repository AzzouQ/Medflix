import React from 'react';
import { useSelector } from 'react-redux';

import ProgressBar from './ProgressBar';

import { uploadSelectors } from 'slices';

import type { TaskManager } from 'service/firebase';

export declare namespace ProgressBarType {
  type Props = {
    isPaused: boolean;
    progress: number;
    taskManager: TaskManager | undefined;
  };
}

const ProgressBarContainer: React.FC = () => {
  const { isPaused, progress, taskManager } = useSelector(
    uploadSelectors.getProgressBar
  );

  return (
    <ProgressBar
      {...{
        isPaused,
        progress,
        taskManager,
      }}
    />
  );
};

export default ProgressBarContainer;
