import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AllEvents = () => {
    const navigation = useNavigation();
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
        <View style={{ paddingBottom: 120, backgroundColor: '#fff', flex: 1 }}>
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
                    <Text style={{ color: '#120D26', fontSize: 24, fontWeight: '400',fontFamily: 'AirbnbCereal_M' }}>Events</Text>
                </View>
                <View style={{ flexDirection: 'row', }}>
                    {/* <TouchableOpacity style={{ marginRight: 16, }}
                    onPress={() => navigation.navigate("Search")}>
                        <View style={{ height: 22, width: 22, }}>
                            <Image
                                style={{ height: 22, width: 22, }}
                                source={require("../Assets/Icons/EventsSearch.png")}
                            />
                        </View>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={{ marginRight: 20, }}>
                        <View style={{ height: 22, width: 22, }}>
                            <Image
                                style={{ height: 22, width: 22, }}
                                source={require("../Assets/Icons/EventsMoreIcon.png")}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {/* list */}
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
                                        source={{uri: item.eventBanner}}
                                    />
                                    <View style={{ marginRight: 27 }}>
                                        <Text style={{ color: '#5669FF', fontSize: 12, fontWeight: '400', textTransform: 'uppercase',fontFamily: 'AirbnbCereal_M' }}>
                                            {item.eventDate} {item.eventStartingTime}
                                        </Text>
                                        <Text style={{ width: 193, color: '#120D26', fontSize: 18, fontWeight: '400', lineHeight: 25, textAlign: 'auto',fontFamily: 'AirbnbCereal_M' }}>
                                            {item.eventName}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                />
            </View>
        </View>
    )
}

export default AllEvents

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