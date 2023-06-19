import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { Text, TouchableRipple, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import StarRating from '../Components/Rate';

const TopRatedProducts = ({ item }) => {
    const nav = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableRipple
                onPress={() => nav.navigate('eachproduct')}
                rippleColor="rgba(200, 50, 50, .32)"
                borderRadius={50}
            >
                <Image source={item.image} style={[styles.img]} />
            </TouchableRipple>
            <Text style={styles.title} >{item.nameOfProduct}</Text>


            <StarRating rating={2} />

            {/* <Text style={{ color: 'grey' }} >{item.rate}  <Icon name='star' size={20} color={'#f6db0b'} /></Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // height: Dimensions.get('screen').height*0.2
    },
    img: {
        width: 130,
        height: 130,
        borderRadius: 5,
        // padding: 20,
        borderWidth: 0,

    },
    page_wrapper: {
        backgroundColor: '#dfd5e0',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        justifyContent: 'center',
        // alignItems: 'center',
        // flexDirection: '',
        // paddingVertical: 10
    }

})

export default TopRatedProducts