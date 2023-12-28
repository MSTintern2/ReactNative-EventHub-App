import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, Animated, TouchableHighlight, TextInput, Modal, Linking, Alert } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';

const BuyTicket = ({ route }) => {
    const navigation = useNavigation();
    const { eventName } = route.params;
    const { eventCenter } = route.params;
    const { eventAddress } = route.params;
    const { eventDate } = route.params;
    const { eventId } = route.params;
    const { eventStartingTime } = route.params;
    const { eventOrganizerName } = route.params;
    const { eventCategory } = route.params;
    const { eventEndingTime } = route.params;
    // console.log(eventName)

    //ss
    useEffect(() => {
        ref.current.capture().then(uri => {
            // console.log("do something with ", uri);
            setSSUrl(uri)
        });
    }, []);
    const ref = useRef()
    const [sSUrl, setSSUrl] = useState('');
    const shareBtn = () => {
        const options = {
            url: sSUrl,
            message:`Hi, This is the ticket of ${eventName} event. Lets enjoy.`,
            subject: `${eventName} Ticket`,
        }
        Share.open(options)
    }



    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
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
                    <Text style={{ color: '#fff', fontSize: 24, fontWeight: '400', fontFamily: 'AirbnbCereal_M' }}>Ticket</Text>
                </View>
            </View>
            {/* Body */}
            <ViewShot ref={ref} options={{ fileName: `${eventName} Ticket`, format: "jpg", quality: 0.9 }}  style={{ backgroundColor: "#d6daff", marginHorizontal: 50, marginVertical: 60, paddingTop: 18, borderTopRightRadius: 12, borderTopLeftRadius: 12, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, }}>
                <View style={{}}>
                    <View>
                        {/* eventCategory */}
                        <View style={{ paddingVertical: 4, paddingHorizontal: 12, backgroundColor: '#4A43EC', alignSelf: 'flex-start', borderRadius: 6, marginHorizontal: 12, }}>
                            <Text style={{ color: '#fff', fontSize: 12, fontWeight: '400', fontFamily: 'AirbnbCereal_M', }}>
                                {eventCategory}
                            </Text>
                        </View>
                        {/* eventName */}
                        <View style={{ marginVertical: 10, marginHorizontal: 12, }}>
                            <Text style={{ color: '#4A43EC', fontSize: 24, fontWeight: '400', fontFamily: 'AirbnbCereal_M', }}>
                                {eventName}
                            </Text>
                        </View>
                        {/* Organizer */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 12, }}>
                            <Text style={{ color: '#120D26', fontSize: 14, fontWeight: '400', fontFamily: 'AirbnbCereal_M', }}>
                                Organizer:
                            </Text>
                            <Text style={{ color: '#120D26', fontSize: 14, fontWeight: '400', fontFamily: 'AirbnbCereal_M', marginLeft: 4, }}>
                                {eventOrganizerName}
                            </Text>
                        </View>
                        <View style={{ borderColor: '#120D26', borderBottomWidth: 1, marginVertical: 18, marginHorizontal: 12, }}></View>
                        {/* Place */}
                        <View style={{ marginHorizontal: 12, }}>
                            <Text style={{ color: '#747688', fontSize: 14, fontWeight: '400', fontFamily: 'AirbnbCereal_M', }}>
                                Place
                            </Text>
                            <Text style={{ color: '#120D26', fontSize: 16, fontWeight: '400', fontFamily: 'AirbnbCereal_M', }}>
                                {eventCenter}
                            </Text>
                            <Text style={{ color: '#120D26', fontSize: 16, fontWeight: '400', fontFamily: 'AirbnbCereal_M', }}>
                                {eventAddress}
                            </Text>
                        </View>
                        {/* date */}
                        <View style={{ marginVertical: 12, marginHorizontal: 12, }}>
                            <Text style={{ color: '#747688', fontSize: 14, fontWeight: '400', fontFamily: 'AirbnbCereal_M', }}>
                                Date
                            </Text>
                            <Text style={{ color: '#120D26', fontSize: 16, fontWeight: '400', fontFamily: 'AirbnbCereal_M', }}>
                                {eventDate}
                            </Text>
                        </View>
                        {/* Time */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 12, marginBottom: 18 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: '#747688', fontSize: 14, fontWeight: '400', fontFamily: 'AirbnbCereal_M', }}>
                                    Starting Time
                                </Text>
                                <Text style={{ color: '#120D26', fontSize: 16, fontWeight: '400', fontFamily: 'AirbnbCereal_M', }}>
                                    {eventStartingTime}
                                </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: '#747688', fontSize: 14, fontWeight: '400', fontFamily: 'AirbnbCereal_M', }}>
                                    Ending Time
                                </Text>
                                <Text style={{ color: '#120D26', fontSize: 16, fontWeight: '400', fontFamily: 'AirbnbCereal_M', }}>
                                    {eventEndingTime}
                                </Text>
                            </View>
                        </View>
                        {/* end */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{
                                backgroundColor: '#fff',
                                alignSelf: 'flex-start',
                                height: 12,
                                width: 12,
                                borderTopRightRadius: 12
                            }}></View>
                            <View style={{
                                backgroundColor: '#fff',
                                alignSelf: 'flex-end',
                                height: 12,
                                width: 12,
                                borderTopLeftRadius: 12
                            }}></View>
                        </View>
                    </View>
                    <View style={{}}>
                        {/* start */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{
                                backgroundColor: '#fff',
                                alignSelf: 'flex-start',
                                height: 12,
                                width: 12,
                                borderBottomRightRadius: 12
                            }}></View>
                            <View style={{
                                backgroundColor: '#fff',
                                alignSelf: 'flex-end',
                                height: 12,
                                width: 12,
                                borderBottomLeftRadius: 12
                            }}></View>
                        </View>
                        {/* barcode */}
                        <View style={{ marginTop: 18, }}>
                            <Image
                                style={{ height: 70, width: "85%", alignSelf: "center" }}
                                source={require("../Assets/Others/barcode.png")}
                            />
                        </View>
                        {/* code */}
                        <View style={{ marginBottom: 18, }}>
                            <Text style={{ color: '#747688', fontSize: 14, fontWeight: '400', fontFamily: 'AirbnbCereal_M', textAlign: 'center' }}>
                                {eventId}
                            </Text>
                        </View>
                    </View>
                </View>
            </ViewShot>
            {/* btns */}
            <View style={{ gap: 12 }}>
                <View style={{ }}>
                    <TouchableOpacity
                     style={{ marginHorizontal: 50, backgroundColor: '#4A43EC', padding: 12, justifyContent: 'center', alignItems: "center", borderRadius: 12, }}
                        onPress={() => shareBtn()}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            <Image
                                style={{ height: 30, width: 30, }}
                                source={require("../Assets/Icons/shareT.png")}
                            />
                            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '400', fontFamily: 'AirbnbCereal_M', }}>
                                Share
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* <View style={{ }}>
                    <TouchableOpacity
                    style={{ marginHorizontal: 50, backgroundColor: '#4A43EC', padding: 12, justifyContent: 'center', alignItems: "center", borderRadius: 12, }}
                        onPress={() => {}}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            <Image
                                style={{ height: 30, width: 30, marginRight: 4 }}
                                source={require("../Assets/Icons/SaveT.png")}
                            />
                            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '400', fontFamily: 'AirbnbCereal_M', }}>
                                Save
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View> */}
            </View>
        </View>
    )
}

export default BuyTicket

const styles = StyleSheet.create({})