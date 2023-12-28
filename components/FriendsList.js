import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import Friends from '../database/Friends';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginLoader from './LoginLoader';

const FriendsList = (props) => {
  //activity loader
  const [visible, setVisible] = useState(false);
  //get user data
  const [allUsers, setAllUsers] = useState("")
  useEffect(() => {
    getData();
  }, [])
  // get all users from db
  const getData = async () => {
    try {
      setVisible(true)
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
            setVisible(false)
            // console.log(allUsers);
            // console.log(JSON.stringify(res.docs[0].data()));
          });

    } catch (error) {
      console.log(error)
    }
  }
  //get enterd text from textinput
  const [typedText, setTypedText] = useState('');
  // console.log(typedText)
  const [filterFriends, setFilterFriends] = useState(allUsers);
  const searchFriend = (text) => {
    setTypedText(text);
    const filteredFriends = allUsers.filter((friend) => friend.name.toLowerCase().includes(text.toLowerCase()));
    setFilterFriends(filteredFriends);
  };

  return (
    <View style={{ marginHorizontal: 24, marginTop: 7, marginBottom: 240 }}>
      <View style={{
        flexDirection: 'row', alignItems: 'center', borderColor: '#F0F0F0', borderRadius: 100, borderWidth: 1, justifyContent: 'space-between',
        paddingHorizontal: 17, marginBottom: 30,
      }}>
        <TextInput placeholder='Search' placeholderTextColor="#747688" style={{ marginLeft: 7, color: '#8193AE', fontSize: 14, fontWeight: '400', lineHeight: 23, opacity: 0.7, flex: 1,fontFamily: 'AirbnbCereal_M' }}
          onChangeText={text => searchFriend(text)}
        />
      </View>
      {
        filterFriends.length === 0
          ?
          <FlatList
            showsVerticalScrollIndicator={false}
            data={allUsers}
            renderItem={({ item }) => <FriendItem item={item} />}
            keyExtractor={(item) => item.id}
          />
          :
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filterFriends}
            renderItem={({ item }) => <FriendItem item={item} />}
            keyExtractor={(item) => item.id}
          />
      }
      {/* activity loader */}
      <LoginLoader visible={visible} />
    </View>
  );
};

//function
const FriendItem = ({ item }) => {
  const [backgroundColor, setBackgroundColor] = useState('#E2E2E2');

  const handlePress = () => {
    setBackgroundColor(backgroundColor === '#E2E2E2' ? '#5669FF' : '#E2E2E2');
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        {
          item.profileImage == '' ?
            <Image
              style={{ height: 60, width: 60, borderRadius: 50, marginRight: 11 }}
              source={require("../Assets/Others/UserFakePic.png")}
            />
            :
            <Image
              style={{ height: 60, width: 60, borderRadius: 50, marginRight: 11 }}
              source={{ uri: item.profileImage }}
            />
        }
        <View>
          <Text style={{ color: '#120D26', fontSize: 20, fontWeight: '500',fontFamily: 'AirbnbCereal_M' }}>
            {item.name}
          </Text>
          <Text style={{ color: '#747688', fontSize: 14, fontWeight: '400',fontFamily: 'AirbnbCereal_2' }}>
            {item.followers.length} Followers
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{ backgroundColor: backgroundColor, height: 30, width: 30, borderRadius: 15 }}
        onPress={handlePress}>
        <View style={{ alignItems: 'center', justifyContent: 'center', height: 30, width: 30 }}>
          <Image
            style={{ height: 15, width: 20, alignItems: 'center', justifyContent: 'center' }}
            source={require("../Assets/Icons/TickIcon.png")}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FriendsList;

const styles = StyleSheet.create({});
