import {HStack, Text} from '@chakra-ui/react';
import {
  ResourceGoldIcon,
  ResourceRocksIcon,
  ResourceTimeIcon,
  ResourceWoodIcon,
} from './Icons';
import {formatTimeElapsed} from '../utils/time';
import {gameState} from '../state/gameState';
import {useRecoilValue} from 'recoil';

export function Resources() {
  const game = useRecoilValue(gameState);

  return (
    <HStack
      pt={1}
      spacing={3}
      alignItems={'flex-start'}
      verticalAlign={'middle'}>
      <Text fontSize={'xs'}>
        <ResourceGoldIcon /> {game.gold}
      </Text>
      <Text fontSize={'xs'}>
        <ResourceWoodIcon /> {game.wood}
      </Text>
      <Text fontSize={'xs'}>
        <ResourceRocksIcon /> {game.rocks}
      </Text>
      <Text fontSize={'xs'}>
        <ResourceTimeIcon /> {formatTimeElapsed(game.timeElapsed)}
      </Text>
    </HStack>
  );
}
