import {atom} from 'recoil';

export const regionState = atom({
  key: 'regionState',
  default: {
    cell: 0,
  },
});
