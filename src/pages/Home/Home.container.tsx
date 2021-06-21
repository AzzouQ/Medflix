import React from 'react';

import Home from './Home';

import type { VideoType } from 'types';
import { useAlgoliaSearch } from 'service/algolia/algolia';

export declare namespace HomeType {
  type Props = {
    videos: VideoType[];
    searchText: string;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
  };
}

const HomeContainer: React.FC = () => {
  const [videos, searchText, setSearchText] = useAlgoliaSearch();

  return <Home {...{ videos, searchText, setSearchText }} />;
};

export default HomeContainer;
