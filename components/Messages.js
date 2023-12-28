import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, StatusBar, Modal, TextInput,Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginLoader from './LoginLoader';

const Messages = () => {
    const navigation = useNavigation();
    //activity loader
    const [visible, setVisible] = useState(false);
    //modal show / hide
    const [show, setShow] = useState(false)
    //get user data
    const [allUsers, setAllUsers] = useState("")
    useEffect(() => {
        getData();
        getLoginData();
    }, [])
    // get all users from db
    const getData = async () => {
        try {
            let tempAllUsersData = [];
            const myEmail = await AsyncStorage.getItem('EMAIL');
            firestore().collection('users').where('email', '!=', myEmail).get()
                .then(
                    res => {
                        if (res.docs != []) {
                            res.docs.map(item => {
                                tempAllUsersData.push(item.data())
                            })
                        }
                        setAllUsers(tempAllUsersData);
                        // console.log(allUsers);
                        // console.log(JSON.stringify(res.docs[0].data()));
                    });

        } catch (error) {
            console.log(error)
        }
    }
    //seach, filter users
    const [typedText, setTypedText] = useState('');
    const [filterUsers, setFilterUsers] = useState(allUsers);
    const searchUser = (text) => {
        setTypedText(text);
        const filteredUsers = allUsers.filter((user) => user.name.toLowerCase().includes(text.toLowerCase()));
        setFilterUsers(filteredUsers);
    };
    //get login data from async storage
    const [myId, setMyId] = useState('');
    // console.log(myId)
    const getLoginData = async () => {
        const myid = await AsyncStorage.getItem('USERID')
        setMyId(myid)
    }
    //chat with Searched user
    // const addChatWithUserData = async (item) => {
    //     try {
    //         console.log(item)
    //         const jsonValue = JSON.stringify(item);
    //         await AsyncStorage.setItem('USERSFORCHAT', jsonValue);
    //         console.log(jsonValue.name)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
    // useEffect(() => {
    //     getUsersForChat()
    // }, [show]);
    // const getChatWithUser = async () => {
    //     try {
    //         const jsonValue = await AsyncStorage.getItem('USERSFORCHAT');
    //         console.log(jsonValue)
    //         return jsonValue != null ? JSON.parse(jsonValue) : null;
    //     } catch (e) {
    //         console.log(e)
    //     }
    // };
    //add press user in db
    const addChatWithUserData = async (name, userId) => {
        // console.log(name)
        // console.log(userId)
        // firestore().collection('users').doc('chat' + myId + userId).set({
            firestore().collection('users').doc(myId).collection('chatwith').doc('chat' + myId + userId).set({
            chatwithuserId: userId,
            chatwithusername: name,
        }).then(
            res => {
                setVisible(true)
                setShow(false)
            }
        )
    }
    //get press user from db
    useEffect(() => {
        getChatWithUser()
    })
    const [chatWithUser, setChatWithUser] = useState('');
    const getChatWithUser = async () => {
        try {
            // const chatWithUserId = await AsyncStorage.getItem('USERID');
            // // console.log(chatWithUserId)
            const chatWithUser = [];
            // const chatWithUserRef = firestore().collection('chatwithuser').where('chatwithuserId', '!=', myId);
            const chatWithUserRef = firestore().collection('users').doc(myId).collection('chatwith');
            const snapshot = await chatWithUserRef.get();

            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    chatWithUser.push({
                        chatwithuserId: doc.data().chatwithuserId,
                        chatwithusername: doc.data().chatwithusername
                    });
                });
            }
            setChatWithUser(chatWithUser);
            setVisible(false)
        } catch (error) {
            console.error('Error fetching chat data:', error);
        }
    };
    //delete chat with pressed user
    const removeChatWithUser = async () => {
        try {
            Alert.alert("Delete Alert", `Do you want to delete Users List?`, [
                {
                    text: "Yes",
                    onPress: async () => {
                        setVisible(true)
                        const batch = firestore().batch();
                        const chatWithUserRef = firestore().collection('users').doc(myId).collection('chatwith');
                        const snapshot = await chatWithUserRef.get();

                        if (!snapshot.empty) {
                            snapshot.forEach(doc => {
                                batch.delete(doc.ref);
                            });
                        }
                        await batch.commit();
                        setVisible(false)
                    }
                },
                {
                    text: "No",
                    onPress: () => { }
                },
            ]);
        } catch (err) {
            console.log(err)
        }
        // try {
        //     const batch = firestore().batch();
        //     const chatWithUserRef = firestore().collection('chatwithuser');
        //     const snapshot = await chatWithUserRef.get();

        //     if (!snapshot.empty) {
        //       snapshot.forEach(doc => {
        //         batch.delete(doc.ref);
        //       });
        //     }

        //     await batch.commit();

        //     console.log('Chat with user collection successfully deleted!');
        //   } catch (error) {
        //     console.error('Error deleting chat with user collection:', error);
        //   }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar
                backgroundColor="#4A43EC"
                barStyle="light-content"
            />
            {/* Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingVertical: 12, backgroundColor: '#4A43EC' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 24, justifyContent: 'space-between', }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}>
                            <Image
                                style={{ height: 22, width: 22, marginRight: 13 }}
                                source={require("../Assets/Icons/EventDetailsLeftArrow.png")}
                            />
                        </TouchableOpacity>
                        <Text style={{ color: '#fff', fontSize: 24, fontWeight: '400', fontFamily: 'AirbnbCereal_M'}}>Messages</Text>
                    </View>
                    <TouchableOpacity
                        style={{ marginRight: 10, }}
                        onPress={removeChatWithUser}>
                        <Image
                            style={{ height: 30, width: 30, }}
                            source={require("../Assets/Icons/DEleteIcon.png")}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: 24, }}
                        onPress={() => setShow(true)}>
                        <Image source={require("../Assets/Icons/Search.png")} />
                    </TouchableOpacity>
                </View>
            </View>
            {/* Body */}
            <View>
                <FlatList
                    data={chatWithUser}
                    renderItem={({ item, index }) =>
                        <View style={{ marginHorizontal: 24 }}>
                            <TouchableOpacity
                                style={{ marginTop: 10, borderWidth: 1, borderColor: '#4A43EC', borderRadius: 12, paddingVertical: 6, paddingHorizontal: 6, elevation: 3, backgroundColor: '#fff' }}
                                onPress={() => navigation.navigate("Chat", { myId: myId, name: item.chatwithusername, id: item.chatwithuserId })}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Image
                                        style={{ height: 60, width: 60, marginRight: 20, }}
                                        source={require("../Assets/Others/UserFakePic.png")}
                                    />
                                    <Text style={{ fontSize: 20, fontWeight: '500', color: '#4A43EC', flex: 1 ,fontFamily: 'AirbnbCereal_M'}}>
                                        {item.chatwithusername}
                                        {/* {item.chatwithuserId} */}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                />
            </View>
            {/* modal */}
            <Modal transparent={true} visible={show} animationType='slide'>
                <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', flex: 1 }}>
                    {/* modal header */}
                    <View style={{ backgroundColor: '#4A43EC', paddingVertical: 12, paddingLeft: 24, width: '100%', }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <TouchableOpacity
                                onPress={() => setShow(false)}>
                                <Image
                                    style={{ height: 22, width: 22, marginRight: 13 }}
                                    source={require("../Assets/Icons/EventDetailsLeftArrow.png")}
                                />
                            </TouchableOpacity>
                            <Text style={{ color: '#fff', fontSize: 24, fontWeight: '400',fontFamily: 'AirbnbCereal_M' }}>Find Friend for Chat</Text>
                        </View>
                    </View>
                    {/* modal body */}
                    <View style={{ backgroundColor: '#fff', flex: 1, paddingTop: 10 }}>
                        {/* modal search bar */}
                        <View style={{ borderColor: '#747688', borderRadius: 100, borderWidth: 1, marginHorizontal: 24, }}>
                            <TextInput
                                placeholder='Search...'
                                placeholderTextColor='#747688'
                                style={{ marginLeft: 10, fontSize: 16, fontWeight: '400',fontFamily: 'AirbnbCereal_2',color: '#747688', }}
                                onChangeText={text => searchUser(text)}
                            />
                        </View>
                        {/* modal users list */}
                        {
                            filterUsers.length === 0
                                ?
                                <FlatList
                                    data={allUsers}
                                    renderItem={({ item, index }) =>
                                        <View style={{ marginHorizontal: 24 }}>
                                            <TouchableOpacity
                                                style={{ marginTop: 10, borderWidth: 1, borderColor: '#4A43EC', borderRadius: 12, paddingVertical: 6, paddingHorizontal: 6, elevation: 3, backgroundColor: '#fff' }}
                                                onPress={() => addChatWithUserData(item.name, item.userId)}
                                            // onPress={() => addChatWithUserData(item)}
                                            >
                                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                    <Image
                                                        style={{ height: 60, width: 60, marginRight: 20, }}
                                                        source={require("../Assets/Others/UserFakePic.png")}
                                                    />
                                                    <Text style={{ fontSize: 20, fontWeight: '500', color: '#4A43EC',fontFamily: 'AirbnbCereal_M' }}>
                                                        {item.name}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                />
                                :
                                <FlatList
                                    data={filterUsers}
                                    renderItem={({ item, index }) =>
                                        <View style={{ marginHorizontal: 24 }}>
                                            <TouchableOpacity
                                                style={{ marginTop: 10, borderWidth: 1, borderColor: '#4A43EC', borderRadius: 12, paddingVertical: 6, paddingHorizontal: 6, elevation: 3, backgroundColor: '#fff' }}
                                                onPress={() => addChatWithUserData(item.name, item.userId)}
                                            // onPress={() => addChatWithUserData(item)}
                                            >
                                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                    <Image
                                                        style={{ height: 60, width: 60, marginRight: 20, }}
                                                        source={require("../Assets/Others/UserFakePic.png")}
                                                    />
                                                    <Text style={{ fontSize: 20, fontWeight: '500', color: '#4A43EC',fontFamily: 'AirbnbCereal_M' }}>
                                                        {item.name}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                />
                        }
                    </View>
                </View>
            </Modal>
            {/* activity loader */}
            <LoginLoader visible={visible} />
        </View>
    )
}


export default Messages

const styles = StyleSheet.create({})