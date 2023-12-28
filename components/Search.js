import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, TextInput, Modal } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import upcomingEventsInfo from '../database/UpcomingEventsInfo';
import Filter from './Filter';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Search = () => {
    const navigation = useNavigation();
    const [show, setShow] = useState(false)
    //get enterd text from textinput
    const [onSearch, setOnSearch] = useState(false);
    const [typedText, setTypedText] = useState('');
    // console.log(typedText)
    const [filterEvents, setFilterEvents] = useState('');
    const searchEvents = (text) => {
        setTypedText(text);
        const filteredEvents = allEvents.filter((event) => event.eventName.toLowerCase().includes(text.toLowerCase()));
        setFilterEvents(filteredEvents);
    };
    //get events from firebase
    const [allEvents, setAllEvents] = useState("")
    useEffect(() => {
        getAllEvents();
    }, []);
    const getAllEvents = async () => {
        try {
            // setVisible(true)
            let tempAllEventsData = [];
            // const events = await AsyncStorage.getItem('EMAIL');
            firestore().collection('events').get()
                .then(
                    res => {
                        if (res.docs != []) {
                            res.docs.map(item => {
                                tempAllEventsData.push(item.data())
                            })
                        }
                        setAllEvents(tempAllEventsData);
                        // setVisible(false)
                        // console.log(allEvents);
                        // console.log(JSON.stringify(res.docs[0].data()));
                    });

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={[{ paddingBottom: 250, backgroundColor: '#fff', flex: 1 }, show ? { backgroundColor: 'rgba(0, 0, 0, 0.5)' } : null]}>
            {/* Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginVertical: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 24, }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}>
                        <Image
                            style={{ height: 22, width: 22, marginRight: 13 }}
                            source={require("../Assets/Icons/EventsLeftArrow.png")}
                        />
                    </TouchableOpacity>
                    <Text style={{ color: '#120D26', fontSize: 24, fontWeight: '400', fontFamily: 'AirbnbCereal_M' }}>Search</Text>
                </View>
            </View>
            {/* Search */}
            <View style={styles.searchFilterContainer}>
                <View style={styles.searchContainer}>
                    <View>
                        <Image
                            style={styles.searchIcon}
                            source={require("../Assets/Icons/SearchSearchIcon.png")}
                        />
                    </View>
                    <View style={styles.searchLine}></View>
                    <TextInput placeholder='Search...' style={styles.searchTextInput} placeholderTextColor="#000"
                        onChangeText={(text) => { setOnSearch(true), searchEvents(text) }}
                    />
                </View>
                {/* filter  */}
                {/* <View style={styles.filterContainer}>
                    <TouchableOpacity style={styles.filterButton}
                        onPress={() => setShow(true)}>
                        <View style={styles.filterInside}>
                            <Image
                                style={styles.filterIcon}
                                source={require("../Assets/Icons/SearcgFilterIcon.png")}
                            />
                            <Text style={styles.filterText}>Filters</Text>
                        </View>
                    </TouchableOpacity>
                </View> */}
            </View>
            {/* list */}
            <View style={{ height:700}}>
                {
                    filterEvents.length === 0
                        ?
                        <FlatList
                            data={allEvents}
                            renderItem={({ item }) =>
                                <View style={styles.nearbyEventCard}>
                                    <TouchableOpacity style={{}}
                                        onPress={() => navigation.navigate("EventDetails", { item: item })}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 7, }}>
                                            <Image
                                                style={{ height: 105, width: 105, borderRadius: 12, marginRight: 16, }}
                                                source={{ uri: item.eventBanner }}
                                            />
                                            <View style={{ marginRight: 27 }}>
                                                <Text style={{ color: '#5669FF', fontSize: 12, fontWeight: '400', textTransform: 'uppercase', fontFamily: 'AirbnbCereal_M' }}>
                                                    {item.eventDate} {item.eventStartingTime}
                                                </Text>
                                                <Text style={{ width: 193, color: '#120D26', fontSize: 18, fontWeight: '400', lineHeight: 25, textAlign: 'auto', fontFamily: 'AirbnbCereal_M' }}>
                                                    {item.eventName}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                        :
                        <FlatList
                            data={filterEvents}
                            renderItem={({ item }) =>
                                <View style={styles.nearbyEventCard}>
                                    <TouchableOpacity style={{}}
                                        onPress={() => navigation.navigate("EventDetails", { item: item })}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 7, }}>
                                            <Image
                                                style={{ height: 105, width: 105, borderRadius: 12, marginRight: 16, }}
                                                source={{ uri: item.eventBanner }}
                                            />
                                            <View style={{ marginRight: 27 }}>
                                                <Text style={{ color: '#5669FF', fontSize: 12, fontWeight: '400', textTransform: 'uppercase', fontFamily: 'AirbnbCereal_M' }}>
                                                    {item.eventDate} {item.eventStartingTime}
                                                </Text>
                                                <Text style={{ width: 193, color: '#120D26', fontSize: 18, fontWeight: '400', lineHeight: 25, textAlign: 'auto', fontFamily: 'AirbnbCereal_M' }}>
                                                    {item.eventName}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                }
            </View>
            {/* Filter Modal */}
            {/* <Modal transparent={true} visible={show} animationType='slide'>
                <View style={{ backgroundColor: '#fff', flex: 1, marginTop: 71, borderTopRightRadius: 38, borderTopLeftRadius: 38 }}>
                    <View style={{ height: 5, width: 26, backgroundColor: 'rgba(178, 178, 178, 0.5)', marginTop: 12, borderRadius: 2.5, alignSelf: 'center' }}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 24, marginTop: 17, }}>
                        <TouchableOpacity
                            onPress={() => setShow(false)}>
                            <Image source={require("../Assets/Icons/LeftArrow.png")} />
                        </TouchableOpacity>
                        <Text style={{ color: '#120D26', fontSize: 24, fontWeight: '500', marginLeft: 10, fontFamily: 'AirbnbCereal_M' }}>
                            Filter
                        </Text>
                    </View>
                    <Filter />
                </View>
            </Modal> */}
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    nearbyEventCard: {
        backgroundColor: '#fff',
        marginHorizontal: 24,
        borderRadius: 16,
        shadowColor: '#000000',
        elevation: 3,
        shadowOpacity: 1,
        marginBottom: 16,
    },
    searchFilterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 24,
        justifyContent: 'space-between',
        marginTop: 1,
        marginBottom: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchIcon: {
        height: 24,
        width: 24,
        tintColor: '#747688'
    },
    searchLine: {
        width: 1,
        height: 20,
        marginLeft: 10,
        backgroundColor: '#747688'
    },
    searchTextInput: {
        marginLeft: 7,
        color: '#000000',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '300',
        opacity: 0.3,

    },
    filterContainer: {
        width: 75,
        height: 32,
        backgroundColor: '#5c56ee',
        borderRadius: 100,
    },
    filterButton: {
        fontFamily: 'AirbnbCereal_M'
    },
    filterInside: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterIcon: {
        width: 24,
        height: 24,
        marginRight: 3.7,
        marginTop: 4.06,
        marginBottom: 4.33,
        marginLeft: 4.29,
    },
    filterText: {
        color: '#ECEBFC',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
    },
})