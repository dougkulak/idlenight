import logoSrc from '../assets/idle-night-logo.svg';
import {config} from '../config';
import {Flex} from '@chakra-ui/react';

export function Logo() {
  return (
    <Flex mx={6} alignContent={'center'}>
      <img src={logoSrc} alt={config.appName} width={296} height={89} />
    </Flex>
  );
}
