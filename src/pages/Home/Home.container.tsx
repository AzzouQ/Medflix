import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { database } from 'service/firebase';
import Home from './Home';

import type { VideoType } from 'types';

export declare namespace HomeType {
  type Props = {
    videos: VideoType[] | undefined;
  };
}

const HomeContainer: React.FC = () => {
  const { pathname } = useLocation();
  const isFocus = pathname === '/home';
  const [videos, setVideos] = useState<VideoType[]>();

  useEffect(() => {
    const getAllVideos = async () => {
      const videosSnap = await database.ref(`/videos`).get();
      if (videosSnap.val()) {
        setVideos(Object.values(videosSnap.val()));
      }
    };
    if (isFocus) {
      getAllVideos();
    }
  }, [isFocus]);

  return <Home {...{ videos }} />;
};

export default HomeContainer;
