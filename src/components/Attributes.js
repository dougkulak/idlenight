import {Box, Button, HStack, Text} from '@chakra-ui/react';
import {useRecoilValue} from 'recoil';
import {playerState} from '../state/playerState';
import {usePlayer} from '../hooks/usePlayer';

function Attribute({name, value, onSpend}) {
  const player = useRecoilValue(playerState);

  return (
    <HStack>
      <Text fontSize={'xx-small'} w={'25px'} color={'gray.400'}>
        {name}
      </Text>
      <Text
        fontSize={'xx-small'}
        w={'20px'}
        fontWeight={'extrabold'}
        textAlign={'right'}>
        {value}
      </Text>
      <Button
        size={'xs'}
        colorScheme={player.avail > 0 ? 'red' : 'gray'}
        height={'16px'}
        style={{marginBottom: '3px'}}
        onClick={onSpend}
        disabled={!player.avail}>
        +
      </Button>
    </HStack>
  );
}

export function Attributes() {
  const playerMgr = usePlayer();
  const player = useRecoilValue(playerState);

  return (
    <>
      <Box m={1} p={1} borderColor={'gray.800'} borderWidth={2}>
        <Attribute
          name={'STR'}
          value={player.str}
          onSpend={() => playerMgr.spendAttr('str')}
        />
        <Attribute
          name={'DEX'}
          value={player.dex}
          onSpend={() => playerMgr.spendAttr('dex')}
        />
        <Attribute
          name={'INT'}
          value={player.int}
          onSpend={() => playerMgr.spendAttr('int')}
        />
        <Attribute
          name={'VIT'}
          value={player.vit}
          onSpend={() => playerMgr.spendAttr('vit')}
        />
        <Box
          pt={1}
          borderTopColor={'gray.800'}
          borderTopWidth={2}
          textAlign={'center'}>
          <Text fontSize={'xx-small'} color={'gray.400'}>
            Available: {player.avail}
          </Text>
        </Box>
      </Box>
    </>
  );
}
