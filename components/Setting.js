import { StyleSheet, Text, View, TextInput, Button, Image, StatusBar, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const Setting = () => {
    const navigation = useNavigation();
    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <StatusBar
                backgroundColor="#4A43EC"
                barStyle="light-content"
            />
            {/* Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingVertical: 12, backgroundColor: '#4A43EC', paddingBottom: 40, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 24, }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}>
                        <Image
                            style={{ height: 22, width: 22, marginRight: 13 }}
                            source={require("../Assets/Icons/EventDetailsLeftArrow.png")}
                        />
                    </TouchableOpacity>
                    <Text style={{ color: '#fff', fontSize: 24, fontWeight: '400', fontFamily: 'AirbnbCereal_M' }}>Settings</Text>
                </View>
            </View>
            {/* Body */}
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 150, marginHorizontal: 24, }}>
                <Image
                    style={{ height: 189, width: 176, }}
                    source={require("../Assets/Others/underdev.png")}
                />
                <Text style={{ marginTop: 40, color: '#120D26', fontSize: 24, fontWeight: '500', lineHeight: 34, textAlign: 'center', fontFamily: 'AirbnbCereal_M', }}>
                    No Settings
                </Text>
                <Text style={{ marginTop: 7, color: '#747688', fontSize: 16, fontWeight: '400', lineHeight: 25, textAlign: 'center', opacity: 0.7, fontFamily: 'AirbnbCereal_2', }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor
                </Text>
            </View>
            <View style={{ position: "absolute", top: 50 }}>
                <Image
                    source={require("../Assets/Others/underdev2.png")}
                />
            </View>
            <View style={{ position: "absolute", top: 550 }}>
                <Image
                    source={require("../Assets/Others/underdev2.png")}
                />
            </View>
        </View>
    )
}

export default Setting

const styles = StyleSheet.create({})