import {Stack, Text, View, VStack} from 'native-base';
import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {vocabAPI} from '../../apis/Vocabs';

function VocabDetailScreen(props) {
  let {route} = props; 
  const [reload, setReload] = useState(false);
  const [word, setWord] = useState({});

  const fetchDic = async id => {
    setReload(true);
    let result = await vocabAPI.getDic(id);
    if (result.status === 200) {
      console.log(result.data.dic);
      setReload(false);
      setWord(result.data.dic);
    }
  };

  useEffect(() => {
    if (route && route.params) {
      fetchDic(route.params.detail);
    }
  }, [route]);

  if (reload) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack direction="column" space={3} alignItems="center" flex={1}>
      <VStack w="90%" mt={1} py={3} bg="primary.200" px={3}>
        <Text fontSize="lg" bold>
          {word.word} ({word.pronounce})
        </Text>
      </VStack>
      {word?.meanings?.length && word.meanings.map(item => (
        <VStack w="90%" bg="#fff" p={3} mt={1} >
          <Text fontSize="sm">
            { item.meaning }
          </Text>
          <Text fontSize="xs">
            { item.sample }
          </Text>
        </VStack>
      ))}
    </Stack>
  );
}

export default VocabDetailScreen;
