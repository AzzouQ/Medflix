import React from 'react';
import { useSelector } from 'react-redux';

import { uploadSelectors } from 'slices';

import ProgressBar from './ProgressBar';

export declare namespace ProgressBarType {
  type Props = {
    onPlay: () => void;
    onCancel: () => Promise<void>;
    onNext: {
      progress: number;
      isRunning: boolean;
    };
  };
}

const ProgressBarContainer: React.FC = () => {
  const onPlay = useSelector(uploadSelectors.getPlay)!;
  const onCancel = useSelector(uploadSelectors.getCancel)!;
  const onNext = useSelector(uploadSelectors.getNext)!;

  return (
    <ProgressBar
      {...{
        onPlay,
        onCancel,
        onNext,
      }}
    />
  );
};

export default ProgressBarContainer;
