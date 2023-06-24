import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
    return <Image source={require('../assets/sellerLogo.gif')} style={styles.image} />
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,

        marginBottom: 8,
    },
})
