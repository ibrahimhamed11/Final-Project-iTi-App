import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const BabyComponent = ({ item }) => {
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Image source={item.BabyImage} style={{ width: 80, height: 80, borderRadius: 20 }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 12, color: '#76005f', marginRight: 3 }}>{item.babyName}</Text>
                <Text style={{ color: '#76005f', fontSize: 12 }}>{item.BabyAge}</Text>
            </View>
        </View>
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
        alignItems: 'center'
    }
})
export default BabyComponent
