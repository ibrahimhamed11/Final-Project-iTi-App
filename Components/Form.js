import { useState } from 'react'
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
// import { useNavigation } from '@react-navigation/native';
const Form = (props) => {
    console.log(props)
    const [input, setInput] = useState('');
    // const nav = useNavigation();
    function save() {
        // nav.navigate('card');
        props.navigation.navigate('Home');
    }
    function changeText(text) {
        setInput(text);
    }
    return (
        <View>
            <TextInput placeholder='enter your name' onChangeText={changeText} />
            <Text>{input}</Text>
            <TouchableOpacity onPress={save}>
                <View style={{ backgroundColor: 'red', width: '10%', alignSelf: 'center' }}><Text>save </Text></View>
            </TouchableOpacity>
        </View>
    )
}

export default Form