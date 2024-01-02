import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, StatusBar, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

const Chat = ({ route }) => {
    const navigation = useNavigation();
    const { pic } = route.params;
    const { name } = route.params;
    const { myId } = route.params;
    const { id } = route.params;
    // console.log(id)
    // console.log(item.id)
    // console.log(item.name)
    // gifted chat 
    const [messages, setMessages] = useState([])
    //receive msg
    useEffect(() => {
        const sub = firestore().collection('chats').doc('' + myId + id).collection('messages').orderBy('createdAt', 'desc');
        sub.onSnapshot(querysnapshot => {
            const allmessages = querysnapshot.docs.map(item => {
                return {
                    ...item._data, createdAt: item._data.createdAt
                }
            });
            setMessages(allmessages);
        });
        return () => sub;
    }, [])
    //send msg
    const onSend = useCallback((messages = []) => {
        const msg = messages[0];
        //send personal data with msg by breaking message
        const myMsg = {
            ...msg,
            sendBy: myId,
            sendTo: id,
            createdAt: Date.parse(msg.createdAt),
        }
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, myMsg),
        );
        // to reference of chat in db (bcs if one user delete chat form its side, it will show to other user) 
        firestore().collection('chats').doc('' + myId + id).collection('messages').add(myMsg);
        firestore().collection('chats').doc('' + id + myId).collection('messages').add(myMsg);
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', }}>
            <StatusBar
                backgroundColor="#4A43EC"
                barStyle="light-content"
            />
            {/* Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingVertical: 16, backgroundColor: '#4A43EC', }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 24, }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}>
                        <Image
                            style={{ height: 22, width: 22, marginRight: 13 }}
                            source={require("../Assets/Icons/EventDetailsLeftArrow.png")}
                        />
                    </TouchableOpacity>
                    {
                        pic == "" ?
                            <Image
                                style={{ height: 45, width: 45, marginRight: 10, borderRadius: 30 }}
                                source={require("../Assets/Others/UserFakePic.png")}
                            />
                            :
                            <Image
                                style={{ height: 45, width: 45, marginRight: 10, borderRadius: 30 }}
                                source={{uri: pic}}
                            />
                    }
                    <Text style={{ color: '#fff', fontSize: 24, fontWeight: '400', fontFamily: 'AirbnbCereal_M' }}>{name}</Text>
                </View>
            </View>
            {/* Body */}
            <View style={{ flex: 1, }}>
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: myId,
                    }}
                    alwaysShowSend
                    renderBubble={renderBubble}
                    renderSend={renderSend}
                />
            </View>
        </View>
    )
}
const renderSend = (props) => {
    return (
        <Send {...props}>
            <View style={{}}>
                <Image
                    style={{ height: 30, width: 30, marginVertical: 8, marginRight: 8, }}
                    source={require("../Assets/Icons/send.png")}
                />
            </View>
        </Send>
    )
}
const renderBubble = (props) => {
    return (
        <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: '#4A43EC'
                },
                left: {
                    backgroundColor: '#d6daff'
                }
            }}
            textStyle={{
                right: {
                    color: '#fff',
                    fontFamily: 'AirbnbCereal_M'
                },
                left: {
                    color: '#000',
                    fontFamily: 'AirbnbCereal_M'
                }
            }}
        />
    )
}

export default Chat

const styles = StyleSheet.create({})