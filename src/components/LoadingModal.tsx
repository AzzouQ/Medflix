import { Player } from '@lottiefiles/react-lottie-player';
import { Modal } from 'antd';
import React from 'react';
import lottieAnim from '../assets/AuthLottie.json';

type Props = { isLoading: boolean };

const LoadingModal = ({ isLoading }: Props) => {
  return (
    <Modal
      visible={isLoading}
      centered={true}
      closable={false}
      footer={null}
      width={200}
      transitionName={''}
      maskTransitionName={''}
    >
      <Player src={lottieAnim} autoplay={true} loop={true} />
    </Modal>
  );
};

export default LoadingModal;
