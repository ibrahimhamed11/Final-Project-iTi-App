import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/theme'

export default function Header(props) {
  return <Text style={styles.header} {...props} />
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color:'#76005ee5',
    fontWeight: 'bold',
    width:'100%',
    paddingLeft:160,
  backgroundColor:'#ffffff69',
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10
  },
})
