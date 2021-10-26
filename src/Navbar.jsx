import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

export const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <Image style={styles.image} source={ require('../assets/Logo2.png')} />
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    height: "30%",
    width: "100%",
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  text: {
    color: 'white',
    fontSize: 20
  },
  image: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  }
})
