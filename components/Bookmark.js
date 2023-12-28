import { StyleSheet, Text, View, TouchableOpacity, Image, Button, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import LoginLoader from './LoginLoader';

const Bookmark = ({ route }) => {
    const navigation = useNavigation();
    //activity loader
    const [visible, setVisible] = useState(false);
    //get bookmarks & number & login user id
    const [noBook, setNoBook] = useState(0);
    const [bookmarkData, setBookmarkData] = useState([]);
    useEffect(() => {
        getNoBooks()
    }, []);
    const getNoBooks = async () => {
        setVisible(true)
        const myId = await AsyncStorage.getItem('USERID')
        const bookmark = await firestore().collection('users').doc(myId).get();
        setNoBook(bookmark._data.bookmarks.length);
        setBookmarkData(bookmark._data.bookmarks);
        setVisible(false)
        // console.log(bookmark._data.bookmarks);
        // console.log(noBook);
    }
    //remove bookmark
    const removeBooks = async (item, index) => {
        setVisible(true)
        const myId = await AsyncStorage.getItem('USERID')
        const bookmark = await firestore().collection('users').doc(myId).get();
        let tempBook = [];
        tempBook = bookmark._data.bookmarks;
        tempBook.splice(index, 1);
        firestore().collection('users').doc(myId).update({
            bookmarks: tempBook,
        })
        setBookmarkData(bookmark._data.bookmarks);
        setNoBook(bookmark._data.bookmarks.length);
        setVisible(false)
    }

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
                    <Text style={{ color: '#120D26', fontSize: 24, fontWeight: '400',fontFamily: 'AirbnbCereal_M' }}>Bookmark</Text>
                </View>
            </View>
            {/* Body */}
            {
                noBook === 0 ?
                    //book mark = 0
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 169, marginHorizontal: 24 }}>
                        <Image
                            style={{ height: 169, width: 156, }}
                            source={require("../Assets/Others/EmptyNotification.png")}
                        />
                        <Text style={{ marginTop: 40, color: '#344B67', fontSize: 20, fontWeight: '400', lineHeight: 34, textAlign: 'center',fontFamily: 'AirbnbCereal_M' }}>
                            No Bookmark!
                        </Text>
                        <Text style={{ marginTop: 7, color: '#344B67', fontSize: 18, fontWeight: '400', lineHeight: 28, textAlign: 'center', opacity: 0.7,fontFamily: 'AirbnbCereal_2' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor
                        </Text>
                    </View>
                    :
                    //book mark > 0
                    <View>
                        <FlatList
                            data={bookmarkData}
                            renderItem={({ item }) =>
                                <View style={styles.nearbyEventCard}>
                                    <TouchableOpacity style={{}}
                                        onPress={() => navigation.navigate("EventDetails", { item: item })}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 7, }}>
                                            <Image
                                                style={{ height: 105, width: 105, borderRadius: 12, marginRight: 16, }}
                                                source={{uri:item.eventBanner}}
                                            />
                                            <View style={{ marginRight: 0 }}>
                                                <Text style={{ color: '#5669FF', fontSize: 12, fontWeight: '400', textTransform: 'uppercase',fontFamily: 'AirbnbCereal_M' }}>
                                                    {item.eventDate} {item.eventStartingTime}
                                                </Text>
                                                <Text style={{ width: 193, color: '#120D26', fontSize: 18, fontWeight: '400', lineHeight: 25, textAlign: 'auto',fontFamily: 'AirbnbCereal_M' }}>
                                                    {item.eventName}
                                                </Text>
                                            </View>
                                            <TouchableOpacity
                                                onPress={() => { removeBooks() }}>
                                                <Image
                                                    style={{ height: 40, width: 40, }}
                                                    source={require("../Assets/Icons/DEleteIcon.png")}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                    </View>
            }
            {/* activity loader */}
            <LoginLoader visible={visible} />
        </View>
    )
}

export default Bookmark

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