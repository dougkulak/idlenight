import {useRecoilState} from 'recoil';
import {playerState} from '../state/playerState';

export const usePlayer = () => {
  const [player, setPlayer] = useRecoilState(playerState);

  const spendAttr = (attr) => {
    if (player.avail <= 0) return;
    setPlayer((x) => {
      let y = {...x};
      y[attr] += 1;
      y.avail -= 1;
      return y;
    });
  };

  return {
    spendAttr,
  };
};
