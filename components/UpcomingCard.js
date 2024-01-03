import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { getFirestore, query, where, orderBy, startAt, getDocs, collection } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import upcomingEventsInfo from '../database/UpcomingEventsInfo'
import LoginLoader from './LoginLoader';

const UpcomingCard = () => {
    let currentDate;
    const navigation = useNavigation();
    //activity loader
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        getAllEvents();
        // compare()
    }, []);
    const [allEvents, setAllEvents] = useState("")
    const getAllEvents = async () => {
        try {
            setVisible(true)
            let tempAllEventsData = [];
            currentDate = getCurrentDate()
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
        }
        catch (error) {
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
        <View style={{ paddingTop: 14, backgroundColor: '#fff', flex: 1 }}>
            <View>
                {
                    allEvents.length ?
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
                                                <Text style={{ color: '#5669FF', fontSize: 12, fontWeight: '400', textTransform: 'uppercase', fontFamily: 'AirbnbCereal_M', }}>
                                                    {item.eventDate} {item.eventStartingTime}
                                                </Text>
                                                <Text style={{ width: 193, color: '#120D26', fontSize: 18, fontWeight: '400', lineHeight: 25, textAlign: 'auto', fontFamily: 'AirbnbCereal_M', }}>
                                                    {item.eventName}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                        :
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 150, marginHorizontal: 24 }}>
                            <Image
                                style={{ height: 169, width: 156, }}
                                source={require("../Assets/Others/NoEvents.png")}
                            />
                            <Text style={{ marginTop: 40, color: '#120D26', fontSize: 24, fontWeight: '500', lineHeight: 34, textAlign: 'center', fontFamily: 'AirbnbCereal_M', }}>
                                No Upcoming Events
                            </Text>
                            <Text style={{ marginTop: 7, color: '#747688', fontSize: 16, fontWeight: '400', lineHeight: 25, textAlign: 'center', opacity: 0.7, fontFamily: 'AirbnbCereal_2', }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor
                            </Text>
                        </View>
                }
            </View>
            {/* activity loader */}
            <LoginLoader visible={visible} />
        </View>
    )
}

export default UpcomingCard

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