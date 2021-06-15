import React from 'react';

import Loading from './Loading';

export declare namespace LoadingType {
  type Props = {
    text?: string;
  };
}

const LoadingContainer: React.FC<LoadingType.Props> = (props) => {
  return <Loading {...props} />;
};

export default LoadingContainer;
