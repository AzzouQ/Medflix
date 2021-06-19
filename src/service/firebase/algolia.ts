import algoliasearch from 'algoliasearch';

import { useEffect, useState } from 'react';
import { VideoType } from 'types';

const client = algoliasearch('TGU1CR9BF2', '1de5ba502b35dcea00c796384f1c9c93');
const index = client.initIndex('medflix');

export const useAlgoliaSearch = () => {
  const [search, setSearch] = useState<string>('');
  const [searchResult, setSearchResult] = useState<VideoType[]>([]);

  useEffect(() => {
    index.search(search).then(({ hits }) => {
      setSearchResult(hits as VideoType[]);
    });
  }, [search]);

  return [searchResult, search, setSearch] as const;
};
