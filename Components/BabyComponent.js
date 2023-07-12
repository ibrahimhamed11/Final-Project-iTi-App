import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

let num = 0
const BabyComponent = ({ item }) => {
    // babies photos
    const [image, setImage] = useState(0);
    const photos = [
        require('../assets/images/Happy-baby.png'),
        require('../assets/images/Sleeping-baby-pana.png'),
        require('../assets/images/Sleeping-baby.png'),
    ]
    useEffect(() => {
        if (num >= photos.length) {
            setImage(0)
        }
        else {
            setImage(num++)
        }
    }, [])


    // set babyinfo in storage
    const handleSetBaby = async (baby) => {
        const babyInfo = JSON.stringify(baby)
        await AsyncStorage.setItem('baby', babyInfo);

    }
    // send baby id
    const navigation = useNavigation();


    return (
        <TouchableOpacity onPress={() => { handleSetBaby(item) }}>
            <View style={styles.container}>

                <View style={styles.box}>
                    <Image source={photos[image]} style={{ width: 80, height: 80, borderRadius: 20, borderColor: '#ecc28398', borderWidth: 1 }} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 13, color: '#76005f', marginRight: 3, fontFamily: 'Droid' }}>{item.name}</Text>
                    <Text style={{ color: '#76005f', fontSize: 12 }}>{item.BabyAge}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,

    },
    box: {
        marginHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',

    }
})
export default BabyComponent
