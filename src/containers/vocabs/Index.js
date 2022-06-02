import {
  Center,
  HStack,
  Input,
  NativeBaseProvider,
  Stack,
  Text,
  VStack,
  Button,
} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, VirtualizedList} from 'react-native';
import {Alert} from 'native-base';

const Vocabs = props => {
  const {navigation} = props;
  const [text, onChangeText] = useState('');
  const [mean, onChangeMean] = useState('');
  const [dictionary, setDictionary] = useState([
    {
      id: 0,
      text: 'new',
      mean: 'mới',
    },
    {
      id: 2,
      text: 'new',
      mean: 'mới hihi',
    },
  ]);

  const [alert, setAlert] = useState('');

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('VocabDetail')}>
        <HStack
          space={3}
          style={{backgroundColor: `${item.id % 2 == 0 ? '#ccc' : '#eee'}`}}
          py={2}
          px={1}>
          <VStack>
            <Text fontSize="sm" bold>
              {item.text}
            </Text>
            <Text fontSize="xs">{item.mean}</Text>
          </VStack>
        </HStack>
      </TouchableOpacity>
    );
  };

  const addVocab = () => {
    if (mean && text) {
      setDictionary([
        ...dictionary,
        {
          id: dictionary[dictionary.length - 1].id + 1,
          mean,
          text,
        },
      ]);
      setAlert('');
      onChangeMean('');
      onChangeText('');
    } else {
      setAlert('Trường không được để trống');
    }
  };

  return (
    <Center flex={1} px="0">
      <Stack w="80%" mb={3}>
        {alert ? (
          <Alert status="info" colorScheme="info">
            {alert}
          </Alert>
        ) : null}
      </Stack>
      <Stack w="80%">
        <Input
          size="md"
          onChangeText={onChangeText}
          value={text}
          placeholder="Từ vựng"
          mb={2}
        />

        <Input
          size="md"
          onChangeText={onChangeMean}
          value={mean}
          placeholder="Ý nghĩa"
          mb={2}
        />

        <Button colorScheme="success" onPress={addVocab}>
          <Text color="white">Lưu từ</Text>
        </Button>
      </Stack>
      <Stack w="80%" mt={3}>
        <VStack space={3} mb={4}>
          <Text fontSize="md">Từ đã thêm</Text>
        </VStack>
        <VirtualizedList
          data={dictionary}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          getItemCount={() => dictionary.length}
          getItem={(data, index) => ({
            mean: data[index].mean,
            text: data[index].text,
            id: index,
          })}
        />
      </Stack>
    </Center>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Vocabs;
