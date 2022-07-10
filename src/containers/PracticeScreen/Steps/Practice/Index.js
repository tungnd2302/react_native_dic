import {
  Box,
  Button,
  HStack,
  Input,
  Stack,
  Text,
  View,
  VStack,
} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {vocabAPI} from '../../../../apis/Vocabs';
import {getWords, shuffle} from '../../../../config/helpers';

function Practice({tag, setcurrentState}) {
  const [words, setWords] = useState([]);
  const [wordSelected, setWordSelected] = useState({});
  const [indexWord, setIndexWord] = useState(-1);
  const [notify, setNotify] = useState("");
  const inputRef = useRef([]);

  useEffect(() => {
    async function fetchDic() {
      try {
        let res = await vocabAPI.showWordsByTag(tag);
        if (res.status === 200) {
          let word = getWords(res.data.words);
          setWords(shuffle(word));
        }
      } catch (error) {
        console.log('error', error);
      }
    }
    fetchDic();
  }, []);

  useEffect(() => {
    pickRandom();
  }, [words]);

  const pickRandom = () => {
    if (indexWord < words.length) {
      setIndexWord(indexWord + 1);
      setWordSelected(words[indexWord]);
    } else {
      setcurrentState('review');
    }
  };

  const handleChange = (text, pos) => {
    if (inputRef.current[pos]) {
      inputRef.current[pos].value = text;
    }
    //   console.log(myRef.);
    const current = inputRef.current;
    if (current[pos].value) {
      if (pos + 1 < wordSelected?.word?.length) {
        current[pos + 1].focus();
      }
    } else {
      if (pos > 0) {
        current[pos - 1].focus();
      }
    }
  };

  const handleDelete = (e, pos) => {
    const current = inputRef.current;
    if (e.nativeEvent.key === 'Backspace') {
      if (!current[pos].value && pos !== 0) {
        current[pos - 1].focus();
      }
    }
  };

  const handleCheck = () => {
    const current = inputRef.current;
    const word = current.map(e => e?.value).join('');
    if (word.toUpperCase() == wordSelected?.word.toUpperCase()) {
      setNotify("");
      current[0].clear();
      current[0].focus();
      pickRandom();
      current.forEach(e => e?.clear());
    } else {
      setNotify("You are not correct, try again")
    }
  };

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
          Question {indexWord}/ {words.length}
        </Text>
      </VStack>
      {
        notify ? <VStack
        p={3}
        style={{
          boxShadow:
            '0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 4%)',
          backgroundColor: '#fff',
        }}
        mb={3}>
        <Text>
          { notify }
        </Text>
      </VStack> : null
      }
      <VStack
        py={5}
        style={{
          boxShadow:
            '0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 4%)',
          backgroundColor: '#fff',
        }}>
        <View>
          <Text textAlign="center" fontSize="2xl" mb={5}>
            {wordSelected?.pronounce}
          </Text>
        </View>
        <HStack justifyContent="center" flexWrap="wrap">
          {wordSelected?.word?.length &&
            wordSelected?.word?.split('').map((e, index) => (
              <Box
                key={index}
                w="30px"
                mx={1}
                my={1}
                height="30px"
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                }}>
                <Input
                  variant="unstyled"
                  p={0}
                  maxLength={1}
                  textAlign="center"
                  fontSize={20}
                  textTransform="uppercase"
                  onChangeText={e => handleChange(e, index)}
                  ref={ref => (inputRef.current[index] = ref)}
                  onKeyPress={e => handleDelete(e, index)}
                />
              </Box>
            ))}
        </HStack>
      </VStack>
      <VStack
        p={3}
        mt={2}
        style={{
          boxShadow:
            '0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 4%)',
          backgroundColor: '#fff',
        }}>
        <Button onPress={handleCheck}>Next</Button>
      </VStack>
    </>
  );
}

export default Practice;
