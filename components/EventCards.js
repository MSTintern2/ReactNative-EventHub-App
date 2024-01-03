import { FlatList, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TouchableHighlight, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import upcomingEventsInfo from '../database/UpcomingEventsInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { Timestamp } from 'firebase/firestore';

const EventCards = (props) => {
    const navigation = useNavigation();
    let currentDate;
    //activity loader
    const [visible, setVisible] = useState(false);
    //add bookmark data
    const [onPressBookmark, setOnPressBookmark] = useState(false);
    const addBookmark = async (item, index) => {
        const myId = await AsyncStorage.getItem('USERID')
        const bookmark = await firestore().collection('users').doc(myId).get();
        // console.log(bookmarks._data.bookmarks);
        let tempBook = [];
        tempBook = bookmark._data.bookmarks;
        // console.log(tempBook);
        if (tempBook.length > 0) {
            let existing = false;
            tempBook.map(itm => {
                if (itm.id == item.id) {
                    existing = true;
                    tempBook.splice(index, 1);
                    firestore().collection('users').doc(myId).update({
                        bookmarks: tempBook,
                    })
                    setOnPressBookmark(false)
                }
            });
            if (existing == false) {
                tempBook.push(item);
                setOnPressBookmark(true)
            }
        } else {
            tempBook.push(item);
            setOnPressBookmark(true)
        }
        // console.log(tempBook);
        firestore().collection('users').doc(myId).update({
            bookmarks: tempBook,
        })
    }
    //get bookmark data
    // const getBookmarks = async () => {
    //     const myId = await AsyncStorage.getItem('USERID')
    //     console.log("my ID------" + myId)
    //     const bookmarkssss = await firestore().collection('users').doc(myId).get()
    //     console.log(bookmarkssss._data.bookmarks)
    //     const bookmarksArray = bookmarkssss._data.bookmarks;
    //     const eventIds = bookmarksArray.map((bookmark) => bookmark.eventId);
    //     console.log("Event IDs:", eventIds);
    // }
    //get events from firebase
    useEffect(() => {
        getAllEvents();
        // checkBookmark()
    }, []);
    //get bookmark status & bookmark function
    // const [bookmarkStatus, setBookmarkStatus] = useState(false);
    // const [onBookmarkPress, setOnBookmarkPress] = useState(false);
    // const onBookmark = async (eventId) => {
    //     const myId = await AsyncStorage.getItem('USERID')
    //     console.log("my id--------" + myId)
    //     console.log("event id--------" + eventId)
    //     const books = await firestore().collection('users').doc(myId).get();
    //     console.log("bookmarks--------" + books._data.bookmarks)
    //     let tempBookmark = books._data.bookmarks;

    //     if (tempBookmark.length > 0) {
    //         tempBookmark.map(item1 => {
    //             if (item1 == eventId) {
    //                 const index = tempBookmark.indexOf(item1);
    //                 if (index > -1) {
    //                     tempBookmark.splice(index, 1);
    //                     // setLikeStatus(false)
    //                 }
    //             } else {
    //                 tempBookmark.push({ myId: myId, eventId: eventId });
    //                 // setLikeStatus(true)
    //             }
    //         })
    //     } else {
    //         tempBookmark.push({ myId: myId, eventId: eventId });
    //         // setLikeStatus(true)
    //     }
    //     await firestore().collection('users').doc(myId).update({
    //         bookmarks: tempBookmark,
    //     })
    //         .then(() => {
    //             console.log("event updates")
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }

    const [allEvents, setAllEvents] = useState("")
    const getAllEvents = async () => {
        try {
            setVisible(true)
            let tempAllEventsData = [];
            currentDate = getCurrentDate()
            // firestore().collection('events').get()
            firestore().collection('events').where("eventDate", ">=", currentDate).get()
                .then(
                    res => {
                        if (res.docs != []) {
                            res.docs.map(item => {
                                tempAllEventsData.push(item.data())
                            })
                            setAllEvents(tempAllEventsData);
                        }
                        setVisible(false)
                        // console.log(allEvents);
                        // console.log(JSON.stringify(res.docs[0].data().eventDate));
                    });
        } catch (error) {
            console.log(error)
        }
    }
    // get currnet date
    // const getCurrentDate = () => {
    //     var date = new Date().getDate(); //Current Date
    //     var month = new Date().getMonth() + 1; //Current Month
    //     var year = new Date().getFullYear(); //Current Year
    //     let currentdate = (date + "-" + month + "-" + year)
    //     // console.log("get current date ----------------" + currentdate)
    //     return currentdate;
    // }
    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        // console.log(`${day}-${month}-${year}`);
        return `${day}-${month}-${year}`;
    }

    return (
        <View>
            <View>
                {
                    allEvents.length ?
                        //events > 0
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
                                        {/* <TouchableOpacity style={[styles.bookmarkContainer, { backgroundColor: onPressBookmark ? '#5669FF' : 'rgba(255, 255, 255, 0.70)' }]}
                                    onPress={() => addBookmark(item, index)}>
                                    <Image
                                        style={{ tintColor: onPressBookmark ? "#fff" : "#F0635A" }}
                                        source={require("../Assets/Icons/EventBookmark.png")}
                                    />
                                </TouchableOpacity> */}
                                    </View>
                                    <View>
                                        <View>
                                            <View style={{ marginLeft: 7, marginRight: 17, marginTop: 10, }}>
                                                <Text style={{ color: '#000', fontSize: 18, fontWeight: '400', fontFamily: 'AirbnbCereal_M' }} numberOfLines={1}>{item.eventName}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 7, marginTop: 8 }}>
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
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 7, marginTop: 8, marginBottom: 8 }}>
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
                        //events < 0
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10, marginHorizontal: 24 }}>
                            <Image
                                style={{ height: 75, width: 75, }}
                                source={require("../Assets/Others/NoEvents.png")}
                            />
                            <Text style={{ marginTop: 10, color: '#120D26', fontSize: 24, fontWeight: '500', lineHeight: 34, textAlign: 'center', fontFamily: 'AirbnbCereal_M', }}>
                                No Upcoming Events
                            </Text>
                            <Text style={{ marginTop: 7, color: '#747688', fontSize: 16, fontWeight: '400', lineHeight: 25, textAlign: 'center', opacity: 0.7, fontFamily: 'AirbnbCereal_2', marginBottom: 10, }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor
                            </Text>
                        </View>
                }
            </View>
        </View>
    )
}

export default EventCards

const styles = StyleSheet.create({
    eventCardContainer: {
        padding: 10,
        // height: 255,
        width: 237,
        backgroundColor: '#fff',
        borderRadius: 18,
        marginLeft: 24,
        marginTop: 10,
        marginBottom: 29,
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
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
})