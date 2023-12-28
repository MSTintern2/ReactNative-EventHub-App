import { Image, StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, TouchableOpacity, TouchableHighlight, Modal, Button, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore, { firebase } from '@react-native-firebase/firestore';

const SportHome = () => {
    const navigation = useNavigation();
    //get events from firestore 
    useEffect(() => {
        getAllEvents();
    }, []);
    const [allEvents, setAllEvents] = useState("")
    const getAllEvents = async () => {
        try {
            // setVisible(true)
            let tempAllEventsData = [];
            firestore().collection('events').where("eventCategory", "==", "Sport").get()
                .then(
                    res => {
                        if (res.docs != []) {
                            res.docs.map(item => {
                                tempAllEventsData.push(item.data())
                            })
                            setAllEvents(tempAllEventsData);
                        }
                        // setVisible(false)
                    });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View>
            {/* Heading */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 24, marginTop: 24 }}>
                <Text style={styles.heading}>Sport Events</Text>
                {/* <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={() => navigation.navigate("AllUpcomingEvents")}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ color: '#747688', fontSize: 14, fontStyle: 'normal', fontWeight: '400', lineHeight: 23, fontFamily: 'AirbnbCereal_2' }}>See All</Text>
                        <Image
                            style={{ marginLeft: 3 }}
                            source={require("../Assets/Icons/SeeAllArrow.png")}
                        />
                    </View>
                </TouchableHighlight> */}
            </View>
            {/* events Card */}
            <View>
                {
                    allEvents.length ?
                        <FlatList
                            horizontal={true}
                            keyExtractor={item => item.eventId}
                            showsHorizontalScrollIndicator={false}
                            data={allEvents}
                            renderItem={({ item, index }) =>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("EventDetails", { item: item })}
                                    style={styles.eventCardContainer}
                                >
                                    <Image
                                        style={{ width: 217, height: 140, resizeMode: 'cover', borderRadius: 10, }}
                                        source={{ uri: item.eventBanner }}
                                    />
                                    <View style={styles.eventDateContainer}>
                                        <View style={styles.dateContainer}>
                                            <Text style={{ color: '#F0635A', fontSize: 18, fontWeight: '400', textTransform: 'uppercase', fontFamily: 'AirbnbCereal_M' }}>{item.eventDate.slice(0, 2)}</Text>
                                            <Text style={{ color: '#F0635A', fontSize: 12, fontWeight: '400', textTransform: 'uppercase', fontFamily: 'AirbnbCereal_M' }}>{item.eventMonth}</Text>
                                        </View>
                                        <TouchableOpacity style={styles.bookmarkContainer}
                                            onPress={() => { addBookmark(item, index) }}>
                                            {/* onPress={()=>{setEventData(item.name)}} */}
                                            {/* onPressIn={addBookmark} */}
                                            {/* // onPress={setEventData(item.name)}
                                    // onPressIn={setData} */}
                                            <Image
                                                source={require("../Assets/Icons/EventBookmark.png")}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <View>
                                            <View style={{ marginLeft: 7, marginRight: 17, marginTop: 10, }}>
                                                <Text style={{ color: '#000', fontSize: 18, fontWeight: '400', fontFamily: 'AirbnbCereal_M' }} numberOfLines={1}>{item.eventName}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 7, marginTop: 10 }}>
                                                <Image
                                                    style={{ marginRight: 5, height: 22, width: 22 }}
                                                    source={require("../Assets/Icons/EventDetailsCalendar.png")}
                                                />
                                                <Text style={{ color: '#5669FF', fontSize: 13, fontWeight: '400', textTransform: 'uppercase', fontFamily: 'AirbnbCereal_M' }}>
                                                    {item.eventDate} {item.eventStartingTime}
                                                </Text>
                                                {/* <View style={{ height: 24, flexDirection: 'row', width: 70 }}>
                                            <View style={{ position: 'absolute', zIndex: 3, }}>
                                                <Image style={{ width: 24, height: 24, borderRadius: 24, borderColor: '#fff', borderWidth: 1 }} source={item.going1} />
                                            </View>
                                            <View style={{ position: 'absolute', left: 16, zIndex: 2, }}>
                                                <Image style={{ width: 24, height: 24, borderRadius: 24, borderColor: '#fff', borderWidth: 1 }} source={item.going2} />
                                            </View>
                                            <View style={{ position: 'absolute', left: 32, zIndex: 1, }}>
                                                <Image style={{ width: 24, height: 24, borderRadius: 24, borderColor: '#fff', borderWidth: 1 }} source={item.going3} />
                                            </View>
                                        </View> */}
                                                {/* <View>
                                            <Text style={{ color: '#3F38DD', fontSize: 12, fontWeight: '500', lineHeight: 19.23, fontFamily: 'AirbnbCereal_M' }}>{item.howManyGoing}</Text>
                                        </View> */}
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 7, marginTop: 10, marginBottom: 8 }}>
                                                <Image
                                                    style={{ opacity: 0.4, marginRight: 5 }}
                                                    source={require("../Assets/Icons/LocationTabBar.png")}
                                                />
                                                <Text style={{ color: '#2B2849', fontSize: 13, fontWeight: '400', fontFamily: 'AirbnbCereal_2' }}>{item.eventAddress}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }
                        />
                        :
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10, marginHorizontal: 24 }}>
                            <Image
                                style={{ height: 75, width: 75, }}
                                source={require("../Assets/Others/NoEvents.png")}
                            />
                            <Text style={{ marginTop: 10, color: '#120D26', fontSize: 24, fontWeight: '500', lineHeight: 34, textAlign: 'center', fontFamily: 'AirbnbCereal_M', }}>
                                No Sport Events
                            </Text>
                            <Text style={{ marginTop: 7, color: '#747688', fontSize: 16, fontWeight: '400', lineHeight: 25, textAlign: 'center', opacity: 0.7, fontFamily: 'AirbnbCereal_2', }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor
                            </Text>
                        </View>
                }
            </View>
        </View>
    )
}

export default SportHome

const styles = StyleSheet.create({
    heading: {
        color: '#120D26',
        fontSize: 22,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 34,
        fontFamily: 'AirbnbCereal_M'
    },
    eventCardContainer: {
        padding: 10,
        // height: 255,
        width: 237,
        backgroundColor: '#fff',
        borderRadius: 18,
        marginLeft: 24,
        marginTop: 4,
        marginBottom: 4,
        shadowColor: '#000000',
        elevation: 3,
        shadowOpacity: 1,
    },
    eventDateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 200,
        position: 'absolute',
        top: 16,
        right: 18,
    },
    dateContainer: {
        height: 45,
        width: 45,
        backgroundColor: 'rgba(255, 255, 255, 0.70)',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookmarkContainer: {
        height: 30,
        width: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.70)',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
})