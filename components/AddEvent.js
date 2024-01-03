import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, Animated, TouchableHighlight, TextInput, Modal, Linking, Alert, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'
import LoginLoader from './LoginLoader';

const AddEvent = () => {
    const navigation = useNavigation();
    //activity loader
    const [visible, setVisible] = useState(false);
    //name
    const [eventName, setEventName] = useState('');
    //category
    const [eventCategory, setEventCategory] = useState('');
    const [sportBtnActive, setSportBtnActive] = useState(false);
    const [musicBtnActive, setMusicBtnActive] = useState(false);
    const [foodBtnActive, setFoodBtnActive] = useState(false);
    const [artBtnActive, setArtBtnActive] = useState(false);
    const SportBtn = () => {
        setEventCategory('Sport')
        setSportBtnActive(true)
        setMusicBtnActive(false)
        setFoodBtnActive(false)
        setArtBtnActive(false)
        // console.log(eventCategory)
    }
    const MusicBtn = () => {
        setEventCategory('Music')
        setSportBtnActive(false)
        setMusicBtnActive(true)
        setFoodBtnActive(false)
        setArtBtnActive(false)
        // console.log(eventCategory)
    }
    const FoodBtn = () => {
        setEventCategory('Food')
        setSportBtnActive(false)
        setMusicBtnActive(false)
        setFoodBtnActive(true)
        setArtBtnActive(false)
        // console.log(eventCategory)
    }
    const ArtBtn = () => {
        setEventCategory('Art')
        setSportBtnActive(false)
        setMusicBtnActive(false)
        setFoodBtnActive(false)
        setArtBtnActive(true)
        // console.log(eventCategory)
    }
    //event type
    // const [eventType, setEventType] = useState('');
    // const getEventType = () => {
    //     var date = new Date().getDate(); //Current Date
    //     var month = new Date().getMonth() + 1; //Current Month
    //     var year = new Date().getFullYear(); //Current Year
    //     let currentdate = (date + "-" + month + "-" + year)
    //     console.log(currentdate)
    //     const date1String = startingEventDate;
    //     const date2String = currentdate;
    //     const date1Components = date1String.split("-").map(Number);
    //     const date2Components = date2String.split("-").map(Number);
    //     const date1 = new Date(date1Components[2], date1Components[1] - 1, date1Components[0]);
    //     const date2 = new Date(date2Components[2], date2Components[1] - 1, date2Components[0]);
    //     const isDate1Greater = date1.getTime() > date2.getTime();
    //     const isDate1Equal = date1.getTime() === date2.getTime();
    //     const isDate1Smaller = date1.getTime() < date2.getTime();
    //     console.log("Date 1 is greater:", isDate1Greater);
    //     console.log("Date 1 is equal:", isDate1Equal);
    //     console.log("Date 1 is smaller:", isDate1Smaller);
    //     if (isDate1Greater) {
    //         setEventType("upcoming")// Render UI for date 1 being greater
    //     } else if (isDate1Smaller) {
    //         setEventType("past")// Render UI for dates being equal
    //     } else {
    //         setEventType("non")// Render UI for date 1 being smaller
    //     }
    //     console.log(eventType)
    // }
    //Center
    const [eventCenter, setEventCenter] = useState('');
    //Address
    const [eventAddress, setEventAddress] = useState('');
    //TicketPrice
    const [eventTicketPrice, setEventTicketPrice] = useState('');
    //About
    const [eventAbout, setEventAbout] = useState('');
    //Time picker
    const [isSTimePickerVisible, setSTimePickerVisibility] = useState(false);
    const [isETimePickerVisible, setETimePickerVisibility] = useState(false);
    const [startingTime, setStartingTime] = useState('00:00:00');
    const [endingTime, setEndingTime] = useState('00:00:00');
    const showSTimePicker = () => {
        setSTimePickerVisibility(true);
    };
    const hideSTimePicker = () => {
        setSTimePickerVisibility(false);
    };
    const handleSTimeConfirm = (time) => {
        // console.warn("A Time has been picked: ", time);
        const tm = new Date(time);
        const x = tm.toLocaleTimeString();
        // console.log(x)
        setStartingTime(x)
        hideSTimePicker();
    };
    const showETimePicker = () => {
        setETimePickerVisibility(true);
    };
    const hideETimePicker = () => {
        setETimePickerVisibility(false);
    };
    const handleETimeConfirm = (time) => {
        // console.warn("A Time has been picked: ", time);
        const tm = new Date(time);
        const x = tm.toLocaleTimeString();
        // console.log(x)
        setEndingTime(x)
        hideETimePicker();
    };
    //date , month picker
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [startingEventDate, setStartingEventDate] = useState('')
    const [eventMonth, setEventMonth] = useState('');
    const [startingDate, setStartingDate] = useState('')
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleDateConfirm = (date) => {
        // console.warn("A date has been picked: ", date); //obj
        const dt = new Date(date);
        const x = dt.toISOString().split("T"); //string , split by T
        const x1 = x[0].split("-");
        // console.log( day +' - '+ month +' - '+ year);
        // console.log(x1[2] + '-' + x1[1] + '-' + x1[0]);
        let SDate = (x1[2] + '-' + x1[1] + '-' + x1[0]);
        setStartingEventDate(SDate)
        setStartingDate(' : ' + SDate);
        hideDatePicker();
        // console.log(SDate)
        let month = SDate.slice(3, 5);
        // console.log(month)
        { month == 1 ? setEventMonth("Jan") : null }
        { month == 2 ? setEventMonth("Feb") : null }
        { month == 3 ? setEventMonth("Mar") : null }
        { month == 4 ? setEventMonth("Apr") : null }
        { month == 5 ? setEventMonth("May") : null }
        { month == 6 ? setEventMonth("Jun") : null }
        { month == 7 ? setEventMonth("Jul") : null }
        { month == 8 ? setEventMonth("Aug") : null }
        { month == 9 ? setEventMonth("Sep") : null }
        { month == 10 ? setEventMonth("Oct") : null }
        { month == 11 ? setEventMonth("Nov") : null }
        { month == 12 ? setEventMonth("Dec") : null }
    };
    //banner 
    const [show1, setShow1] = useState(false)
    const [profileImageData, setProfileImageData] = useState(null);
    const openCamera = async () => {
        const result = await launchCamera({ mediaType: 'photo' });
        setProfileImageData(result)
        // console.log(result)
    }
    const pickFromGallery = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo' });
        setProfileImageData(result)
        // console.log(result)
    }
    //upload Event Banner to firebase
    const [eventBanner, setEventBanner] = useState(null);
    const uploadProfileImage = async () => {
        setVisible(true)
        const reference = storage().ref(profileImageData.assets[0].fileName);
        const pathToFile = profileImageData.assets[0].uri;
        await reference.putFile(pathToFile);
        const url = await storage().ref(profileImageData.assets[0].fileName).getDownloadURL();
        setEventBanner(url)
        try {
            // console.log(url)
            // console.log(eventBanner)
        } catch (error) {
            console.log(error)
        }
        setProfileImageData(null)
        setVisible(false)
        setShow1(false)
        Alert.alert("Upload User Profile Image", "Your profile image uploaded.",
            [{ text: "Ok", onPress: async () => { } },]);
    }
    //get login user details from firebase
    useEffect(() => {
        getLoginUserData();
    }, []);
    const [organizerId, setOrganizerId] = useState('');
    const [organizerName, setOrganizerName] = useState('');
    const [organizerFollowers, setOrganizerFollowers] = useState('');
    const [organizerFollowing, setOrganizerFollowing] = useState('');
    const [organizerAbout, setOrganizerAbout] = useState('');
    const [organizerProfileImage, setOrganizerProfileImage] = useState('');
    const getLoginUserData = async () => {
        try {
            const myId = await AsyncStorage.getItem('USERID')
            // console.log(myId)
            const userData = await firestore().collection('users').doc(myId).get();
            setOrganizerId(userData._data.userId)
            setOrganizerName(userData._data.name)
            setOrganizerFollowers(userData._data.followers)
            setOrganizerFollowing(userData._data.following)
            setOrganizerAbout(userData._data.about)
            setOrganizerProfileImage(userData._data.profileImage)
            // console.log(userData._data.name)
        } catch (error) {
            console.log(error)
        }
    }
    //validations
    const [eventNameError, seteventNameError] = useState(false);
    const [eventCenterError, seteventCenterError] = useState(false);
    const [eventAddressError, seteventAddressError] = useState(false);
    const [eventCategoryError, seteventCategoryError] = useState(false);
    const [eventTicketPriceError, seteventTicketPriceError] = useState(false);
    const [eventAboutError, seteventAboutError] = useState(false);
    const [eventStartingTimeError, seteventStartingTimeError] = useState(false);
    const [eventEndingTimeError, seteventEndingTimeError] = useState(false);
    const [eventDateError, seteventDateError] = useState(false);
    const [eventBannerError, seteventBannerError] = useState(false);
    // add event to firebase
    const addEvent = async () => {
        { !eventName ? seteventNameError(true) : seteventNameError(false) }
        { !eventCenter ? seteventCenterError(true) : seteventCenterError(false) }
        { !eventAddress ? seteventAddressError(true) : seteventAddressError(false) }
        { !eventTicketPrice ? seteventTicketPriceError(true) : seteventTicketPriceError(false) }
        { !eventAbout ? seteventAboutError(true) : seteventAboutError(false) }
        { !eventCategory ? seteventCategoryError(true) : seteventCategoryError(false) }
        { !startingEventDate ? seteventDateError(true) : seteventDateError(false) }
        { startingTime == "00:00:00" ? seteventStartingTimeError(true) : seteventStartingTimeError(false) }
        { endingTime == "00:00:00" ? seteventEndingTimeError(true) : seteventEndingTimeError(false) }
        { !eventBanner ? seteventBannerError(true) : seteventBannerError(false) }
        if (!eventName || !eventCenter || !eventAddress || !eventTicketPrice || !eventAbout || !eventCategory || !startingEventDate || !startingTime || !endingTime || !eventBanner ) { return; }
        setVisible(true)
        const eventId = uuid.v4()
        firestore().collection('events').doc(eventId).set({
            eventId: eventId,
            eventName: eventName,
            eventCenter: eventCenter,
            eventAddress: eventAddress,
            eventCategory: eventCategory,
            eventTicketPrice: eventTicketPrice,
            eventAbout: eventAbout,
            eventStartingTime: startingTime,
            eventEndingTime: endingTime,
            eventDate: startingEventDate,
            eventMonth: eventMonth,
            eventBanner: eventBanner,
            eventOrganizerId: organizerId,
            eventOrganizerName: organizerName,
            eventOrganizerFollowers: organizerFollowers,
            eventOrganizerFollowing: organizerFollowing,
            eventOrganizerAbout: organizerAbout,
            eventOrganizerProfileImage: organizerProfileImage,
            eventLikes: [],
            eventGoing: [],
        })
            .then(
                res => {
                    setVisible(false)
                    Alert.alert('New Event', 'New Event created successfully.', [
                        { text: 'OK', onPress: () => navigation.goBack() },
                    ]);
                }
            )
            .catch(err => {
                console.log(err)
            });
    }
    //clear all
    const ClearAll = () => {
        setEventName('')
        setEventCategory('')
        setEventCenter('')
        setEventAddress('')
        setEventTicketPrice('')
        setEventAbout('')
        setStartingTime('00:00:00')
        setEndingTime('00:00:00')
        setStartingDate('')
        setEventBanner(null)
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
                    <Text style={{ color: '#fff', fontSize: 24, fontWeight: '400', fontFamily: 'AirbnbCereal_2' }}>Create New Event</Text>
                </View>
            </View>
            {/* body */}
            <ScrollView style={{ marginHorizontal: 24, }} showsVerticalScrollIndicator={false}>
                {/* name */}
                <Text style={{ color: '#120D26', fontSize: 18, fontWeight: '400', fontFamily: 'AirbnbCereal_M', marginTop: 10, }}>
                    Event Name:
                </Text>
                <View style={{ borderWidth: 1, borderColor: '#E4DFDF', borderRadius: 12, flexDirection: 'row', alignItems: 'center', marginTop: 2, }}>
                    <Image
                        style={{ height: 24, width: 24, marginLeft: 15 }}
                        source={require("../Assets/Icons/ename.png")}
                    />
                    <TextInput placeholder='Enter event name' placeholderTextColor="#747688"
                        multiline={true}
                        value={eventName}
                        onChangeText={(text) => setEventName(text)}
                        style={{ fontSize: 15, paddingLeft: 14, fontFamily: 'AirbnbCereal_2', lineHeight: 23, flex: 1 }}
                    />
                </View>
                {eventNameError ? <Text style={styles.error}>Please enter event name.</Text> : null}
                {/* starting time, ending time */}
                <View style={{ marginTop: 10, flexDirection: 'row', gap: 10 }}>
                    <TouchableOpacity
                        style={{ height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#5669FF', borderRadius: 12, elevation: 2, flex: 1, height: 55, }}
                        onPress={() => showSTimePicker()}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '400', fontFamily: 'AirbnbCereal_2' }}>
                            Starting Time
                        </Text>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '400', fontFamily: 'AirbnbCereal_2' }}>
                            {startingTime}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#5669FF', borderRadius: 12, flex: 1, height: 55, elevation: 2, }}
                        onPress={() => showETimePicker()}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '400', fontFamily: 'AirbnbCereal_2' }}>
                            Ending Time
                        </Text>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '400', fontFamily: 'AirbnbCereal_2' }}>
                            {endingTime}
                        </Text>
                    </TouchableOpacity>
                </View>
                {eventStartingTimeError ? <Text style={styles.error}>Please select event stating time.</Text> : null}
                {eventEndingTimeError ? <Text style={styles.error}>Please select event ending time.</Text> : null}
                {/* date */}
                <View style={{ marginTop: 10, flexDirection: 'row', gap: 10 }}>
                    <TouchableOpacity
                        style={{ height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#5669FF', borderRadius: 12, elevation: 2, flex: 1, height: 45, }}
                        onPress={() => showDatePicker()}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '400', fontFamily: 'AirbnbCereal_M' }}>
                                Event Date
                            </Text>
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '400', fontFamily: 'AirbnbCereal_M' }}>
                                {startingDate}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {eventDateError ? <Text style={styles.error}>Please select event date.</Text> : null}
                {
                    eventBanner != null ?
                        <Image
                            style={{ width: '100%', height: 200, resizeMode: 'center', marginTop: 10 }}
                            source={{ uri: eventBanner }}
                        />
                        : null
                }
                {/* Banner */}
                <View style={{ marginTop: 10, flexDirection: 'row', gap: 10 }}>
                    <TouchableOpacity
                        style={{ height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#5669FF', borderRadius: 12, elevation: 2, flex: 1, height: 45, }}
                        onPress={() => setShow1(true)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '400', fontFamily: 'AirbnbCereal_M' }}>
                                Event Banner
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {eventBannerError ? <Text style={styles.error}>Please select event banner.</Text> : null}
                {/* category */}
                <View style={{ flexDirection: 'row', gap: 10, }}>
                    <Text style={{ color: '#120D26', fontSize: 18, fontWeight: '400', fontFamily: 'AirbnbCereal_M', marginTop: 10, }}>
                        Event Category:
                    </Text>
                    <Text style={{ color: '#120D26', fontSize: 20, fontWeight: '400', fontFamily: 'AirbnbCereal_M', marginTop: 10, }}>
                        {eventCategory}
                    </Text>
                </View>
                <View style={{ marginTop: 2, flexDirection: 'row', gap: 10 }}>
                    <TouchableOpacity
                        style={[{ alignItems: 'center', justifyContent: 'center', borderRadius: 12, elevation: 2, flex: 1, height: 40, }, { backgroundColor: sportBtnActive ? '#5669FF' : '#949df5', }]}
                        onPress={() => SportBtn()}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '400', fontFamily: 'AirbnbCereal_2' }}>
                            Sport
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[{ alignItems: 'center', justifyContent: 'center', borderRadius: 12, elevation: 2, flex: 1, height: 40, }, { backgroundColor: musicBtnActive ? '#5669FF' : '#949df5', }]}
                        onPress={() => MusicBtn()}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '400', fontFamily: 'AirbnbCereal_2' }}>
                            Music
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[{ alignItems: 'center', justifyContent: 'center', borderRadius: 12, elevation: 2, flex: 1, height: 40, }, { backgroundColor: foodBtnActive ? '#5669FF' : '#949df5', }]}
                        onPress={() => FoodBtn()}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '400', fontFamily: 'AirbnbCereal_2' }}>
                            Food
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[{ alignItems: 'center', justifyContent: 'center', borderRadius: 12, elevation: 2, flex: 1, height: 40, }, { backgroundColor: artBtnActive ? '#5669FF' : '#949df5', }]}
                        onPress={() => ArtBtn()}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '400', fontFamily: 'AirbnbCereal_2' }}>
                            Art
                        </Text>
                    </TouchableOpacity>
                </View>
                {eventCategoryError ? <Text style={styles.error}>Please select event category.</Text> : null}
                {/* center */}
                <Text style={{ color: '#120D26', fontSize: 18, fontWeight: '400', fontFamily: 'AirbnbCereal_M', marginTop: 10, }}>
                    Event Center:
                </Text>
                <View style={{ borderWidth: 1, borderColor: '#E4DFDF', borderRadius: 12, flexDirection: 'row', alignItems: 'center', marginTop: 2, }}>
                    <Image
                        style={{ height: 24, width: 24, marginLeft: 15 }}
                        source={require("../Assets/Icons/evenue.png")}
                    />
                    <TextInput placeholder='Enter event center name' placeholderTextColor="#747688"
                        multiline={true}
                        value={eventCenter}
                        onChangeText={(text) => setEventCenter(text)}
                        style={{ fontSize: 15, paddingLeft: 14, fontFamily: 'AirbnbCereal_2', flex: 1 }}
                    />
                </View>
                {eventCenterError ? <Text style={styles.error}>Please enter event center.</Text> : null}
                {/* address */}
                <Text style={{ color: '#120D26', fontSize: 18, fontWeight: '400', fontFamily: 'AirbnbCereal_M', marginTop: 10, }}>
                    Event Address:
                </Text>
                <View style={{ borderWidth: 1, borderColor: '#E4DFDF', borderRadius: 12, flexDirection: 'row', alignItems: 'center', marginTop: 2, }}>
                    <Image
                        style={{ height: 22, width: 22, marginLeft: 15 }}
                        source={require("../Assets/Icons/ecenter.png")}
                    />
                    <TextInput placeholder='Enter event address' placeholderTextColor="#747688"
                        multiline={true}
                        value={eventAddress}
                        onChangeText={(text) => setEventAddress(text)}
                        style={{ fontSize: 15, paddingLeft: 14, fontFamily: 'AirbnbCereal_2', flex: 1 }}
                    />
                </View>
                {eventAddressError ? <Text style={styles.error}>Please enter event address.</Text> : null}
                {/* Ticket Price */}
                <Text style={{ color: '#120D26', fontSize: 18, fontWeight: '400', fontFamily: 'AirbnbCereal_M', marginTop: 10, }}>
                    Event Ticket Price:
                </Text>
                <View style={{ borderWidth: 1, borderColor: '#E4DFDF', borderRadius: 12, flexDirection: 'row', alignItems: 'center', marginTop: 2, }}>
                    <Image
                        style={{ height: 24, width: 24, marginLeft: 15 }}
                        source={require("../Assets/Icons/eprice.png")}
                    />
                    <TextInput placeholder='Enter event ticket price' placeholderTextColor="#747688"
                        keyboardType='number-pad' maxLength={3}
                        value={eventTicketPrice}
                        onChangeText={(text) => setEventTicketPrice(text)}
                        style={{ fontSize: 15, paddingLeft: 14, fontFamily: 'AirbnbCereal_2', flex: 1 }}
                    />
                </View>
                {eventTicketPriceError ? <Text style={styles.error}>Please enter event ticket price.</Text> : null}
                {/* About */}
                <Text style={{ color: '#120D26', fontSize: 18, fontWeight: '400', fontFamily: 'AirbnbCereal_M', marginTop: 10, }}>
                    Event About:
                </Text>
                <View style={{ borderWidth: 1, borderColor: '#E4DFDF', borderRadius: 12, flexDirection: 'row', alignItems: 'center', marginTop: 2, }}>
                    <Image
                        style={{ height: 24, width: 24, marginLeft: 15 }}
                        source={require("../Assets/Icons/eabout.png")}
                    />
                    <TextInput placeholder='Enter event about' placeholderTextColor="#747688"
                        multiline={true}
                        value={eventAbout}
                        onChangeText={(text) => setEventAbout(text)}
                        style={{ fontSize: 15, paddingLeft: 14, fontFamily: 'AirbnbCereal_2', flex: 1, marginRight: 10 }}
                    />
                </View>
                {eventAboutError ? <Text style={styles.error}>Please enter event about.</Text> : null}
                {/* cancel , add botton */}
                <View style={{ marginTop: 10, flexDirection: 'row', gap: 10, marginBottom: 10 }}>
                    <TouchableOpacity
                        style={{ height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fab1a0', borderRadius: 10, elevation: 2, flex: 1, height: 45, }}
                        onPress={() => navigation.goBack()}>
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: '600', fontFamily: 'AirbnbCereal_M' }}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#81ecec', borderRadius: 10, flex: 1, height: 45, elevation: 2, }}
                        onPress={() => addEvent()}>
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: '600', fontFamily: 'AirbnbCereal_M' }}>
                            Add
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* banner modal  */}
            <Modal transparent={true} visible={show1} animationType='slide'>
                <View style={{ backgroundColor: 'rgba(0,0,0,0.6)', flex: 1 }}>
                    <View style={{ backgroundColor: '#fff', marginHorizontal: 30, marginVertical: 50, borderRadius: 20, elevation: 3, padding: 14, }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', marginRight: 10, color: '#000', textAlign: "center", marginVertical: 10, fontFamily: 'Airbnb Cereal App' }}>
                            Profile Image
                        </Text>
                        {
                            profileImageData != null ?
                                <Image
                                    style={{ width: '100%', height: 200, resizeMode: 'center' }}
                                    source={{ uri: profileImageData.assets[0].uri }}
                                />
                                : null
                        }
                        <View style={{ marginTop: 10, }}>
                            <TouchableOpacity
                                style={{ backgroundColor: '#55efc4', padding: 16, borderRadius: 14, elevation: 2 }}
                                onPress={() => openCamera()}>
                                <Text style={{ fontSize: 18, fontWeight: '600', textAlign: 'center', color: '#000', fontFamily: 'Airbnb Cereal App' }}>Open Camera</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 10, }}>
                            <TouchableOpacity
                                style={{ backgroundColor: '#55efc4', padding: 16, borderRadius: 14, elevation: 2 }}
                                onPress={() => pickFromGallery()}>
                                <Text style={{ fontSize: 18, fontWeight: '600', textAlign: 'center', color: '#000', fontFamily: 'Airbnb Cereal App' }}>Pick from Gallery</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, gap: 10, }}>
                            <TouchableOpacity style={{ backgroundColor: '#fab1a0', flex: 1, padding: 16, borderRadius: 14, elevation: 2 }}
                                onPress={() => { setShow1(false), setProfileImageData(null) }}>
                                <Text style={{ fontSize: 18, fontWeight: '600', textAlign: 'center', color: '#000', fontFamily: 'Airbnb Cereal App' }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: '#81ecec', flex: 1, padding: 16, borderRadius: 14, elevation: 2 }}
                                onPress={uploadProfileImage}>
                                <Text style={{ fontSize: 18, fontWeight: '600', textAlign: 'center', color: '#000', fontFamily: 'Airbnb Cereal App' }}>Upload</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* date modal */}
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
            />
            {/* starting time modal */}
            <DateTimePickerModal
                isVisible={isSTimePickerVisible}
                mode="time"
                onConfirm={handleSTimeConfirm}
                onCancel={hideSTimePicker}
            />
            {/* ending time modal */}
            <DateTimePickerModal
                isVisible={isETimePickerVisible}
                mode="time"
                onConfirm={handleETimeConfirm}
                onCancel={hideETimePicker}
            />
            {/* activity loader */}
            <LoginLoader visible={visible} />
        </View>
    )
}

export default AddEvent

const styles = StyleSheet.create({
    error: {
        color: 'red',
        marginTop: 2,
        fontFamily: 'AirbnbCereal_M'
    },
})