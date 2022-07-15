import raw from 'raw.macro';
import {Text, VStack} from '@chakra-ui/react';
import {useRecoilValue} from 'recoil';
import {playerState} from '../state/playerState';

const ascii = raw('../assets/ascii/portrait.txt');

export function Portrait() {
  const player = useRecoilValue(playerState);

  return (
    <VStack mr={2}>
      <pre style={{fontSize: '8px', textAlign: 'left'}}>{ascii}</pre>
      <Text fontSize={'xs'} style={{marginTop: 0}}>
        LEVEL {player.level}
      </Text>
    </VStack>
  );
}
