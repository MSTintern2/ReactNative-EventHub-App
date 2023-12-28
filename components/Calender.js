import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import Calendar from 'react-native-calendars/src/calendar';
import firestore from '@react-native-firebase/firestore';
// import moment from 'moment';

const Calender = () => {
    const navigation = useNavigation();
    //pick date to see events
    const [selected, setSelected] = useState("");
    console.log('selectedDate-------------------', selected);
    const calendarDate = selected;
    const year = calendarDate.slice(0, 4);
    const month = calendarDate.slice(5, 7);
    const day = calendarDate.slice(8);
    const formattedDate = `${day}-${month}-${year}`;
    console.log('formattedDate-------------------', formattedDate);
    //get events from firebase
    const [allEvents, setAllEvents] = useState("")
    useEffect(() => {
        getAllEvents();
    }, [formattedDate]);
    const getAllEvents = async () => {
        try {
            // setVisible(true)
            let date = formattedDate;
            console.log("in get all events -----------" + date)
            let tempAllEventsData = [];
            firestore().collection('events').where('eventDate', '==', date).get()
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

    const [eventDates, setEventDates] = useState([]);
    console.log(eventDates)
    useEffect(() => {
        const db = firestore();
        const eventsRef = db.collection('events');
        eventsRef.get().then((querySnapshot) => {
            const dates = [];
            querySnapshot.forEach((doc) => {
                dates.push(doc.data().eventDate);
            });
            setEventDates(dates);
        })
    }, []);
    function convertDates(dates) {
        const formattedDates = dates.map((date) => {
            // Split the date string, convert to integers, and format
            const [day, month, year] = date.split("-").map(Number);
            const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            return formattedDate;
        });

        return formattedDates;
    }
    const formattedDates = convertDates(eventDates);
    console.log(formattedDates)
    // let fd= JSON.stringify(formattedDates);
    // console.log(fd)
    const edates = formattedDates.map((date) => ({
        [date]: { selected: true, selectedColor: 'red',marked: true, },
    }));
    console.log(edates)
    // const event = ['2023-12-16']
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
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
                    <Text style={{ color: '#120D26', fontSize: 24, fontWeight: '400', fontFamily: 'AirbnbCereal_M' }}>Calender</Text>
                </View>
            </View>
            {/* Body */}
            <View style={{ marginTop: 0, }}>
                <Calendar
                    hideExtraDays={true}
                    style={{}}
                    theme={{
                        backgroundColor: '#ffffff',
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: '#5669FF',
                        dayTextColor: '#2d4150',
                        todayTextColor: '#fff',
                        todayBackgroundColor: '#5669FF'
                    }}
                    markedDates={{
                        [selected]: { selected: true, selectedColor: 'lightblue' },
                        // [event]: { selected: true, selectedColor: 'lightgreen', marked: true, dotColor: 'red', }
                        // [formattedDates]: { selected: true, selectedColor: 'lightgreen', marked: true, dotColor: 'red', }
                    }}
                    // markedDates={edates}
                    onDayPress={day => {
                        setSelected(day.dateString)
                    }}
                />
            </View>
            {/* indicator */}
            <View style={{ flexDirection: 'row', gap: 10, justifyContent: "center" }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#5669FF', width: 20, height: 20, borderRadius: 15 }}></View>
                    <Text style={{ marginLeft: 5, fontSize: 14, color: '#000', fontFamily: 'AirbnbCereal_2' }}>Current Date</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: '#000', }}>
                    <View style={{ backgroundColor: 'lightblue', width: 20, height: 20, borderRadius: 15 }}></View>
                    <Text style={{ marginLeft: 5, fontSize: 14, color: '#000', fontFamily: 'AirbnbCereal_2' }}>Selected Date</Text>
                </View>
                {/* <View style={{ flexDirection: 'row', alignItems: '#000', }}>
                    <View style={{ backgroundColor: 'lightgreen', width: 20, height: 20, borderRadius: 15, alignItems: 'center', justifyContent: "flex-end" }}></View>
                    <Text style={{ marginLeft: 5, fontSize: 14, color: '#000', fontFamily: 'AirbnbCereal_2' }}>Event Date</Text>
                </View> */}
            </View>
            {/* events list */}
            <View style={{ marginTop: 10, }}>
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
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 60, marginHorizontal: 24 }}>
                            <Image
                                style={{ height: 100, width: 100, }}
                                source={require("../Assets/Others/NoEvents.png")}
                            />
                            <Text style={{ marginTop: 40, color: '#120D26', fontSize: 24, fontWeight: '500', lineHeight: 34, textAlign: 'center', fontFamily: 'AirbnbCereal_M', }}>
                                No Event on this Date
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

export default Calender

const styles = StyleSheet.create({
    nearbyEventCard: {
        backgroundColor: '#fff',
        marginHorizontal: 24,
        borderRadius: 16,
        shadowColor: '#000000',
        elevation: 5,
        shadowOpacity: 1,
        marginBottom: 16,
    },
})