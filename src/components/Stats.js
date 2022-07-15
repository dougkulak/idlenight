import {Box, Button, HStack, Text} from '@chakra-ui/react';
import {useRecoilValue} from 'recoil';
import {playerState} from '../state/playerState';

function Stat({name, value}) {
  return (
    <HStack>
      <Text fontSize={'xx-small'} w={'40px'} color={'gray.400'}>
        {name}
      </Text>
      <Text
        fontSize={'xx-small'}
        w={'40px'}
        fontWeight={'extrabold'}
        textAlign={'right'}>
        {value}
      </Text>
    </HStack>
  );
}

export function Stats() {
  const player = useRecoilValue(playerState);

  return (
    <>
      <Box m={1} p={1} borderColor={'gray.800'} borderWidth={2}>
        <Stat name={'Dmg'} value={`${player.dmgMin}-${player.dmgMax}`} />
        <Stat name={'Crit'} value={player.crit + 'x'} />
        <Stat name={'% Crit'} value={player.critChance + '%'} />
        <Stat name={'Speed'} value={player.speed + '%'} />
        <Stat name={'% Hit'} value={player.hitChance + '%'} />
        <Stat name={'Armor'} value={player.armor} />
        <Stat name={'Resist'} value={player.resist + '%'} />
      </Box>
    </>
  );
}
