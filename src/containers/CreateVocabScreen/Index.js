import { Button, Input, Stack, Text } from 'native-base';
import React, { useState } from 'react';
import { vocabAPI } from '../../apis/Vocabs';

function CreateVocabScreen(props) {
  const [word, onChangeWord] = useState('');
  const [meaning, onChangeMeaning] = useState('');

  const onAddVocab = async () => {
    if(word && meaning) {
      try {
        const result = await vocabAPI.addDic({
          word : word,
          meaning : meaning
        });
        if(result.status === 200) {
          props.navigation.navigate("Vocabs", {
            reload : false
          })
        }else {
          console.log(result.status)
        }
      } catch(e) {
        console.log(e)
      }
    }else{
      console.log("error")
    }
  }

  return (
    <Stack w="90%" alignSelf="center" mt={3}>
      <Input
        size="md"
        onChangeText={onChangeWord}
        value={word}
        placeholder="Từ vựng"
        mb={2}
      />

      <Input
        size="md"
        onChangeText={onChangeMeaning}
        value={meaning}
        placeholder="Ý nghĩa"
        mb={2}
      />

      <Button
        flexDirection="column"
        colorScheme="success"
        onPress={onAddVocab}>
        <Text color="white">Lưu từ</Text>
      </Button>
    </Stack>
  );
}

export default CreateVocabScreen;
