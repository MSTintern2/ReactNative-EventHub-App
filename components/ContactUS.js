import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, Animated, TouchableHighlight, TextInput, Modal, Linking, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import call from 'react-native-phone-call'
import { openComposer } from "react-native-email-link";

const ContactUS = () => {
    const navigation = useNavigation();
    //get user data from firebase on the base of userId saved in Async Storage
    const [userPhone, setUserPhone] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userFacebook, setUserFacebook] = useState('');
    const [userInstagram, setUserInstagram] = useState('');
    const [userLinkedIn, setUserLinkedIn] = useState('');
    useEffect(() => {
        getUserDataByUserId()
    }, [])
    const getUserDataByUserId = async () => {
        try {
            const myId = await AsyncStorage.getItem('USERID')
            // console.log(myId)
            const userData = await firestore().collection('users').doc(myId).get();
            setUserPhone(userData._data.phone)
            setUserEmail(userData._data.email)
            setUserFacebook(userData._data.facebook)
            setUserInstagram(userData._data.instagram)
            setUserLinkedIn(userData._data.linkedin)
            // console.log(userPhone)
        } catch (error) {
            console.log(error)
        }
    }
    //onPress phone btn
    const phoneCallBtn = () => {
        const args = {
            number: userPhone,
            prompt: false,
        }
        call(args).catch(console.error)
    }
    //onPress email btn
    const emailBtn = () => {
        openComposer({
            to: userEmail,
            cc: "support@eventhub.com",
            subject: "EventHub: I have a question.",
            body: "Assalam-O-Alaikum...",
        });
    }
    //onPress facebook
    const facebookBtn = () => {
        {
            userFacebook == ""
                ?
                Alert.alert("404 Facebook link not found", "Error:404 - Facebook link not available.",
                    [{ text: "Ok", onPress: async () => { } },])
                :
                Linking.openURL(`https://www.facebook.com/${userFacebook}`)
        }
    }
    //onPress instagram
    const InstagramBtn = () => {
        {
            userInstagram == ""
                ?
                Alert.alert("404 Instagram link not found", "Error:404 - Instagram link not available.",
                    [{ text: "Ok", onPress: async () => { } },])
                :
                Linking.openURL(`https://www.instagram.com/${userInstagram}`)
        }
    }
    //onPress linkedin
    const linkedinBtn = () => {
        {
            userLinkedIn == ""
                ?
                Alert.alert("404 LinkedIn link not found", "Error:404 - LinkedIn link not available.",
                    [{ text: "Ok", onPress: async () => { } },])
                :
                Linking.openURL(`https://www.linkedin.com/${userLinkedIn}`)
        }
    }

    return (
        <View>
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
                    <Text style={{ color: '#fff', fontSize: 24, fontWeight: '400', fontFamily: 'AirbnbCereal_M'}}>Contact Us</Text>
                </View>
            </View>
            {/* Body */}
            <View style={{ alignItems: 'center', }}>
                <View style={{ alignItems: 'center', marginTop: 40, }}>
                    <Text style={{ color: '#120D26', fontSize: 30, fontWeight: '500', marginVertical: 10,fontFamily: 'AirbnbCereal_M' }}>
                        Get in Touch
                    </Text>
                    <Text style={{ color: '#747688', fontSize: 16, fontWeight: '400',fontFamily: 'AirbnbCereal_2' }}>
                        If you have any inquiries get in touch with us. {"\n"}
                        We'll be happy to help you.
                    </Text>
                </View>
                <View>
                    <TouchableOpacity style={{ borderRadius: 22, borderColor: '#4A43EC', borderWidth: 1, marginTop: 20, alignItems: 'center', backgroundColor: '#d6daff' }}
                        onPress={phoneCallBtn}>
                        <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 20, alignItems: 'center' }}>
                            <Image
                                style={{ height: 40, width: 30, marginRight: 10 }}
                                source={require("../Assets/Icons/Phone.png")}
                            />
                            <Text style={{ color: '#000', fontSize: 20, fontWeight: '400',fontFamily: 'AirbnbCereal_M' }}>{userPhone}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ borderRadius: 22, borderColor: '#4A43EC', borderWidth: 1, marginTop: 20, alignItems: 'center', backgroundColor: '#d6daff' }}
                        onPress={emailBtn}>
                        <View style={{ flexDirection: 'row', paddingHorizontal: 50, paddingVertical: 20, alignItems: 'center' }}>
                            <Image
                                style={{ height: 40, width: 40, marginRight: 10 }}
                                source={require("../Assets/Icons/ContactUs.png")}
                            />
                            <Text style={{ color: '#000', fontSize: 20, fontWeight: '400',fontFamily: 'AirbnbCereal_M' }}>{userEmail}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* Social Media */}
                <View style={{ alignItems: 'center', marginTop: 30 }}>
                    <Text style={{ color: '#120D26', fontSize: 24, fontWeight: '500', marginVertical: 10,fontFamily: 'AirbnbCereal_M' }}>
                        Social Media
                    </Text>
                    <View style={{ flexDirection: 'row', marginHorizontal: 30, marginTop: 30, alignItems: 'center' }}>
                        <View style={{ alignItems: 'flex-start', marginRight: 12 }}>
                            <TouchableOpacity style={{ borderWidth: 1, borderColor: '#1977F3', padding: 4, borderRadius: 23, }}
                                onPress={facebookBtn}>
                                <Image
                                    source={require("../Assets/Icons/fb.png")}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ color: '#000', fontSize: 14, fontWeight: '400', fontFamily: 'AirbnbCereal_2'}}>Stay updated, connect, and engage with us on Facebook.</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginHorizontal: 30, marginTop: 30, alignItems: 'center' }}>
                        <View style={{ alignItems: 'flex-start', marginRight: 12 }}>
                            <TouchableOpacity style={{ borderWidth: 1, borderColor: '#1977F3', padding: 4, borderRadius: 23, }}
                                onPress={InstagramBtn}>
                                <Image
                                    source={require("../Assets/Icons/insta.png")}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ color: '#000', fontSize: 14, fontWeight: '400',fontFamily: 'AirbnbCereal_2' }}>Stay updated, connect, and engage with us on Instagram.</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginHorizontal: 35, marginTop: 30, alignItems: 'center' }}>
                        <View style={{ alignItems: 'flex-start', marginRight: 12 }}>
                            <TouchableOpacity style={{ borderWidth: 1, borderColor: '#1977F3', padding: 4, borderRadius: 23, }}
                                onPress={linkedinBtn}>
                                <Image
                                    source={require("../Assets/Icons/linken.png")}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ color: '#000', fontSize: 14, fontWeight: '400', fontFamily: 'AirbnbCereal_2'}}>Stay updated, connect, and engage with us on Linkedin.</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ContactUS

const styles = StyleSheet.create({})