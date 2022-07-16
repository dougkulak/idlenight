import {Box, Flex, SimpleGrid, Text} from '@chakra-ui/react';
import {regionState} from '../state/regionState';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useEffect, useState} from 'react';
import {enemyState} from '../state/enemyState';

export function RegionMap() {
  const [region, setRegion] = useRecoilState(regionState);

  const enemy = useRecoilValue(enemyState);

  const numCols = 10;
  const numRows = 10;

  const [cells, setCells] = useState([]);

  useEffect(() => {
    const myCells = [];
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        myCells.push({
          id: i * 10 + j,
        });
      }
    }
    setCells(myCells);
  }, []);

  const getCellBg = (a, b) => {
    if (a === b) return 'blue.700';
    if (a > b) return 'gray.700';
    return 'gray.900';
  };

  const getCellText = (a, b) => {
    if (a === b) return 'white';
    if (a > b) return 'gray.500';
    return 'gray.600';
  };

  return (
    <>
      <Box h={'250px'} mt={2} p={1} bg={'black'} borderRadius={'md'}>
        <SimpleGrid columns={10} spacing={1}>
          {cells.map((cell) => (
            <Box
              key={cell.id}
              bg={getCellBg(enemy.id - 1, cell.id)}
              textAlign={'center'}>
              <Text fontSize={'xs'} color={getCellText(enemy.id - 1, cell.id)}>
                {cell.id}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}
