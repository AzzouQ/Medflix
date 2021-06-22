import React, { MouseEventHandler, useState } from 'react';

import Home from './Home';

import type { UseStateType, VideoType } from 'types';
import { useAlgoliaSearch } from 'service/algolia/algolia';

export declare namespace HomeType {
  type Props = {
    videos: VideoType[];
    searchText: string;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
    onMobileSearch: MouseEventHandler<HTMLElement>;
    modalOpenState: [boolean, UseStateType<boolean>];
  };
}

const HomeContainer: React.FC = () => {
  const [videos, searchText, setSearchText] = useAlgoliaSearch();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const onMobileSearch = () => {
    setModalOpen(true);
  };

  return (
    <Home
      {...{
        videos,
        searchText,
        setSearchText,
        onMobileSearch,
        modalOpenState: [isModalOpen, setModalOpen],
      }}
    />
  );
};

export default HomeContainer;
