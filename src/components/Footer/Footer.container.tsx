import React from 'react';
import { useSelector } from 'react-redux';

import { uploadSelectors } from 'slices';

import Footer from './Footer';

export declare namespace FooterType {
  type Props = {
    isRunning: boolean;
  };
}

const FooterContainer: React.FC = () => {
  const isRunning = useSelector(uploadSelectors.isRunning);

  return <Footer {...{ isRunning }} />;
};

export default FooterContainer;
