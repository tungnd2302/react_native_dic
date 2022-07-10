import {HStack, Stack, Text, VStack, Button, Input} from 'native-base';
import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  VirtualizedList,
  View,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {Alert} from 'native-base';
import {vocabAPI} from '../../apis/Vocabs.js';

const Vocabs = props => {
  const {navigation, route} = props;
  const [dictionary, setDictionary] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [alert, setAlert] = useState('');
  const [reload, setReload] = useState(false);
  const [search, onChangeSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [noResult, setNoResult] = useState('');

  const fetchDics = async () => {
    if (!refresh) {
      setReload(true);
    }
    let result = await vocabAPI.getDics();
    if (result.status === 200) {
      setReload(false);
      setDictionary(result.data.dics);
    }
  };

  useEffect(() => {
    if (refresh) {
      fetchDics();
      setRefresh(false);
    } else {
      fetchDics();
    }
  }, [refresh, route]);

  useEffect(() => {
    setNoResult(false)
    if (search) {
      let result_array = dictionary.filter(x => x.word.includes(search));
      if (result_array.length) {
        setSearchResult(result_array);
      } else {
        setNoResult(true) 
      }
    } else {
      setSearchResult([]);
    }
    // setSearchResult(search ? dictionary.filter(x => x.word.includes(search)) : [])
  }, [search]);
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('VocabDetail', {
            detail: item.id,
          })
        }
        key={item.id}
      >
        <HStack
          space={3}
          style={{
            backgroundColor: `${item.id % 2 == 0 ? '#ccc' : '#ccc'}`,
            shadowColor: '#ccc',
            elevation: 3,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.7,
            shadowRadius: 8,
          }}
          my={3}
          py={2}
          px={1}>
          <VStack>
            <View>
              <Text fontSize="sm" bold>
                {item.word}
              </Text>
              <Text fontSize="xs">{item.meaning}</Text>
            </View>
          </VStack>
        </HStack>
      </TouchableOpacity>
    );
  };

  if (reload) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack direction="column" space={10} alignItems="center" flex={1}>
      <Stack w="90%" mt={1}>
        <VStack w="90%" mb={3}>
          {alert ? (
            <Alert status="info" colorScheme="info">
              {alert}
            </Alert>
          ) : null}
        </VStack>
        <VStack w="100%" mb={3}>
          <Input
            w="100%"
            size="xl"
            py="0"
            InputRightElement={
              <Button size="xs" rounded="none" h="full">
                Tìm kiếm
              </Button>
            }
            placeholder="Nhập từ vựng"
            value={search}
            onChangeText={onChangeSearch}
          />
        </VStack>
        {
          noResult ? ( 
            <VStack>
            <HStack
              space={3}
              style={{
                backgroundColor: '#ccc',
                shadowColor: '#ccc',
                elevation: 3,
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.7,
                shadowRadius: 8,
                alignItems: "center"
              }}
              my={3}
              py={2}
              px={1}>
              <VStack>
                <View> 
                  <Text fontSize="sm" bold>
                    Không tìm thấy từ
                  </Text>
                </View>
              </VStack>
            </HStack>
          </VStack>
          ) :   <VirtualizedList
          data={searchResult.length ? searchResult : dictionary}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          getItemCount={() =>
            searchResult.length ? searchResult.length : dictionary.length
          }
          getItem={(data, index) => ({
            meaning: data[index]?.meaning,
            word: data[index]?.word,
            id: data[index]?._id
          })}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => setRefresh(true)}
              tintColor="#ccc"
            />
          }
        />
        }
      
      </Stack>
      <Stack
        direction="column"
        justifyContent="flex-end"
        mt={2}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          justifyContent: 'flex-end',
        }}
        w="100%">
        <Button
          size="md"
          alignSelf="flex-end"
          onPress={() => navigation.navigate('VocabCreate')}
          rounded="md">
          Thêm từ mới
        </Button>
      </Stack>
    </Stack>
  );
};

export default Vocabs;
