import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, Animated, TouchableHighlight, TextInput, Modal, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const UpgradePro = () => {
    const navigation = useNavigation();
    const [activeBtn1, setActiveBtn1] = useState(false);
    const [activeBtn2, setActiveBtn2] = useState(false);
    const [activeBtn3, setActiveBtn3] = useState(false);
    const btn1 = () => {
        setActiveBtn1(true)
        setActiveBtn2(false)
        setActiveBtn3(false)
    }
    const btn2 = () => {
        setActiveBtn1(false)
        setActiveBtn2(true)
        setActiveBtn3(false)
    }
    const btn3 = () => {
        setActiveBtn1(false)
        setActiveBtn2(false)
        setActiveBtn3(true)
    }
    const upgradeProBtn = () => {
        {
            activeBtn1 || activeBtn2 || activeBtn3 ?
            Alert.alert('Upgrade Pro', 'Your plan activated.', [
                { text: 'OK', onPress: () => { } },
            ]) 
            :
            Alert.alert('Upgrade Pro', 'Please select plan to upgrade.', [
                { text: 'OK', onPress: () => { } },
            ]) 
        }
    }

    return (
        <View>
            <StatusBar
                backgroundColor="#4A43EC"
                barStyle="light-content"
            />
            {/* Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingVertical: 12, backgroundColor: '#4A43EC', paddingBottom: 20, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 24, }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}>
                        <Image
                            style={{ height: 22, width: 22, marginRight: 13 }}
                            source={require("../Assets/Icons/EventDetailsLeftArrow.png")}
                        />
                    </TouchableOpacity>
                    <Text style={{ color: '#fff', fontSize: 24, fontWeight: '400', fontFamily: 'AirbnbCereal_M' }}>Upgrade Pro</Text>
                </View>
            </View>
            {/* Heading */}
            <View style={{}}>
                <View style={{ marginTop: 40, marginLeft: 25, }}>
                    <Text style={{ color: '#120D26', fontSize: 30, fontWeight: '500', marginVertical: 10, fontFamily: 'AirbnbCereal_M' }}>
                        Gro Premium
                    </Text>
                    <Text style={{ color: '#747688', fontSize: 18, fontWeight: '400', fontFamily: 'AirbnbCereal_2' }}>
                        Upgrade to premium and get all the features available
                    </Text>
                </View>
            </View>
            {/* cards */}
            <View style={{ marginHorizontal: 25, marginTop: 20, }}>
                <TouchableOpacity
                    style={[{ elevation: 3, paddingVertical: 32, paddingHorizontal: 20, borderRadius: 20, marginBottom: 20, }, { backgroundColor: activeBtn1 ? "#4A43EC" : "#fff" }]}
                    onPress={() => btn1()}>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={[{  fontSize: 18, fontWeight: '500', fontFamily: 'AirbnbCereal_M' }, { color: activeBtn1 ? "#fff" : '#000' }]}>1 Month</Text>
                            <Text style={[{  fontSize: 18, fontWeight: '500', fontFamily: 'AirbnbCereal_M' }, { color: activeBtn1 ? "#fff" : '#000' }]}>$ 5.00</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={[{ fontSize: 14, fontWeight: '400', fontFamily: 'AirbnbCereal_M' },{color: activeBtn1 ? "#fff" : '#747688' }]}>Total price $5.00</Text>
                            <Text style={[{ fontSize: 14, fontWeight: '400', fontFamily: 'AirbnbCereal_M' },{color: activeBtn1 ? "#fff" : '#747688' }]}>Monthly</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[{ elevation: 3, paddingVertical: 32, paddingHorizontal: 20, borderRadius: 20, marginBottom: 20, }, { backgroundColor: activeBtn2 ? "#4A43EC" : "#fff" }]}
                    onPress={() => btn2()}>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={[{  fontSize: 18, fontWeight: '500', fontFamily: 'AirbnbCereal_M' }, { color: activeBtn2 ? "#fff" : '#000' }]}>6 Month</Text>
                            <Text style={[{  fontSize: 18, fontWeight: '500', fontFamily: 'AirbnbCereal_M' }, { color: activeBtn2 ? "#fff" : '#000' }]}>$ 9.00</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={[{ fontSize: 14, fontWeight: '400', fontFamily: 'AirbnbCereal_M' },{color: activeBtn2 ? "#fff" : '#747688' }]}>Total price $54.00</Text>
                            <Text style={[{ fontSize: 14, fontWeight: '400', fontFamily: 'AirbnbCereal_M' },{color: activeBtn2 ? "#fff" : '#747688' }]}>Monthly</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[{ elevation: 3, paddingVertical: 32, paddingHorizontal: 20, borderRadius: 20 }, { backgroundColor: activeBtn3 ? "#4A43EC" : "#fff" }]}
                    onPress={() => btn3()}>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={[{  fontSize: 18, fontWeight: '500', fontFamily: 'AirbnbCereal_M' }, { color: activeBtn3 ? "#fff" : '#000' }]}>12 Month</Text>
                            <Text style={[{  fontSize: 18, fontWeight: '500', fontFamily: 'AirbnbCereal_M' },{color: activeBtn3 ? "#fff" : '#000' }]}>$ 7.00</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={[{ fontSize: 14, fontWeight: '400', fontFamily: 'AirbnbCereal_M' },{color: activeBtn3 ? "#fff" : '#747688' }]}>Total price $85.00</Text>
                            <Text style={[{ fontSize: 14, fontWeight: '400', fontFamily: 'AirbnbCereal_M' },{color: activeBtn3 ? "#fff" : '#747688' }]}>Monthly</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            {/* button */}
            <View style={{ marginHorizontal: 75 }}>
                <TouchableOpacity
                    style={{ backgroundColor: '#5669FF', elevation: 3, paddingVertical: 22, paddingHorizontal: 20, borderRadius: 16, marginTop: 40, }}>
                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: '500', textAlign: 'center', fontFamily: 'AirbnbCereal_M' }}
                    onPress={()=>upgradeProBtn()}>
                    Upgrade
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default UpgradePro

const styles = StyleSheet.create({})