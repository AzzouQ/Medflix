import algoliasearch from 'algoliasearch';
import { createNullCache } from '@algolia/cache-common';
import { createInMemoryCache } from '@algolia/cache-in-memory';

import { useEffect, useState } from 'react';
import { VideoType } from 'types';

const client = algoliasearch('TGU1CR9BF2', '1de5ba502b35dcea00c796384f1c9c93', {
  // Caches responses from Algolia
  responsesCache: createNullCache(), // or createNullCache()

  // Caches Promises with the same request payload
  requestsCache: createInMemoryCache({ serializable: false }), // or createNullCache()
});
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

export const useSubsSearch = () => {
  const [subs, setSubs] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<VideoType[]>([]);

  useEffect(() => {
    if (subs.length > 0) {
      const addOwnerTag = subs.map((val) => 'owner:' + val);
      const filters = addOwnerTag.join(' OR ');

      index
        .search('', {
          filters,
        })
        .then(({ hits }) => {
          setSearchResult(hits as VideoType[]);
        });
    }
  }, [subs]);

  return [searchResult, setSubs] as const;
};
