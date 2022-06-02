import {Center, Flex, Spacer, Stack, Text} from 'native-base';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

function HomeScreen(props) {
    const { navigation } = props;
  return (
    <Center bg="blue.50">
      <Flex
        direction="row"
        w="80%"
        mx="auto"
        justifyContent="space-between"
        my={2}>
        <TouchableOpacity style={{ flex: 1, flexDirection: "row" }} onPress={() => navigation.navigate("Vocabs")}>
          <Center
            flex={1}
            size="16"
            bg="primary.100"
            _text={{
              color: 'coolGray.800',
            }}
            height={100}>
            Từ mới
          </Center>
        </TouchableOpacity>
        <Center style={{flex: 0.1}} />
        <Center
          flex={1}
          size="16"
          bg="primary.400"
          _text={{
            color: 'coolGray.800',
          }}
          height={100}>
          Ôn tập
        </Center>
      </Flex>
      <Flex
        direction="row"
        w="80%"
        mx="auto"
        justifyContent="space-between"
        my={2}>
        <Center
          flex={1}
          size="16"
          bg="primary.400"
          _text={{
            color: 'coolGray.800',
          }}
          height={100}>
          Kiểm tra
        </Center>
        <Center style={{flex: 0.1}} />
        <Center
          flex={1}
          size="16"
          bg="primary.100"
          _text={{
            color: 'coolGray.800',
          }}
          height={100}>
          Cài đặt
        </Center>
      </Flex>
    </Center>
  );
}

export default HomeScreen;
