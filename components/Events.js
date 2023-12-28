import { StyleSheet, Text, View, TouchableOpacity, Image, } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import PastEvents from './PastEvents';
import UpcomingCard from './UpcomingCard';
import BottomTab from './BottomTab';

const Events = () => {
    const navigation = useNavigation();
    const Tab = createMaterialTopTabNavigator();
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
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
                    <Text style={{ color: '#120D26', fontSize: 24, fontWeight: '400',fontFamily: 'AirbnbCereal_M' }}>Events</Text>
                </View>
                <View style={{ flexDirection: 'row', }}>
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
            {/* Top tab Navigation */}
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: "#5669FF",
                    labelStyle: {
                        textTransform: "uppercase",
                    },
                    inactiveTintColor: '#9B9B9B',
                    indicatorStyle: {
                        height: null,
                        top: '10%',
                        bottom: '10%',
                        width: '46%',
                        left: '2%',
                        borderRadius: 100,
                        backgroundColor: "#fff",
                        elevation:5,
                        fontSize: 15,
                        fontWeight: '400',
                        fontFamily: 'AirbnbCereal_M',
                    },
                    style: {
                        alignSelf: "center",
                        width: '80%',
                        borderRadius: 100,
                        borderColor: "#fff",
                        backgroundColor: "#f5f5f5",
                        elevation: 2, 
                        shadowOpacity: .10,
                        shadowRadius: 4,
                    },
                    tabStyle: {
                        borderRadius: 100,
                    },
                }}
                swipeEnabled={true}
            >
                <Tab.Screen name="Upcoming" component={UpcomingCard} />
                <Tab.Screen name="Past Events" component={PastEvents} />
            </Tab.Navigator>
            {/* Event Button */}
            <View style={{ justifyContent: 'flex-end' }}>
                <View style={{ marginHorizontal: 52, marginBottom: 23, }}>
                    <TouchableOpacity style={{ backgroundColor: '#5669FF', height: 58, borderRadius: 15, justifyContent: 'center', alignItems: 'center', shadowColor: '#000000', elevation: 1, shadowOpacity: 1, }}
                        onPress={() => navigation.navigate("AllEvents")}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '400', letterSpacing: 1, textTransform: 'uppercase',fontFamily: 'AirbnbCereal_M', }}>Explore Events</Text>
                            <View style={{ height: 30, width: 30, backgroundColor: '#3D56F0', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginLeft: 22 }}>
                                <Image
                                    style={{ height: 18, width: 18, }}
                                    source={require("../Assets/Icons/RightArrow.png")}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Events

const styles = StyleSheet.create({})