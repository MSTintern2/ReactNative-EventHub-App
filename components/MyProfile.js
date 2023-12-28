import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TouchableHighlight, FlatList, Modal, TextInput, Alert } from 'react-native'
import usersInfo from '../database/UserInfo'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import LoginLoader from './LoginLoader';

const MyProfile = () => {
    const navigation = useNavigation();
    //activity loader
    const [visible, setVisible] = useState(false);
    //image from camera
    const [profileImageData, setProfileImageData] = useState(null);
    const openCamera = async () => {
        const result = await launchCamera({ mediaType: 'photo' });
        setProfileImageData(result)
        // console.log(result)
    }
    const pickFromGallery = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo' });
        setProfileImageData(result)
        // console.log(result)
    }
    //uupload & get image to firebase
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const uploadProfileImage = async () => {
        setVisible(true)
        const reference = storage().ref(profileImageData.assets[0].fileName);
        const pathToFile = profileImageData.assets[0].uri;
        await reference.putFile(pathToFile);
        const url = await storage().ref(profileImageData.assets[0].fileName).getDownloadURL();
        //add it in firestore
        try {
            const myId = await AsyncStorage.getItem('USERID')
            if (url != '') {
                firestore().collection('users').doc(myId).update({
                    profileImage: url,
                })
            }
        } catch (error) {
            console.log(error)
        }
        setProfileImageData(null)
        getUserDataByUserId()
        setVisible(false)
        setShow1(false)
        Alert.alert("Upload User Profile Image", "Your profile image uploaded.",
            [{ text: "Ok", onPress: async () => { } },]);
    }
    //modal hide / show
    const [show, setShow] = useState(false)
    const [show1, setShow1] = useState(false)
    //get modal data & store in db
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [about, setAbout] = useState('');
    const [fblink, setFblink] = useState('');
    const [instalink, setInstalink] = useState('');
    const [lilink, setLilink] = useState('');
    const [intrestInput, setIntrestInput] = useState('');
    const [intrestArray, setIntrestArray] = useState([]);
    const addInIntrestList = () => {
        // console.log(intrestInput)
        if (intrestInput !== '') {
            setIntrestArray([...intrestArray, intrestInput])
            setIntrestInput('')
        }
        // console.log(intrestArray)3s
    }
    const addEditUserData = async () => {
        try {
            const myId = await AsyncStorage.getItem('USERID')
            if (name != '') {
                firestore().collection('users').doc(myId).update({
                    name: name,
                })
            }
            if (phone != '') {
                firestore().collection('users').doc(myId).update({
                    phone: phone,
                })
            }
            if (about != '') {
                firestore().collection('users').doc(myId).update({
                    about: about,
                })
            }
            if (fblink != '') {
                firestore().collection('users').doc(myId).update({
                    facebook: fblink,
                })
            }
            if (instalink != '') {
                firestore().collection('users').doc(myId).update({
                    instagram: instalink,
                })
            }
            if (lilink != '') {
                firestore().collection('users').doc(myId).update({
                    linkedin: lilink,
                })
            }
            if (intrestArray != '') {
                firestore().collection('users').doc(myId).update({
                    intrest: intrestArray
                })
            }
            // console.log(name,phone,about)
            // firestore().collection('users').doc(myId).update({
            // name: name,
            // phone: phone,
            // about: about,
            // intrest: intrestArray
            // })
            Alert.alert("Update User Profile", "Your profile updated.",
                [{ text: "Ok", onPress: async () => { } },]);
            getUserDataByUserId();
            setShow(false)
        } catch (error) {
            console.log(error)
        }
    }
    //get user data from firebase on the base of userId saved in Async Storage
    const [userName, setUserName] = useState('');
    const [userFollowers, setUserFollowers] = useState('');
    const [userFollowing, setUserFollowing] = useState('');
    const [userAbout, setUserAbout] = useState('');
    const [userIntrest, setUserIntrest] = useState([]);
    const [userProfileImage, setUserProfileImage] = useState('');
    useEffect(() => {
        getUserDataByUserId()
    }, [])
    const getUserDataByUserId = async () => {
        try {
            const myId = await AsyncStorage.getItem('USERID')
            // console.log(myId)
            const userData = await firestore().collection('users').doc(myId).get();
            setUserName(userData._data.name)
            setUserFollowers(userData._data.followers)
            setUserFollowing(userData._data.following)
            setUserAbout(userData._data.about)
            setUserIntrest(userData._data.intrest)
            setUserProfileImage(userData._data.profileImage)
            // console.log(userData._data.name)
        } catch (error) {
            console.log(error)
        }
    }
    //getting iamge
    const item = usersInfo[0];
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
                    <Text style={{ color: '#120D26', fontSize: 24, fontWeight: '400', fontFamily: 'AirbnbCereal_M', }}>My Profile</Text>
                </View>
            </View>
            {/* Profile pic  */}
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                {
                    userProfileImage == '' ?
                        <Image
                            style={{ height: 100, width: 100, borderRadius: 50, }}
                            source={require("../Assets/Others/UserFakePic.png")}
                        />
                        :
                        <Image
                            style={{ height: 100, width: 100, borderRadius: 50, }}
                            source={{ uri: userProfileImage }}
                        />
                }
                <TouchableOpacity
                    style={{ height: 35, width: 35, borderRadius: 17, backgroundColor: '#5669FF', alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: -8, right: 150 }}
                    onPress={() => setShow1(true)}>
                    <Image
                        style={{ height: 28, width: 28, }}
                        source={require("../Assets/Icons/user.png")}
                    />
                </TouchableOpacity>
            </View>
            {/* Name */}
            <View style={{ alignItems: 'center', marginTop: 18 }}>
                <Text style={{ color: '#120D26', fontSize: 26, fontWeight: '400', fontFamily: 'AirbnbCereal_M', }}>{userName}</Text>
            </View>
            {/* following & follower */}
            <View style={{ alignItems: 'center', marginTop: 18 }}>
                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <View style={{ alignItems: 'center', marginRight: 23 }}>
                        <Text style={{ color: '#120D26', fontSize: 18, fontWeight: '500', lineHeight: 34, fontFamily: 'AirbnbCereal_M', }}>{userFollowing.length}</Text>
                        <Text style={{ color: '#747688', fontSize: 16, fontWeight: '400', lineHeight: 23, fontFamily: 'AirbnbCereal_2', }}>Following</Text>
                    </View>
                    <View style={{ backgroundColor: '#DDD', width: 1, height: 32, marginRight: 23 }}></View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: '#120D26', fontSize: 18, fontWeight: '500', lineHeight: 34, fontFamily: 'AirbnbCereal_M', }}>{userFollowers.length}</Text>
                        <Text style={{ color: '#747688', fontSize: 16, fontWeight: '400', lineHeight: 23, fontFamily: 'AirbnbCereal_2', }}>Followers</Text>
                    </View>
                </View>
            </View>
            {/* edit button  */}
            <View style={{ alignItems: 'center', marginTop: 18 }}>
                <TouchableOpacity style={{ height: 50, width: 154, borderColor: '#5669FF', borderRadius: 10, borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => setShow(true)}>
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <Image
                            style={{ height: 22, width: 22, marginRight: 16 }}
                            source={require("../Assets/Icons/ProfileEditIcon.png")}
                        />
                        <Text style={{ color: '#5669FF', fontSize: 16, fontWeight: '400', lineHeight: 25, fontFamily: 'AirbnbCereal_M', }}>Edit Profile</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {/* About Headling */}
            <View style={{ marginLeft: 24, marginTop: 20, }}>
                <Text style={{ color: '#120D26', fontSize: 18, fontWeight: '500', lineHeight: 34, fontFamily: 'AirbnbCereal_M', }}>About Me</Text>
            </View>
            {/* About Text */}
            <View style={{ marginHorizontal: 24, marginTop: 8, marginBottom: 8 }}>
                <Text style={{ color: '#120D26', fontSize: 18, fontWeight: '400', lineHeight: 28, fontFamily: 'AirbnbCereal_M', }}>{userAbout}</Text>
                {/* <TouchableHighlight>
                    <Text style={{ color: '#5669FF', fontSize: 16, fontWeight: '400', textAlign: 'right' }}>Read More...</Text>
                </TouchableHighlight> */}
            </View>
            {/* Intrest Headling */}
            <View style={{ marginLeft: 24, marginRight: 24, marginTop: 10, }}>
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#120D26', fontSize: 18, fontWeight: '500', lineHeight: 34, fontFamily: 'AirbnbCereal_M', }}>Intrest</Text>
                    {/* <TouchableOpacity style={{ height: 28, width: 90, backgroundColor: '#d6daff', borderRadius: 14, alignItems: 'center', justifyContent: 'center', }}>
                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                            <Image
                                style={{ height: 13, width: 13, marginRight: 6 }}
                                source={require("../Assets/Icons/ProfileIntrestChangeIcon.png")}
                            />
                            <Text style={{ color: '#5669FF', fontSize: 12, fontWeight: '400', lineHeight: 25, textTransform: 'uppercase',fontFamily: 'AirbnbCereal_M', }}>
                                Change
                            </Text>
                        </View>
                    </TouchableOpacity> */}
                </View>
            </View>
            {/* Intrest */}
            <View style={{ marginHorizontal: 20, }}>
                <FlatList
                    data={userIntrest}
                    numColumns={2}
                    renderItem={({ item }) =>
                        <View style={{ backgroundColor: '#4A43EC', paddingHorizontal: 14, paddingVertical: 6, alignSelf: 'baseline', borderRadius: 100, marginTop: 4, marginRight: 4 }}>
                            <Text style={{ fontSize: 20, fontWeight: '400', color: '#fff', fontFamily: 'AirbnbCereal_M', }}>
                                {item}
                            </Text>
                        </View>
                    }
                />
            </View>
            {/* info modal  */}
            <Modal transparent={true} visible={show} animationType='slide'>
                <View style={{ backgroundColor: 'rgba(0,0,0,0.6)', flex: 1 }}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#fff', marginHorizontal: 24, marginTop: 30, marginBottom: 60, borderRadius: 10, elevation: 3, padding: 14, }}>
                        <Text style={{ fontSize: 24, marginRight: 10, color: '#000', textAlign: "center", marginVertical: 10, fontFamily: 'AirbnbCereal_M', }}>
                            Edit Profile
                        </Text>
                        {/* name */}
                        <Text style={{ color: '#120D26', fontSize: 18, fontWeight: '400', fontFamily: 'AirbnbCereal_M', marginTop: 10, }}>
                            Name:
                        </Text>
                        <View style={{ borderWidth: 1, borderColor: '#E4DFDF', borderRadius: 12, flexDirection: 'row', alignItems: 'center', marginTop: 2, }}>
                            <Image
                                style={{ height: 24, width: 24, marginLeft: 15 }}
                                source={require("../Assets/Icons/mname.png")}
                            />
                            <TextInput placeholder='Enter name' placeholderTextColor="#747688"
                                value={name}
                                onChangeText={txt => setName(txt)}
                                style={{ fontSize: 15, paddingLeft: 14, fontFamily: 'AirbnbCereal_2', lineHeight: 23, flex: 1 }}
                            />
                        </View>
                        {/* phone */}
                        <Text style={{ color: '#120D26', fontSize: 18, fontWeight: '400', fontFamily: 'AirbnbCereal_M', marginTop: 10, }}>
                            Phone:
                        </Text>
                        <View style={{ borderWidth: 1, borderColor: '#E4DFDF', borderRadius: 12, flexDirection: 'row', alignItems: 'center', marginTop: 2, }}>
                            <Image
                                style={{ height: 24, width: 24, marginLeft: 15 }}
                                source={require("../Assets/Icons/mphone.png")}
                            />
                            <TextInput placeholder='Enter phone number' placeholderTextColor="#747688"
                                value={phone}
                                keyboardType='number-pad'
                                onChangeText={txt => setPhone(txt)}
                                style={{ fontSize: 15, paddingLeft: 14, fontFamily: 'AirbnbCereal_2', lineHeight: 23, flex: 1 }}
                            />
                        </View>
                        {/* about */}
                        <Text style={{ color: '#120D26', fontSize: 18, fontWeight: '400', fontFamily: 'AirbnbCereal_M', marginTop: 10, }}>
                            About:
                        </Text>
                        <View style={{ borderWidth: 1, borderColor: '#E4DFDF', borderRadius: 12, flexDirection: 'row', alignItems: 'center', marginTop: 2, }}>
                            <Image
                                style={{ height: 24, width: 24, marginLeft: 15 }}
                                source={require("../Assets/Icons/mabout.png")}
                            />
                            <TextInput placeholder='Enter about' placeholderTextColor="#747688"
                                multiline={true}
                                value={about}
                                onChangeText={txt => setAbout(txt)}
                                style={{ fontSize: 15, paddingLeft: 14, fontFamily: 'AirbnbCereal_2', lineHeight: 23, flex: 1 }}
                            />
                        </View>
                        {/* facebook */}
                        <Text style={{ color: '#120D26', fontSize: 18, fontWeight: '400', fontFamily: 'AirbnbCereal_M', marginTop: 10, }}>
                            Facebook:
                        </Text>
                        <View style={{ borderWidth: 1, borderColor: '#E4DFDF', borderRadius: 12, flexDirection: 'row', alignItems: 'center', marginTop: 2, }}>
                            <Image
                                style={{ height: 24, width: 24, marginLeft: 15 }}
                                source={require("../Assets/Icons/mfb.png")}
                            />
                            <TextInput placeholder='Enter your facebook username' placeholderTextColor="#747688"
                                value={fblink}
                                onChangeText={txt => setFblink(txt)}
                                style={{ fontSize: 15, paddingLeft: 14, fontFamily: 'AirbnbCereal_2', lineHeight: 23, flex: 1 }}
                            />
                        </View>
                        {/* Instagram */}
                        <Text style={{ color: '#120D26', fontSize: 18, fontWeight: '400', fontFamily: 'AirbnbCereal_M', marginTop: 10, }}>
                            Instagram:
                        </Text>
                        <View style={{ borderWidth: 1, borderColor: '#E4DFDF', borderRadius: 12, flexDirection: 'row', alignItems: 'center', marginTop: 2, }}>
                            <Image
                                style={{ height: 24, width: 24, marginLeft: 15 }}
                                source={require("../Assets/Icons/minstag.png")}
                            />
                            <TextInput placeholder='Enter your instagram username' placeholderTextColor="#747688"
                                value={instalink}
                                onChangeText={txt => setInstalink(txt)}
                                style={{ fontSize: 15, paddingLeft: 14, fontFamily: 'AirbnbCereal_2', lineHeight: 23, flex: 1 }}
                            />
                        </View>
                        {/* LinkedIn */}
                        <Text style={{ color: '#120D26', fontSize: 18, fontWeight: '400', fontFamily: 'AirbnbCereal_M', marginTop: 10, }}>
                            LinkedIn:
                        </Text>
                        <View style={{ borderWidth: 1, borderColor: '#E4DFDF', borderRadius: 12, flexDirection: 'row', alignItems: 'center', marginTop: 2, }}>
                            <Image
                                style={{ height: 24, width: 24, marginLeft: 15 }}
                                source={require("../Assets/Icons/mlinked.png")}
                            />
                            <TextInput placeholder='Enter your linkedin username' placeholderTextColor="#747688"
                                value={lilink}
                                onChangeText={txt => setLilink(txt)}
                                style={{ fontSize: 15, paddingLeft: 14, fontFamily: 'AirbnbCereal_2', lineHeight: 23, flex: 1 }}
                            />
                        </View>
                        {/* Intrest */}
                        <Text style={{ color: '#120D26', fontSize: 18, fontWeight: '400', fontFamily: 'AirbnbCereal_M', marginTop: 10, }}>
                            Intrest:
                        </Text>
                        <View style={{ flexDirection: 'row', gap: 8 }}>
                            <View style={{ borderWidth: 1, borderColor: '#E4DFDF', borderRadius: 12, flexDirection: 'row', alignItems: 'center', marginTop: 2, flex: 1 }}>
                                <Image
                                    style={{ height: 24, width: 24, marginLeft: 15 }}
                                    source={require("../Assets/Icons/mintrest.png")}
                                />
                                <TextInput placeholder='Enter your intrest' placeholderTextColor="#747688"
                                    value={intrestInput}
                                    onChangeText={txt => setIntrestInput(txt)}
                                    style={{ fontSize: 15, paddingLeft: 14, fontFamily: 'AirbnbCereal_2', lineHeight: 23, flex: 1 }}
                                />
                            </View>
                            <TouchableOpacity style={{ backgroundColor: '#55efc4', paddingHorizontal: 12, paddingVertical: 17, borderRadius: 10, elevation: 2, height: '100%', }}
                                onPress={addInIntrestList}>
                                <Text style={{ fontSize: 14, fontWeight: '500', color: '#000', fontFamily: 'AirbnbCereal_M', }}>
                                    Add
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <FlatList
                                data={intrestArray}
                                renderItem={({ item }) =>
                                    <View style={{ backgroundColor: '#fdcb6e', paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'baseline', borderRadius: 100, marginTop: 4 }}>
                                        <Text style={{ fontSize: 18, fontWeight: '300', color: '#000', fontFamily: 'AirbnbCereal_M', }}>{item}</Text>
                                    </View>}
                            />
                        </View>
                        {/* cancel , edit botton */}
                        <View style={{ marginTop: 10, flexDirection: 'row', gap: 10, marginBottom: 30, }}>
                            <TouchableOpacity
                                style={{ height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fab1a0', borderRadius: 10, elevation: 2, flex: 1, height: 45, }}
                                onPress={() => setShow(false)}>
                                <Text style={{ color: '#000', fontSize: 16, fontWeight: '600', fontFamily: 'AirbnbCereal_M' }}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#81ecec', borderRadius: 10, flex: 1, height: 45, elevation: 2, }}
                                onPress={addEditUserData}>
                                <Text style={{ color: '#000', fontSize: 16, fontWeight: '600', fontFamily: 'AirbnbCereal_M' }}>
                                    Edit
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
            {/* dp modal  */}
            <Modal transparent={true} visible={show1} animationType='slide'>
                <View style={{ backgroundColor: 'rgba(0,0,0,0.6)', flex: 1 }}>
                    <View style={{ backgroundColor: '#fff', marginHorizontal: 30, marginVertical: 50, borderRadius: 20, elevation: 3, padding: 14, }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', marginRight: 10, color: '#000', textAlign: "center", marginVertical: 10, fontFamily: 'AirbnbCereal_M', }}>
                            Profile Image
                        </Text>
                        {
                            profileImageData != null ?
                                <Image
                                    style={{ width: '100%', height: 200, resizeMode: 'center' }}
                                    source={{ uri: profileImageData.assets[0].uri }}
                                />
                                : null
                        }
                        <View style={{ marginTop: 10, }}>
                            <TouchableOpacity
                                style={{ backgroundColor: '#55efc4', padding: 16, borderRadius: 14, elevation: 2 }}
                                onPress={() => openCamera()}>
                                <Text style={{ fontSize: 18, fontWeight: '600', textAlign: 'center', color: '#000', fontFamily: 'AirbnbCereal_M', }}>Open Camera</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 10, }}>
                            <TouchableOpacity
                                style={{ backgroundColor: '#55efc4', padding: 16, borderRadius: 14, elevation: 2 }}
                                onPress={() => pickFromGallery()}>
                                <Text style={{ fontSize: 18, fontWeight: '600', textAlign: 'center', color: '#000', fontFamily: 'AirbnbCereal_M', }}>Pick from Gallery</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, gap: 10, }}>
                            <TouchableOpacity style={{ backgroundColor: '#fab1a0', flex: 1, padding: 16, borderRadius: 14, elevation: 2 }}
                                onPress={() => { setShow1(false), setProfileImageData(null) }}>
                                <Text style={{ fontSize: 18, fontWeight: '600', textAlign: 'center', color: '#000', fontFamily: 'AirbnbCereal_M', }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: '#74b9ff', flex: 1, padding: 16, borderRadius: 14, elevation: 2 }}
                                onPress={uploadProfileImage}>
                                <Text style={{ fontSize: 18, fontWeight: '600', textAlign: 'center', color: '#000', fontFamily: 'AirbnbCereal_M', }}>Upload</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* activity loader */}
            <LoginLoader visible={visible} />
        </View>
    )
}

export default MyProfile

const styles = StyleSheet.create({})