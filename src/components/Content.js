import {Flex, Grid, GridItem} from '@chakra-ui/react';

export function Content({header, left, right}) {
  return (
    <Flex w={'100%'} mt={4}>
      <Grid w={'100%'} templateColumns="repeat(6, 1fr)" gap={2}>
        <GridItem colSpan="6" w="100%" bg="black" borderRadius={'md'}>
          <Flex p={1}>{header}</Flex>
        </GridItem>
        <GridItem colSpan="4" w="100%" borderRadius={'md'}>
          {left}
        </GridItem>
        <GridItem colSpan="2" w="100%" bg="black" borderRadius={'md'}>
          {right}
        </GridItem>
      </Grid>
    </Flex>
  );
}
