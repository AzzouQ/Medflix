import React from 'react';

import { videos, VideosType } from 'service/fakeData';

import Home from './Home';

export declare namespace HomeType {
  type Props = {
    videos: VideosType;
  };
}

const HomeContainer: React.FC = () => {
  return <Home {...{ videos }} />;
};

export default HomeContainer;
