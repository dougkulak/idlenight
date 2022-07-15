import React, {useEffect} from 'react';
import {Box, StackDivider, Text, VStack} from '@chakra-ui/react';
import {useMessage} from '../hooks/useMessage';

function Message({message}) {
  if (!message.color) message.color = 'gray.500';

  if (message.type === 'pre') {
    return (
      <pre style={{textAlign: 'left', fontSize: 'xx-small'}}>
        {message.message}
      </pre>
    );
  }
  return (
    <Text fontSize={'xx-small'} textAlign={'left'} color={message.color}>
      {message.message}
    </Text>
  );
}

export function MessageLog() {
  const messageMgr = useMessage();

  useEffect(() => {
    // scroll to bottom
    const myDiv = document.getElementById('MessageLog');
    myDiv.scrollTop = myDiv.scrollHeight;
  }, [messageMgr.messages]);

  return (
    <Box p={1} maxH={'596px'} overflowY={'auto'} id={'MessageLog'}>
      <VStack
        spacing={1}
        alignItems={'flex-start'}
        divider={<StackDivider borderColor="gray.900" />}>
        {messageMgr.messages.map((message, i) => (
          <Message message={message} key={i} />
        ))}
      </VStack>
    </Box>
  );
}
