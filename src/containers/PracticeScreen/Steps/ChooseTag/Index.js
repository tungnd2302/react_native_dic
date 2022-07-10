import { View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import TagItem from './TagItem';
import { TagAPI } from "../../../../apis/Tags";
function ChooseTag({ setSelectedTag, setcurrentState }) {
    const [tags, setTags] = useState([]);
    const [reload, setReload] = useState(false);

    const fetchTags = async () => {
        setReload(true);
        let result = await TagAPI.getAll();
        if (result.status === 200) {
            setReload(false);
            setTags(result.data.tags);
        }
    };

    useEffect(() => {
        fetchTags();
    }, []);

    const handleChooseTag = (tagId) => {
        setSelectedTag(tagId)
        setcurrentState("practice");
    }

    if (reload) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <>
            {
                tags.length > 0 && tags.map(item => <TagItem onChooseTag = {handleChooseTag} key={item._id} tag={item} />)
            }
        </>
        // <TagItem />
    );
}

export default ChooseTag;