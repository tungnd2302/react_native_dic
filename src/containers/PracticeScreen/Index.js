import {Stack} from 'native-base';
import React, {useState} from 'react';
import ChooseTag from './Steps/ChooseTag/Index';
import Practice from './Steps/Practice/Index';
import Review from './Steps/Review/Index';

const PracticeScreen = props => {
  const [currentState, setcurrentState] = useState('choose-tag');
  const [selectedTag, setSelectedTag] = useState();

  const showComponent = () => {
    if (currentState == 'choose-tag') {
      return (
        <ChooseTag
          setcurrentState={setcurrentState}
          setSelectedTag = { setSelectedTag }
        />
      );
    } else if(currentState == "review") {
      return <Review />
    } else {
      return (
        <Practice tag={selectedTag} setcurrentState={setcurrentState}/>
      )
    }
  };

  return (
    <Stack direction="column" space={10} alignItems="center" flex={1}>
      <Stack w="90%" mt={1}>
        {showComponent()}
      </Stack>
    </Stack>
  );
};

export default PracticeScreen;
