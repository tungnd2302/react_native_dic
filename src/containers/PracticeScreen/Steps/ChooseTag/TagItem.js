import {Box, HStack, Text, VStack} from 'native-base';
import {TouchableOpacity, View} from 'react-native';
import React from 'react';

function TagItem({tag, onChooseTag}) {
  return (
    <TouchableOpacity onPress={() => onChooseTag(tag._id)}>
      <HStack
        space={3}
        style={{
          boxShadow:
            '0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 4%)',
          shadowColor: '#ccc',
          elevation: 3,
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.7,
          shadowRadius: 8,
          backgroundColor: '#fff',
        }}
        my={1}
        py={2}
        px={1}>
        <VStack>
          <HStack style={{border: '1px solid #eee'}} alignItems="center">
            <Box bg={tag.color} width="5px" height="5px" mr="5px" rounded="50"></Box>
            <Text fontSize="sm" bold>
              {tag?.name}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
}

export default TagItem;
