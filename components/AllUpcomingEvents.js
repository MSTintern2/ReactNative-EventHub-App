import { StyleSheet, Text, View, TouchableOpacity, Image,FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import upcomingEventsInfo from '../database/UpcomingEventsInfo'
import UpcomingCard from './UpcomingCard';

const AllUpcomingEvents = () => {
    const navigation = useNavigation();

    return (
        <View style={{ paddingBottom: 120, backgroundColor: '#fff', flex:1 }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginVertical: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 24, }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("MenuDrawer")}>
                        <Image
                            style={{ height: 22, width: 22, marginRight: 13 }}
                            source={require("../Assets/Icons/EventsLeftArrow.png")}
                        />
                    </TouchableOpacity>
                    <Text style={{ color: '#120D26', fontSize: 24, fontWeight: '400',fontFamily: 'AirbnbCereal_M' }}>Upcoming Events</Text>
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
            <UpcomingCard />
        </View>
    )
}

export default AllUpcomingEvents

const styles = StyleSheet.create({})
