import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
    return <Image source={require('../assets/motherlogo.gif')} style={styles.image} />
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginTop: 10,
        marginBottom: 8,
    },
})
