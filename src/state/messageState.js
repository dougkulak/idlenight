import {atom} from 'recoil';

export const messageState = atom({
  key: 'messageState',
  default: [
    {
      type: 'info',
      message: 'Welcome to Idle Night - Demons & Dragons!',
      time: new Date(),
      color: 'gray.500',
    },
  ],
});
