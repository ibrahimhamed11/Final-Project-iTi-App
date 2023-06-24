// import zIndex from '@mui/material/styles/zIndex';
import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Card, TouchableRipple, Chip } from 'react-native-paper';

const HomeSlider = ({ item }) => {
    return (
        <Card style={styles.container}>
            <Chip style={styles.chip} icon="information" onPress={() => console.log('Pressed')}>{item.label}</Chip>
            <TouchableRipple
                onPress={() => console.log('Pressed')}
                rippleColor="rgba(0, 0, 0, .32)"
            >
                <Card.Cover source={item?.image} style={styles.img} />
            </TouchableRipple>
            <Card.Content style={styles.content}>
                <Text style={styles.description} variant="titleLarge">{item?.description}</Text>
            </Card.Content>
        </Card>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
        elevation: 5,
        shadowColor: '#101011',
        height: Dimensions.get('screen').height * 0.25,
        boxShadow: "10px 10px 17px 12px rgba(0, 0, 0, 0.893)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 10,
    },
    img: {
        width: Dimensions.get('screen').width*0.9,
        height: Dimensions.get('screen').height * 0.25,

        position: 'relative'
    },
    chip: {
        width: 100,
        position: 'absolute',
        backgroundColor: 'transparent',
        borderColor: '#a488b3',
        borderWidth: 2,
        color: 'white',
        margin: 10,
        zIndex: 20,
    },
    description: {
        color: 'white',
        fontSize: 14,
    },
    content: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, .15)',
        width: '100%',
        borderRadius: 10,
        top: 140
    }
})
export default HomeSlider