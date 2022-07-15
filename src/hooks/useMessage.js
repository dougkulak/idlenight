import {useRecoilState} from 'recoil';
import {messageState} from '../state/messageState';

export const useMessage = () => {
  const [messages, setMessages] = useRecoilState(messageState);

  const add = (
    message,
    type = 'info',
    time = new Date(),
    color = 'gray.200'
  ) => {
    setMessages((x) => {
      let y = [...x];
      y.push({message, type, time, color});
      if (y.length > 100) y.shift();
      return y;
    });
  };

  return {
    add,
    messages,
  };
};
