import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LoginLoader = ({visible}) => {
  return (
    <Modal visible={visible} transparent={true}>
        <View style={{flex:1 , backgroundColor: 'rgba(0,0,0,0.5)',justifyContent:'center',alignItems: 'center'}}>
            <ActivityIndicator  size={'large'} color="#4A43EC" />
        </View>
    </Modal>
  )
}

export default LoginLoader

const styles = StyleSheet.create({})