import {Center, Flex, View, Stack, Text, HStack, Button, VStack} from 'native-base';
import React, { useEffect, useState } from 'react';
import {ActivityIndicator, TouchableOpacity, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { vocabAPI } from '../../apis/Vocabs';


function HomeScreen(props) {
  const {navigation} = props;
  const [dictionary, setDictionary] = useState([]);
  const [reload, setReload] = useState(false);

  const renderItem = ({item}) => {
    return (
      <HStack key={item._id} style={{backgroundColor: '#ccc'}} p={4} justifyContent="space-between">
        <Text>{item.word}</Text>
      </HStack>
    );
  };

  const fetchDics = async () => {
      setReload(true);
    let result = await vocabAPI.getDics();
    if (result.status === 200) {
      setReload(false);
      setDictionary(result.data.dics);
    }
  };

  useEffect(() => {
    fetchDics()
  }, []);

  if (reload) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Center bg="blue.50">
      <Carousel
        ref={c => {
          this._carousel = c;
        }}
        data={dictionary}
        renderItem={renderItem}
        sliderWidth={334}
        itemWidth={334}
        layout='default'
      />
      <Flex w="90%" p={5}>
        <Image source={require('../../Assets/images/bg.jpeg')} style={{
          width: 334,
          height: 120
        }} />

      </Flex>
      <Flex
        direction="row"
        w="80%"
        mx="auto"
        justifyContent="space-between"
        my={2}>
        <TouchableOpacity
          style={{flex: 1, flexDirection: 'row'}}
          onPress={() => navigation.navigate('Vocabs')}>
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
        <TouchableOpacity
          style={{flex: 1, flexDirection: 'row'}}
          onPress={() => navigation.navigate('Practice')}>
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
        </TouchableOpacity>
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
