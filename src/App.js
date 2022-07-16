import {Content} from './components/Content';
import {Logo} from './components/Logo';
import {Portrait} from './components/Portrait';
import {Status} from './components/Status';
import {Potions} from './components/Potions';
import {Attributes} from './components/Attributes';
import {Stats} from './components/Stats';
import {BattleScene} from './components/BattleScene';
import {RegionMap} from './components/RegionMap';
import {WorldMap} from './components/WorldMap';
import {SidePanel} from './components/SidePanel';
import {Upgrades} from './components/Upgrades';
import {MessageLog} from './components/MessageLog';
import {Equipment} from './components/Equipment';
import {FullStatistics} from './components/FullStatistics';
import {Container} from '@chakra-ui/react';
import {config} from './config';
import {useEffect} from 'react';
import {useSetRecoilState} from 'recoil';
import {gameState} from './state/gameState';

function App() {
  const setGame = useSetRecoilState(gameState);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      // main game loop
      setGame((x) => ({...x, timeElapsed: x.timeElapsed + config.tickTime}));
    }, config.tickTime);

    return () => {
      clearInterval(gameLoop);
    };
  }, []); //esline-disable-line

  return (
    <Container maxW={'container.lg'}>
      <Content
        header={
          <>
            <Logo />
            <Portrait />
            <Status />
            <Potions />
            <Attributes />
            <Stats />
          </>
        }
        left={
          <>
            <BattleScene />
            <RegionMap />
            <WorldMap />
          </>
        }
        right={
          <>
            <Upgrades />
            <SidePanel>
              <MessageLog />
              <Equipment />
              <FullStatistics />
            </SidePanel>
          </>
        }
      />
    </Container>
  );
}

export default App;
