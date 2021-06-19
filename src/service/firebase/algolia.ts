import algoliasearch from 'algoliasearch';

const client = algoliasearch('TGU1CR9BF2', '1de5ba502b35dcea00c796384f1c9c93');
const index = client.initIndex('medflix');

export const searchVideo = (str: string) => {
  if (str.length === 0) str = '*'; // Weird fix
  return index.search(str);
};
