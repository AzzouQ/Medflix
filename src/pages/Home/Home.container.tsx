import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Home from './Home';

import type { VideoType } from 'types';
import { searchVideo } from 'service/firebase/algolia';

export declare namespace HomeType {
  type Props = {
    videos: VideoType[] | undefined;
    searchText: string;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
  };
}

const HomeContainer: React.FC = () => {
  const { pathname } = useLocation();
  const isFocus = pathname === '/home';
  const [videos, setVideos] = useState<VideoType[]>();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const getAllVideos = async () => {
      searchVideo(searchText).then(({ hits }) => {
        console.log(hits);
        setVideos(hits as VideoType[]);
      });
    };

    if (isFocus) {
      getAllVideos();
    }
  }, [isFocus, searchText]);

  return <Home {...{ videos, searchText, setSearchText }} />;
};

export default HomeContainer;
