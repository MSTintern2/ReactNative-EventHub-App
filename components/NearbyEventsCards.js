import { FlatList, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import upcomingEventsInfo from '../database/UpcomingEventsInfo';
import firestore from '@react-native-firebase/firestore';

const NearbyEventsCards = () => {
    const navigation = useNavigation();
    //activity loader
    const [visible, setVisible] = useState(false);
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
            firestore().collection('events').limit(3).get()
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
        <View>
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
        </View>
    )
}

export default NearbyEventsCards

const styles = StyleSheet.create({
    nearbyEventCard: {
        backgroundColor: '#fff',
        marginHorizontal: 24,
        borderRadius: 16,
        shadowColor: '#000000',
        elevation: 1,
        shadowOpacity: 1,
        marginBottom: 16,
    },
})