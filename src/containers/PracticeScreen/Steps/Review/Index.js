import React from 'react';
import { Text, VStack } from 'native-base';

function Review(props) {
  return (
    <>
      <VStack
        p={3}
        style={{
          boxShadow:
            '0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 4%)',
          backgroundColor: '#fff',
        }}
        mb={3}>
        <Text>
          Congratulation, you're done
        </Text>
      </VStack>
    </>
  );
}

export default Review;
