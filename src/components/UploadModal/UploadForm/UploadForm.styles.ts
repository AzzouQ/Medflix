import type { StylesType } from 'types';

const Styles: StylesType = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  form: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
  },
  dragger: {
    minWidth: 150,
    width: '15vw',
    marginLeft: '1rem',
    marginRight: '1rem',
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  icon: {
    fontSize: 30,
  },
};

export { Styles };
