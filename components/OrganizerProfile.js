import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TouchableHighlight, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OrganizerAbout from './OrganizerAbout';
import OrganizerEvents from './OrganizerEvents';
import OrganizerReviews from './OrganizerReviews';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import LoginLoader from './LoginLoader';

const OrganizerProfile = ({ route }) => {
    //activity loader
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation();
    const Tab = createMaterialTopTabNavigator();
    const { organizerId } = route.params;
    // console.log(organizerId)
    //get organizer info. using organizer id
    const [organizerImage, setOrganizerImage] = useState('');
    const [organizerName, setOrganizerName] = useState('');
    const [organizerFollowers, setOrganizerFollowers] = useState('');
    const [organizerFollowing, setOrganizerFollowing] = useState('');
    const [organizerAbout, setOrganizerAbout] = useState('');
    // const [organizerId, setOrganizerId] = useState('');
    const getOrganizerData = async () => {
        setVisible(true)
        const data = await firestore().collection('users').doc(organizerId).get();
        // console.log(data._data.about)
        setOrganizerImage(data._data.profileImage)
        setOrganizerName(data._data.name)
        setOrganizerFollowers(data._data.followers)
        setOrganizerFollowing(data._data.following)
        setOrganizerAbout(data._data.about)
        setVisible(false)
    }
    //follow function
    const followBtnHandler = () => {
        followBtn();
        followingBtn();
    }
    const [followStatus, setFollowStatus] = useState(false);
    const [onFollowPress, setOnFollowPress] = useState(false);
    const followBtn = async () => {
        const myId = await AsyncStorage.getItem('USERID')
        // console.log("Login user Id ---- " + myId)
        // console.log("event organizer Id ---- " + item.eventOrganizerId)
        let tempFollowers = organizerFollowers;
        if (tempFollowers.length > 0) {
            tempFollowers.map(item1 => {
                if (item1 == myId) {
                    const index = tempFollowers.indexOf(item1);
                    if (index > -1) {
                        tempFollowers.splice(index, 1);
                        setFollowStatus(false)
                    }
                } else {
                    tempFollowers.push(myId);
                    setFollowStatus(true)
                }
            })
        } else {
            tempFollowers.push(myId);
            setFollowStatus(true)
        }
        await firestore().collection('users').doc(organizerId).update({
            followers: tempFollowers,
        })
            // await firestore().collection('users').doc(myId).update({
            //     following: item.eventOrganizerId,
            // })
            .then(() => {
                console.log("event updates")
            })
            .catch(err => {
                console.log(err)
            })
        setOnFollowPress(!onFollowPress)
    }
    const followingBtn = async () => {
        const myId = await AsyncStorage.getItem('USERID')
        const myFollowing = await firestore().collection('users').doc(myId).get();
        // console.log(myFollowing._data.following)
        let tempFollowing = myFollowing._data.following;
        if (tempFollowing.length > 0) {
            tempFollowing.map(item1 => {
                if (item1 == organizerId) {
                    const index = tempFollowing.indexOf(item1);
                    if (index > -1) {
                        tempFollowing.splice(index, 1);
                        setFollowStatus(false)
                    }
                } else {
                    tempFollowing.push(organizerId);
                    setFollowStatus(true)
                }
            })
        } else {
            tempFollowing.push(organizerId);
            setFollowStatus(true)
        }
        // await firestore().collection('users').doc(item.eventOrganizerId).update({
        //     followers: tempFollowers,
        // })
        await firestore().collection('users').doc(myId).update({
            following: tempFollowing,
        })
            .then(() => {
                console.log("event updates")
            })
            .catch(err => {
                console.log(err)
            })
        setOnFollowPress(!onFollowPress)
    }
    //checking
    useEffect(() => {
        getOrganizerData()
    }, []);
    useEffect(() => {
        checkingFollow()
    });
    const checkingFollow = async () => {
        const myId = await AsyncStorage.getItem('USERID')
        // console.log(organizerId)
        // console.log(organizerFollowers)
        organizerFollowers.map(
            item => {
                item == myId ? setFollowStatus(true) : setFollowStatus(false)
            }
        )
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
                </View>
                {/* <View style={{ flexDirection: 'row', }}>
                    <TouchableOpacity style={{ marginRight: 20, }}>
                        <View style={{ height: 22, width: 22, }}>
                            <Image
                                style={{ height: 22, width: 22, }}
                                source={require("../Assets/Icons/EventsMoreIcon.png")}
                            />
                        </View>
                    </TouchableOpacity>
                </View> */}
            </View>
            {/* Profile pic  */}
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                {
                    organizerImage === '' ?
                        <Image
                            style={{ height: 100, width: 100, borderRadius: 50, }}
                            source={require("../Assets/Others/UserFakePic.png")}
                        />
                        :
                        <Image
                            style={{ height: 100, width: 100, borderRadius: 50, }}
                            source={{ uri: organizerImage }}
                        />
                }
            </View>
            {/* Name */}
            <View style={{ alignItems: 'center', marginTop: 18 }}>
                <Text style={{ color: '#120D26', fontSize: 26, fontWeight: '400', fontFamily: 'AirbnbCereal_M' }}>
                    {organizerName}
                </Text>
            </View>
            {/* following & follower */}
            <View style={{ alignItems: 'center', marginTop: 18 }}>
                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <View style={{ alignItems: 'center', marginRight: 23 }}>
                        <Text style={{ color: '#120D26', fontSize: 18, fontWeight: '500', lineHeight: 34, fontFamily: 'AirbnbCereal_M' }}>
                            {organizerFollowing.length}
                        </Text>
                        <Text style={{ color: '#747688', fontSize: 16, fontWeight: '400', lineHeight: 23, fontFamily: 'AirbnbCereal_M' }}>Following</Text>
                    </View>
                    <View style={{ backgroundColor: '#DDD', width: 1, height: 32, marginRight: 23 }}></View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: '#120D26', fontSize: 18, fontWeight: '500', lineHeight: 34, fontFamily: 'AirbnbCereal_M' }}>
                            {organizerFollowers.length}
                        </Text>
                        <Text style={{ color: '#747688', fontSize: 16, fontWeight: '400', lineHeight: 23, fontFamily: 'AirbnbCereal_M' }}>Followers</Text>
                    </View>
                </View>
            </View>
            {/* edit button  */}
            <View style={{ alignItems: 'center', marginTop: 18, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity style={[{ height: 50, width: 154, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderColor: '#5669FF', borderRadius: 10, borderWidth: 2, }, { backgroundColor: followStatus ? '#5669FF' : '#fff' }]}
                    onPress={() => followBtnHandler()}>
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <Image
                            style={[{ height: 22, width: 22, marginRight: 16, }, { tintColor: followStatus ? '#fff' : '#5669FF' }]}
                            source={require("../Assets/Icons/OrganizerProfileFollowIcon.png")}
                        />
                        <Text style={[{ fontSize: 16, fontWeight: '400', lineHeight: 25, fontFamily: 'AirbnbCereal_M' }, { color: followStatus ? '#fff' : '#5669FF' }]}>
                            Follow
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 17, height: 50, width: 154, borderColor: '#5669FF', borderRadius: 10, borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => navigation.navigate('Messages')}>
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <Image
                            style={{ height: 22, width: 22, marginRight: 16 }}
                            source={require("../Assets/Icons/OrganizerProfileMessageICon.png")}
                        />
                        <Text style={{ color: '#5669FF', fontSize: 16, fontWeight: '400', lineHeight: 25, fontFamily: 'AirbnbCereal_M' }}>
                            Messages
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            {/* Slider */}
            <View style={{ alignItems: 'center', marginTop: 10, flex: 1, marginHorizontal: 24 }}>
                <Tab.Navigator
                    screenOptions={{
                        tabBarActiveTintColor: '#5669FF',
                        tabBarInactiveTintColor: '#747688',
                        tabBarIndicatorStyle: {
                            backgroundColor: '#5669FF',
                            height: 3,
                        },
                        tabBarScrollEnabled: true,
                        tabBarLabelStyle: { fontSize: 16, fontWeight: '400', letterSpacing: 0.16, textTransform: 'uppercase', fontFamily: 'AirbnbCereal_M', },
                        tabBarItemStyle: { width: 120, },
                        tabBarStyle: {
                            height: 50,
                            backgroundColor: '#fff',
                            alignItems: 'center',
                            elevation: 0,
                            alignSelf: 'center',
                        },
                    }}
                >
                    <Tab.Screen
                        name="About"
                        component={OrganizerAbout}
                        initialParams={{ oId: organizerId }}
                    />
                    <Tab.Screen
                        name="Event"
                        component={OrganizerEvents}
                        initialParams={{ oId: organizerId }}
                    />
                    <Tab.Screen
                        name="Reviews"
                        component={OrganizerReviews}
                        initialParams={{ oId: organizerId }}
                    />
                </Tab.Navigator>
            </View>
            {/* activity loader */}
            <LoginLoader visible={visible} />
        </View>
    )
}


export default OrganizerProfile

const styles = StyleSheet.create({})