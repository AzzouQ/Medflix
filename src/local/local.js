import { useSelector } from 'react-redux';
import { localSelectors } from '../redux/Local.slice';
import en from './eng.json';
import fr from './fr.json';

const data = {
  'fr-FR': fr,
  'en-US': en,
};

const useTranslate = (keyWord = 'NOT_DEFINE') => {
  const local = useSelector(localSelectors.getLocal);

  console.log(local);
  console.log(data[local]);
  return data[local].hasOwnProperty(keyWord)
    ? data[local][keyWord]
    : data[local]['NOT_DEFINE'];
};

export default useTranslate;