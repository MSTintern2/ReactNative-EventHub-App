import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const Notification = ({ route }) => {
    const navigation = useNavigation();
    const { item } = route.params;
    // console.log(item);
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginVertical: 12, marginBottom: 30, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 24, }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("MenuDrawer")}>
                        <Image
                            style={{ height: 22, width: 22, marginRight: 13 }}
                            source={require("../Assets/Icons/EventsLeftArrow.png")}
                        />
                    </TouchableOpacity>
                    <Text style={{ color: '#120D26', fontSize: 24, fontWeight: '400',fontFamily: 'AirbnbCereal_M' }}>Notification</Text>
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
            {/* body */}
            {
                item.length === 0
                    ?
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 169, marginHorizontal: 24 }}>
                        <Image
                            style={{ height: 169, width: 156, }}
                            source={require("../Assets/Others/EmptyNotification.png")}
                        />
                        <Text style={{ marginTop: 40, color: '#344B67', fontSize: 20, fontWeight: '400', lineHeight: 34, textAlign: 'center',fontFamily: 'AirbnbCereal_M' }}>
                            No Notifications!
                        </Text>
                        <Text style={{ marginTop: 7, color: '#344B67', fontSize: 18, fontWeight: '400', lineHeight: 28, textAlign: 'center', opacity: 0.7,fontFamily: 'AirbnbCereal_2' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor
                        </Text>
                    </View>
                    :
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={item}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) =>
                            <View style={{ marginHorizontal: 24, marginBottom: 17, }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image
                                            style={{ height: 45, width: 45, borderRadius: 23 }}
                                            source={item.image} />

                                        <View style={{ marginLeft: 14, }}>
                                            <Text style={{ fontSize: 16, fontWeight: 400, color: '#060518', lineHeight: 23,fontFamily: 'AirbnbCereal_M' }}>{item.name}</Text>
                                            <Text style={{ fontSize: 14, fontWeight: 400, color: '#3C3E56', lineHeight: 23,fontFamily: 'AirbnbCereal_M' }}>{item.message}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 12, fontWeight: 400, color: '#3C3E56',fontFamily: 'AirbnbCereal_2' }}>{item.time}</Text>
                                    </View>
                                </View>
                            </View>
                        }
                    />
            }
            {/* <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 169, marginHorizontal: 24 }}>
                <Image
                    style={{ height: 169, width: 156, }}
                    source={require("../Assets/Others/EmptyNotification.png")}
                />
                <Text style={{ marginTop: 40, color: '#344B67', fontSize: 20, fontWeight: '400', lineHeight: 34, textAlign: 'center' }}>
                    No Notifications!
                </Text>
                <Text style={{ marginTop: 7, color: '#344B67', fontSize: 18, fontWeight: '400', lineHeight: 28, textAlign: 'center', opacity: 0.7 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor
                </Text>
            </View> */}
        </View>
    )
}

export default Notification

const styles = StyleSheet.create({})