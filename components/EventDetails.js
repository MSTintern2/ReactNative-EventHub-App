import { Image, StyleSheet, Text, View, TouchableOpacity, Animated, TouchableHighlight, ScrollView, Modal, TouchableWithoutFeedback, TextInput, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Share from 'react-native-share';
import FriendsList from './FriendsList'
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid'
import LoginLoader from './LoginLoader';

const EventDetails = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;
  //activity loader
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  //get login user name and id
  const [myID, setMyID] = useState("");
  const [myName, setMyName] = useState("");
  const [myEmail, setMyEmail] = useState("");
  const [myPic, setMyPic] = useState("");
  const [cDate, setCDate] = useState("");
  const getLoginIdName = async () => {
    const myId = await AsyncStorage.getItem('USERID')
    setMyID(myId)
    const login = await firestore().collection('users').doc(myId).get();
    setMyName(login._data.name)
    setMyEmail(login._data.email)
    setMyPic(login._data.profileImage)
    let currentDate = getCurrentDate();
    setCDate(currentDate)
  }
  // get currnet date
  const getCurrentDate = () => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    let currentdate = (date + "-" + month + "-" + year)
    // console.log("get current date ----------------" + currentdate)
    return currentdate;
  }
  //rating function
  const [reviewStarsError, setReviewStarsError] = useState(false);
  const [reviewTextError, setReviewTextError] = useState(false);
  const [noOfStars, setNoOfStars] = useState(0);
  const [Star1, setStar1] = useState(false);
  const [Star2, setStar2] = useState(false);
  const [Star3, setStar3] = useState(false);
  const [Star4, setStar4] = useState(false);
  const [Star5, setStar5] = useState(false);
  const onPressStar1 = () => {
    setNoOfStars(1)
    setStar1(true)
    setStar2(false)
    setStar3(false)
    setStar4(false)
    setStar5(false)
  }
  const onPressStar2 = () => {
    setNoOfStars(2)
    setStar1(true)
    setStar2(true)
    setStar3(false)
    setStar4(false)
    setStar5(false)
  }
  const onPressStar3 = () => {
    setNoOfStars(3)
    setStar1(true)
    setStar2(true)
    setStar3(true)
    setStar4(false)
    setStar5(false)
  }
  const onPressStar4 = () => {
    setNoOfStars(4)
    setStar1(true)
    setStar2(true)
    setStar3(true)
    setStar4(true)
    setStar5(false)
  }
  const onPressStar5 = () => {
    setNoOfStars(5)
    setStar1(true)
    setStar2(true)
    setStar3(true)
    setStar4(true)
    setStar5(true)
  }
  //submit review
  const [review, setReview] = useState('');
  const submitReview = async () => {
    { !review ? setReviewTextError(true) : setReviewTextError(false) }
    { noOfStars == 0 ? setReviewStarsError(true) : setReviewStarsError(false) }
    if (!review) { return; }
    let hasError = false;
    if (noOfStars == 0) { hasError = true; return; }
    setReviewStarsError(hasError);
    setVisible(true)
    oId = item.eventOrganizerId
    const reviewId = uuid.v4()
    firestore().collection('users').doc(oId).collection('reviews').doc(reviewId).set({
      reviewId: reviewId,
      reviewById: myID,
      reviewByName: myName,
      reviewByPic: myPic,
      reviewDate: cDate,
      review: review,
      reviewStars: noOfStars,
    })
      .then(
        res => {
          setVisible(false)
          Alert.alert('Review', 'Your review added successfully.', [
            { text: 'OK', onPress: () => notNow() },
          ]);
        }
      )
      .catch(err => {
        console.log(err)
      });
  }
  //notNow
  const notNow = () => {
    setShow1(false)
    setReview("")
    setNoOfStars(0)
    setStar1(false)
    setStar2(false)
    setStar3(false)
    setStar4(false)
    setStar5(false)
    setReviewTextError(false)
    setReviewStarsError(false)
  }
  //animation btn
  const animation = useRef(new Animated.Value(0)).current;
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const toggleBtn = () => {
    let toValue = isButtonClicked ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();
    setIsButtonClicked(!isButtonClicked);
  };
  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "45deg"]
        })
      }
    ]
  };
  const style1 = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 45]
        })
      }
    ]
  }
  const style2 = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 90]
        })
      }
    ]
  }
  const style3 = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 135]
        })
      }
    ]
  }
  //add bookmark data
  const addBookmark = async (item, index) => {
    const myId = await AsyncStorage.getItem('USERID')
    const bookmarks = await firestore().collection('users').doc(myId).get();
    // console.log(bookmarks._data.bookmarks);
    let tempBook = [];
    tempBook = bookmarks._data.bookmarks;
    // console.log(tempBook);
    if (tempBook.length > 0) {
      let existing = false;
      tempBook.map(itm => {
        if (itm.id == item.id) {
          existing = true;
          tempBook.splice(index, 1);
          firestore().collection('users').doc(myId).update({
            bookmarks: tempBook,
          })
          setOnPressBookmark(false)
        }
      });
      if (existing == false) {
        tempBook.push(item);
        setOnPressBookmark(true)
      }
    } else {
      tempBook.push(item);
      setOnPressBookmark(true)
    }
    // console.log(tempBook);
    firestore().collection('users').doc(myId).update({
      bookmarks: tempBook,
    })
  }
  //bookmark checking
  const [onPressBookmark, setOnPressBookmark] = useState(false);
  const checkBookmark = async () => {
    const myId = await AsyncStorage.getItem('USERID')
    // console.log("my id -------------- "+ myId);
    const eventId = item.eventId
    // console.log("event Id -------------- "+ eventId);
    const booksdata = await firestore().collection('users').doc(myId).get();
    // console.log(booksdata._data.bookmarks) 
    booksdata._data.bookmarks.map(
      item => {
        item.eventId == eventId ? setOnPressBookmark(true) : setOnPressBookmark(false)
      }
    )
  }
  // console.log(onPressBookmark)
  //share pop up
  const share = () => {
    const options = {
      message: item.name,
      url: "https://www.appcoda.com/wp-content/uploads/2015/04/react-native.png",
      email: "mstintern2@gmail.com",
      Subject: `Event: ${item.name}`,
    }
    Share.open(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  }
  //get like status & like function
  const [likeStatus, setLikeStatus] = useState(false);
  const [onLikePress, setOnLikePress] = useState(false);
  const onLike = async () => {
    const myId = await AsyncStorage.getItem('USERID')
    let tempLikes = item.eventLikes;
    if (tempLikes.length > 0) {
      tempLikes.map(item1 => {
        if (item1 == myId) {
          const index = tempLikes.indexOf(item1);
          if (index > -1) {
            tempLikes.splice(index, 1);
            setLikeStatus(false)
          }
        } else {
          tempLikes.push(myId);
          setLikeStatus(true)
        }
      })
    } else {
      tempLikes.push(myId);
      setLikeStatus(true)
    }
    // console.log(item.eventId)
    await firestore().collection('events').doc(item.eventId).update({
      eventLikes: tempLikes,
    })
      .then(() => {
        console.log("event updates")
      })
      .catch(err => {
        console.log(err)
      })
    setOnLikePress(!onLikePress)
  }
  //get going status & going Function
  const [goingStatus, setGoingStatus] = useState(false);
  const [onPressGoing, setOnPressGoing] = useState(false);
  const onGoing = async () => {
    const myId = await AsyncStorage.getItem('USERID')
    let tempGoing = item.eventGoing;
    if (tempGoing.length > 0) {
      tempGoing.map(item1 => {
        if (item1 == myId) {
          const index = tempGoing.indexOf(item1);
          if (index > -1) {
            tempGoing.splice(index, 1);
            setGoingStatus(false)
          }
        } else {
          tempGoing.push(myId);
          setGoingStatus(true)
        }
      })
    } else {
      tempGoing.push(myId);
      setGoingStatus(true)
    }
    // console.log(item.eventId)
    await firestore().collection('events').doc(item.eventId).update({
      eventGoing: tempGoing,
    })
      .then(() => {
        console.log("event updates")
      })
      .catch(err => {
        console.log(err)
      })
    setOnPressGoing(!onPressGoing)
  }
  //checking
  useEffect(() => {
    checkingLikes()
    checkingGoing()
    checkBookmark()
    getLoginIdName()
  }, []);
  const checkingLikes = async () => {
    const myId = await AsyncStorage.getItem('USERID')
    // console.log(myId)
    // console.log(item.eventLikes)
    item.eventLikes.map(
      item => {
        item == myId ? setLikeStatus(true) : setLikeStatus(false)
      }
    )
  }
  const checkingGoing = async () => {
    const myId = await AsyncStorage.getItem('USERID')
    // console.log(myId)
    // console.log(item.eventGoing)
    item.eventGoing.map(
      item => {
        item == myId ? setGoingStatus(true) : setGoingStatus(false)
      }
    )
  }
  // console.log(item)
  return (
    <View style={{ flex: 1 }}>
      {/* banner */}
      <View>
        <Image
          style={{ height: 200, width: 'auto', resizeMode: 'cover' }}
          source={{ uri: item.eventBanner }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', width: '100%', top: 4 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 24, }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}>
              <Image
                style={{ height: 22, width: 22, marginRight: 13 }}
                source={require("../Assets/Icons/EventDetailsLeftArrow.png")}
              />
            </TouchableOpacity>
            <Text style={{ color: '#fff', fontSize: 24, fontWeight: '400', fontFamily: 'AirbnbCereal_M' }}>Event Details</Text>
          </View>
          {/* bookmark */}
          <View style={{ flexDirection: 'row', marginRight: 20, }}>
            <TouchableOpacity style={{ marginRight: 46, }}
              onPress={() => { addBookmark(item) }}>
              <View style={[{ height: 36, width: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }, { backgroundColor: onPressBookmark ? '#5669FF' : 'rgba(255, 255, 255, 0.30)' }]}>
                <Image
                  style={{ height: 15, width: 15, }}
                  source={require("../Assets/Icons/EventDetailsBookmark.png")}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ position: 'absolute', right: 20, top: 0, gap: 6 }}>
            {/* drop down */}
            <TouchableOpacity style={{ position: 'absolute' }}
              onPress={share}>
              <Animated.View style={[style1, { height: 36, width: 36, backgroundColor: 'rgba(255, 255, 255, 0.30)', borderRadius: 10, justifyContent: 'center', alignItems: 'center', }]}>
                <Image
                  style={{ height: 25, width: 25, }}
                  source={require("../Assets/Icons/EventDetailsShareIcon.png")}
                />
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity style={{ position: 'absolute' }}
              onPress={() => onGoing()}>
              <Animated.View style={[style2, { backgroundColor: goingStatus ? '#5669FF' : 'rgba(255, 255, 255, 0.30)', }, { height: 36, width: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }]}>
                <Image
                  style={{ height: 25, width: 25, }}
                  source={require("../Assets/Icons/going.png")}
                />
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity style={{ position: 'absolute' }}
              onPress={() => { onLike(item) }}>
              <Animated.View style={[style3, { backgroundColor: likeStatus ? "#5669FF" : 'rgba(255, 255, 255, 0.30)', }, { height: 36, width: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }]}>
                <Image
                  style={{ height: 25, width: 25, }}
                  source={require("../Assets/Icons/likeeeee.png")}
                />
              </Animated.View>
            </TouchableOpacity>
            {/* +  */}
            <View style={{ height: 36, width: 36, backgroundColor: 'rgba(255, 255, 255, 0.30)', borderRadius: 10, justifyContent: 'center', alignItems: 'center', }}>
              <TouchableOpacity style={[rotation, {}]} activeOpacity={1}
                onPress={() => toggleBtn()}>
                <Animated.View style={{}}>
                  <Image
                    style={{ height: 25, width: 25, }}
                    source={require("../Assets/Icons/fbtn.png")}
                  />
                </Animated.View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {/* Going Container */}
      <View style={styles.goingContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          {/* <View style={{ height: 34, flexDirection: 'row', width: 70 }}>
            <View style={{ position: 'absolute', zIndex: 3, }}>
              <Image style={{ width: 34, height: 34, borderRadius: 24, borderColor: '#fff', borderWidth: 1 }} source={item.going1} />
            </View>
            <View style={{ position: 'absolute', left: 16, zIndex: 2, }}>
              <Image style={{ width: 34, height: 34, borderRadius: 24, borderColor: '#fff', borderWidth: 1 }} source={item.going2} />
            </View>
            <View style={{ position: 'absolute', left: 32, zIndex: 1, }}>
              <Image style={{ width: 34, height: 34, borderRadius: 24, borderColor: '#fff', borderWidth: 1 }} source={item.going3} />
            </View>
          </View> */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, }}>
              <Image
                style={{ height: 23, width: 23, tintColor: '#3F38DD' }}
                source={require("../Assets/Icons/likeeeee.png")} />
              <Text style={{ color: '#3F38DD', fontSize: 17, fontWeight: '400', fontFamily: 'AirbnbCereal_M' }}>Likes</Text>
              <Text style={{ color: '#3F38DD', fontSize: 18, fontWeight: '400', fontFamily: 'AirbnbCereal_LBold' }}>{item.eventLikes.length}</Text>
            </View>
            <Text style={{ color: '#3F38DD', fontSize: 28, fontWeight: '400', fontFamily: 'AirbnbCereal_1' }}>|</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 0, }} >
              <Image
                style={{ height: 23, width: 23, tintColor: '#3F38DD' }}
                source={require("../Assets/Icons/going.png")} />
              <Text style={{ color: '#3F38DD', fontSize: 17, fontWeight: '400', fontFamily: 'AirbnbCereal_M' }}>Going </Text>
              <Text style={{ color: '#3F38DD', fontSize: 18, fontWeight: '400', fontFamily: 'AirbnbCereal_LBold' }}>{item.eventGoing.length}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{ height: 28, width: 67, borderRadius: 7, backgroundColor: '#5669FF', justifyContent: 'center', alignItems: 'center', }}
          onPress={() => setShow(true)}>
          <Text style={{ color: '#fff', fontSize: 12, fontWeight: '400', fontFamily: 'AirbnbCereal_M' }}>Invite</Text>
        </TouchableOpacity>
      </View>
      {/* Invite Friend Modal */}
      <Modal transparent={true} visible={show} animationType='slide'>
        <View style={{ backgroundColor: '#fff', flex: 1, marginTop: 71, borderTopRightRadius: 38, borderTopLeftRadius: 38 }}>
          <View style={{ height: 5, width: 26, backgroundColor: 'rgba(178, 178, 178, 0.5)', marginTop: 12, borderRadius: 2.5, alignSelf: 'center' }}></View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 24, marginTop: 17, }}>
            <TouchableOpacity
              onPress={() => setShow(false)}>
              <Image source={require("../Assets/Icons/LeftArrow.png")} />
            </TouchableOpacity>
            <Text style={{ color: '#120D26', fontSize: 24, fontWeight: '500', marginLeft: 10 }}>
              Invite Friend
            </Text>
          </View>
          <FriendsList />
          <View style={styles.signinContainer}>
            <TouchableOpacity
              onPress={share}
              style={styles.signinButton}
              underlayColor={'transparent'}>
              <View style={styles.signinContent}>
                <Text style={styles.signinText}>Invite</Text>
                <View style={styles.signinIcon}>
                  <Image
                    style={styles.arrowIcon}
                    source={require("../Assets/Icons/RightArrow.png")}
                  />
                  {/* <Icon name="arrow-right" size={20} color="#900" /> */}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Headling */}
      <Text style={{ color: '#120D26', fontSize: 35, fontWeight: '400', marginLeft: 24, marginRight: 38, marginTop: 40, fontFamily: 'AirbnbCereal_M' }}>
        {item.eventName}
      </Text>
      {/* Date Time */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 21, marginTop: 20, }}>
        <View style={{ height: 48, width: 48, borderRadius: 12, backgroundColor: '#d6daff', justifyContent: 'center', alignItems: 'center', }}>
          <Image
            style={{ height: 30, width: 30, }}
            source={require("../Assets/Icons/EventDetailsCalendar.png")}
          />
        </View>
        <View style={{ marginLeft: 14 }}>
          <Text style={{ color: '#120D26', fontSize: 16, fontWeight: '400', lineHeight: 34, fontFamily: 'AirbnbCereal_M' }}>{item.eventDate}</Text>
          <Text style={{ color: '#747688', fontSize: 12, fontWeight: '400', fontFamily: 'AirbnbCereal_2' }}>{item.eventStartingTime} - {item.eventEndingTime}</Text>
        </View>
      </View>
      {/* location */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 21, marginTop: 20, }}>
        <View style={{ height: 48, width: 48, borderRadius: 12, backgroundColor: '#d6daff', justifyContent: 'center', alignItems: 'center', }}>
          <Image
            style={{ height: 30, width: 30, }}
            source={require("../Assets/Icons/EventDetailsLocation.png")}
          />
        </View>
        <View style={{ marginLeft: 14 }}>
          <Text style={{ color: '#120D26', fontSize: 16, fontWeight: '400', lineHeight: 34, fontFamily: 'AirbnbCereal_M' }}>{item.eventCenter}</Text>
          <Text style={{ color: '#747688', fontSize: 12, fontWeight: '400', fontFamily: 'AirbnbCereal_2' }}>{item.eventAddress}</Text>
        </View>
      </View>
      {/* Organizer */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 21, marginTop: 20, width: 360, justifyContent: 'space-between' }}>
        {/* Profile */}
        <TouchableOpacity
          onPress={() => navigation.navigate("OrganizerProfile", { organizerId: item.eventOrganizerId })}>
          <View style={{ flexDirection: 'row', }}>
            {
              item.eventOrganizerProfileImage !== "" ?
                <Image
                  style={{ height: 48, width: 48, borderRadius: 12, }}
                  source={{ uri: item.eventOrganizerProfileImage }}
                /> :
                <Image
                  style={{ height: 48, width: 48, borderRadius: 12, }}
                  source={require("../Assets/Others/UserFakePic.png")}
                />
            }
            <View style={{ marginLeft: 14 }}>
              <Text style={{ color: '#120D26', fontSize: 16, fontWeight: '400', lineHeight: 34, fontFamily: 'AirbnbCereal_M' }}>{item.eventOrganizerName}</Text>
              <Text style={{ color: '#747688', fontSize: 12, fontWeight: '400', fontFamily: 'AirbnbCereal_2' }}>Organizer</Text>
            </View>
          </View>
        </TouchableOpacity>
        {/* follow and review */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          {/* <TouchableOpacity style={[{ height: 30, width: 60, borderRadius: 7, justifyContent: 'center', alignItems: 'center', }, { backgroundColor: '#d6daff' }]}
            onPress={() => { }}>
            <Text style={[{ fontSize: 12, fontWeight: '400', fontFamily: 'AirbnbCereal_M' }, { color: '#5669FF' }]}>Follow</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={[{ height: 30, width: 60, borderRadius: 7, justifyContent: 'center', alignItems: 'center', }, { backgroundColor: '#d6daff' }]}
            onPress={() => setShow1(true)}>
            <Text style={[{ fontSize: 12, fontWeight: '400', fontFamily: 'AirbnbCereal_M' }, { color: '#5669FF' }]}>Review</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* About Headling */}
      <View style={{ marginLeft: 24, marginTop: 20, }}>
        <Text style={{ color: '#120D26', fontSize: 18, fontWeight: '500', lineHeight: 34, fontFamily: 'AirbnbCereal_M' }}>About Event</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* About Text */}
        <View style={{ marginHorizontal: 24, marginTop: 8, marginBottom: 8 }}>
          <Text style={{ color: '#120D26', fontSize: 18, fontWeight: '400', lineHeight: 28, fontFamily: 'AirbnbCereal_2' }}>{item.eventAbout}</Text>
          {/* <TouchableHighlight>
            <Text style={{ color: '#5669FF', fontSize: 16, fontWeight: '400', textAlign: 'right' }}>Read More...</Text>
          </TouchableHighlight> */}
        </View>
      </ScrollView>
      {/* Buy Button */}
      <View style={{ marginHorizontal: 52, marginBottom: 23, }}>
        <TouchableOpacity style={{ backgroundColor: '#5669FF', height: 58, borderRadius: 15, justifyContent: 'center', alignItems: 'center', shadowColor: '#000000', elevation: 1, shadowOpacity: 1, }}
        onPress={()=>navigation.navigate("BuyTicket",{eventName: item.eventName, eventCenter: item.eventCenter, eventAddress: item.eventAddress, eventDate: item.eventDate, eventStartingTime: item.eventStartingTime, eventId: item.eventId, eventOrganizerName: item.eventOrganizerName, eventCategory: item.eventCategory, eventEndingTime: item.eventEndingTime})}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '400', letterSpacing: 1, textTransform: 'uppercase', fontFamily: 'AirbnbCereal_M' }}>Buy ticket ${item.eventTicketPrice}</Text>
            <View style={{ height: 30, width: 30, backgroundColor: '#3D56F0', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginLeft: 22 }}>
              <Image
                style={{ height: 18, width: 18, }}
                source={require("../Assets/Icons/RightArrow.png")}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {/* review Modal */}
      <Modal transparent={true} visible={show1} animationType='slide'>
        <View style={{ backgroundColor: 'rgba(0,0,0,0.6)', flex: 1 }}>
          <View style={{ backgroundColor: '#fff', marginHorizontal: 45, paddingVertical: 20, borderRadius: 12, elevation: 4, marginTop: 25, }}>
            {/* Headling */}
            <Text style={{ fontSize: 24, marginRight: 10, color: '#000', textAlign: "center", marginBottom: 20, fontFamily: 'AirbnbCereal_M', }}>
              Review
            </Text>
            <View style={{ borderBottomColor: "#747688", borderBottomWidth: 1, marginBottom: 15, }}></View>
            {/* pic */}
            <View style={{ justifyContent: 'center', alignItems: "center", }}>
              {
                myPic !== "" ?
                  <Image
                    style={{ height: 100, width: 100, borderRadius: 100, }}
                    source={{ uri: myPic }}
                  /> :
                  <Image
                    style={{ height: 100, width: 100, borderRadius: 100, }}
                    source={require("../Assets/Others/UserFakePic.png")}
                  />
              }
            </View>
            {/* Name */}
            <Text style={{ fontSize: 22, marginRight: 10, color: '#4A43EC', textAlign: "center", marginTop: 10, fontFamily: 'AirbnbCereal_M', }}>
              {myName}
            </Text>
            {/* email */}
            <Text style={{ fontSize: 14, marginRight: 10, color: '#4A43EC', textAlign: "center", marginBottom: 10, fontFamily: 'AirbnbCereal_2', }}>
              {myEmail}
            </Text>
            {/* date */}
            <Text style={{ fontSize: 14, marginRight: 10, color: '#000', textAlign: "center", marginBottom: 10, fontFamily: 'AirbnbCereal_M', }}>
              Review the event on {cDate}
            </Text>
            {/* Stars */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, justifyContent: "center", marginBottom: 10, }}>
              <TouchableOpacity onPress={() => onPressStar1()}>
                <Image
                  style={[{ height: 35, width: 35, }, { tintColor: Star1 ? "#FFD700" : '#747688' }]}
                  source={require("../Assets/Icons/rrstarrr.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPressStar2()}>
                <Image
                  style={[{ height: 35, width: 35, }, { tintColor: Star2 ? "#FFD700" : '#747688' }]}
                  source={require("../Assets/Icons/rrstarrr.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPressStar3()}>
                <Image
                  style={[{ height: 35, width: 35, }, { tintColor: Star3 ? "#FFD700" : '#747688' }]}
                  source={require("../Assets/Icons/rrstarrr.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPressStar4()}>
                <Image
                  style={[{ height: 35, width: 35, }, { tintColor: Star4 ? "#FFD700" : '#747688' }]}
                  source={require("../Assets/Icons/rrstarrr.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPressStar5()}>
                <Image
                  style={[{ height: 35, width: 35, }, { tintColor: Star5 ? "#FFD700" : '#747688' }]}
                  source={require("../Assets/Icons/rrstarrr.png")}
                />
              </TouchableOpacity>

            </View>
            {
              reviewStarsError ?
                <View>
                  <Text style={{ color: 'red', marginLeft: 26, marginTop: 1, fontFamily: 'AirbnbCereal_2' }}>
                    Please select rating before submitting.
                  </Text>
                </View> : null
            }
            {/* comment */}
            <View style={{ borderWidth: 1, borderColor: '#E4DFDF', borderRadius: 12, flexDirection: 'row', alignItems: 'center', marginTop: 2, marginHorizontal: 25, }}>
              <Image
                style={{ height: 24, width: 24, marginLeft: 15, tintColor: '#747688' }}
                source={require("../Assets/Icons/ddcomments.png")}
              />
              <TextInput placeholder='Enter your comment...' placeholderTextColor="#747688"
                multiline={true}
                value={review}
                onChangeText={(text) => setReview(text)}
                style={{ fontSize: 15, paddingLeft: 14, fontFamily: 'AirbnbCereal_2', lineHeight: 23, flex: 1, paddingRight: 6, }}
              />
            </View>
            {
              reviewTextError ?
                <View>
                  <Text style={{ color: 'red', marginLeft: 26, marginTop: 1, fontFamily: 'AirbnbCereal_2' }}>
                    Please write a review before submitting.
                  </Text>
                </View> : null
            }
            {/* button */}
            <View style={{ marginTop: 10, flexDirection: 'row', gap: 10, marginHorizontal: 25, }}>
              <TouchableOpacity
                style={{ height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fab1a0', borderRadius: 10, elevation: 2, flex: 1, height: 45, }}
                onPress={() => notNow()}>
                <Text style={{ color: '#000', fontSize: 16, fontWeight: '600', fontFamily: 'AirbnbCereal_M' }}>
                  Not Now
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#81ecec', borderRadius: 10, flex: 1, height: 45, elevation: 2, }}
                onPress={() => submitReview()}>
                <Text style={{ color: '#000', fontSize: 16, fontWeight: '600', fontFamily: 'AirbnbCereal_M' }}>
                  Submit Review
                </Text>
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

export default EventDetails

const styles = StyleSheet.create({
  goingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEFEFF',
    width: 330,
    height: 50,
    borderRadius: 30,
    position: 'absolute',
    top: 175,
    paddingHorizontal: 14,
    justifyContent: 'space-between',
    marginHorizontal: 40,
    shadowColor: '#000000',
    elevation: 5,
    shadowOpacity: 5,
  },
  signinContainer: {
    // marginHorizontal: 52,
    // marginTop: 86,
  },
  signinButton: {
    backgroundColor: '#5669FF',
    borderRadius: 12,
    shadowColor: 'black',
    elevation: 10,
    shadowOpacity: 1,
    position: 'absolute',
    bottom: 170,
    alignSelf: 'center'
  },
  signinContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 19,
  },
  signinText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '400',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginLeft: 102,
  },
  signinIcon: {
    height: 30,
    width: 30,
    marginRight: 15,
    marginLeft: 62,
    backgroundColor: '#3D56F0',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    height: 18,
    width: 18,
  },
})