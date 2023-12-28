import { Image, StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, TouchableOpacity, TouchableHighlight, Modal, Button } from 'react-native'
import React, { useState } from 'react'
import BottomTab from './BottomTab'
import EventCards from './EventCards'
import NearbyEventsCards from './NearbyEventsCards'
import { useNavigation } from '@react-navigation/native';
import FriendsList from './FriendsList'
import Share from 'react-native-share';
import SportHome from './SportHome'
import MusicHome from './MusicHome'
import FoodHome from './FoodHome'
import ArtHome from './ArtHome'

const Home = () => {
  const navigation = useNavigation();
  const [show, setShow] = useState(false)
  //filter data
  const [showFilterData, setShowFilterData] = useState(false);
  //category
  const [showSportEvents, setShowSportEvents] = useState(false)
  const [showMusicEvents, setShowMusicEvents] = useState(false)
  const [showFoodEvents, setShowFoodEvents] = useState(false)
  const [showArtEvents, setShowArtEvents] = useState(false)
  const SportBtn = () => {
    setShowSportEvents(!showSportEvents)
    setShowMusicEvents(false)
    setShowFoodEvents(false)
    setShowArtEvents(false)
  }
  const MusicBtn = () => {
    setShowSportEvents(false)
    setShowMusicEvents(!showMusicEvents)
    setShowFoodEvents(false)
    setShowArtEvents(false)
  }
  const FoodBtn = () => {
    setShowSportEvents(false)
    setShowMusicEvents(false)
    setShowFoodEvents(!showFoodEvents)
    setShowArtEvents(false)
  }
  const ArtBtn = () => {
    setShowSportEvents(false)
    setShowMusicEvents(false)
    setShowFoodEvents(false)
    setShowArtEvents(!showArtEvents)
  }
  //share pop up
  const share = () => {
    const options = {
      message: 'Join US!',
      url: "https://www.appcoda.com/wp-content/uploads/2015/04/react-native.png",
    }
    Share.open(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  }
  return (
    <View style={styles.home}>
      <View style={styles.homeTopOptions}></View>
      {/* Category */}
      <View style={styles.eventCategoryContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={[styles.eventCategory, { marginLeft: 24, backgroundColor: showSportEvents ? "#C62828" : "#E57373", }]}
            onPress={() => SportBtn()}>
            <Image
              style={[styles.eventCategoryIcon, {}]}
              source={require("../Assets/Icons/SportsIcon.png")}
            />
            <Text style={[styles.eventCategoryText, { color: '#fff' }]}>Sports</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.eventCategory, { backgroundColor: showMusicEvents ? '#EF6C00' : '#FFB74D', }]}
            onPress={() => MusicBtn()}>
            <Image
              style={styles.eventCategoryIcon}
              source={require("../Assets/Icons/MusicIcon.png")}
            />
            <Text style={styles.eventCategoryText}>Music</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.eventCategory, { backgroundColor: showFoodEvents ? '#558B2F' : '#AED581', }]}
            onPress={() => FoodBtn()}>
            <Image
              style={styles.eventCategoryIcon}
              source={require("../Assets/Icons/FoodIcon.png")}
            />
            <Text style={styles.eventCategoryText}>Food</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.eventCategory, { backgroundColor: showArtEvents ? '#1565C0' : '#64B5F6' }]}
            onPress={() => ArtBtn()}>
            <Image
              style={styles.eventCategoryIcon}
              source={require("../Assets/Icons/ArtIcon.png")}
            />
            <Text style={styles.eventCategoryText}>Art</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <ScrollView style={{ marginBottom: 71, }} showsVerticalScrollIndicator={false}>
        {
          showSportEvents ?
            <View>
              <SportHome />
            </View> : null
        }
        {
          showMusicEvents ?
            <View>
              <MusicHome />
            </View> : null
        }
        {
          showFoodEvents ?
            <View>
              <FoodHome />
            </View> : null
        }
        {
          showArtEvents ?
            <View>
              <ArtHome />
            </View> : null
        }
        {/* filter */}
        {
          showFilterData ?
            <View>
              <Text>Filter</Text>
            </View>
            : null
        }
        {/* Heading */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 24, marginTop: 24 }}>
          <Text style={styles.heading}>Upcoming Events</Text>
          <TouchableHighlight
            underlayColor={'transparent'}
            onPress={() => navigation.navigate("AllUpcomingEvents")}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
              <Text style={{ color: '#747688', fontSize: 14, fontStyle: 'normal', fontWeight: '400', lineHeight: 23, fontFamily: 'AirbnbCereal_2' }}>See All</Text>
              <Image
                style={{ marginLeft: 3 }}
                source={require("../Assets/Icons/SeeAllArrow.png")}
              />
            </View>
          </TouchableHighlight>
        </View>
        {/* Event Cards */}
        <EventCards />
        {/* Invite Friend Card */}
        <View style={styles.inviteContainer}>
          <Image
            style={{ position: 'absolute', right: 0, height: 127, resizeMode: 'contain', }}
            source={require("../Assets/Others/InviteFriendImage.png")}
          />
          <View style={{ marginLeft: 18, marginTop: 13, }}>
            <Text style={{ color: '#120D26', fontSize: 18, fontWeight: '500', lineHeight: 34, fontFamily: 'AirbnbCereal_M' }}>Invite your friends</Text>
            <Text style={{ color: '#484D70', fontSize: 13, fontWeight: '400', fontFamily: 'AirbnbCereal_M' }}>Get $20 for ticket</Text>
            <TouchableOpacity style={styles.inviteButton}
              onPress={() => setShow(true)}>
              <Text style={{ color: '#fff', fontSize: 12, fontWeight: '400', lineHeight: 23, textTransform: 'uppercase', fontFamily: 'AirbnbCereal_M' }}>Invite</Text>
            </TouchableOpacity>
          </View>
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
              <Text style={{ color: '#120D26', fontSize: 24, fontWeight: '500', marginLeft: 10, fontFamily: 'AirbnbCereal_M' }}>
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
        {/* Heading */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 24, marginTop: 24 }}>
          <Text style={styles.heading}>Nearby You</Text>
          <TouchableHighlight
            underlayColor={'transparent'}
            onPress={() => navigation.navigate("AllNearbyEvents")}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
              <Text style={{ color: '#747688', fontSize: 14, fontStyle: 'normal', fontWeight: '400', lineHeight: 23, fontFamily: 'AirbnbCereal_2' }}>See All</Text>
              <Image
                style={{ marginLeft: 3 }}
                source={require("../Assets/Icons/SeeAllArrow.png")}
              />
            </View>
          </TouchableHighlight>
        </View>
        {/* Nearby Cards */}
        <View style={styles.nearbyEventCard}>
          <NearbyEventsCards />
        </View>
      </ScrollView>
      {/* Bottom Tab Bar */}
      <View style={styles.bottomTabBar}>
        <BottomTab />
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  home: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  bottomTabBar: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  homeTopOptions: {
    height: 30,
    backgroundColor: '#4A43EC',
    borderBottomRightRadius: 33,
    borderBottomLeftRadius: 33,
  },
  eventCategoryContainer: {
    position: 'absolute',
    top: 10,
    zIndex: 1,
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  eventCategory: {
    width: 'auto',
    height: 39,
    borderRadius: 21,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 11.3,
    paddingHorizontal: 16.5,
  },
  eventCategoryIcon: {
    width: 17.7,
    height: 17.7,
    marginRight: 8.3,
  },
  eventCategoryText: {
    color: '#ffffff',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 25,
    fontFamily: 'AirbnbCereal_M'
  },
  heading: {
    color: '#120D26',
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 34,
    fontFamily: 'AirbnbCereal_M'
  },
  inviteContainer: {
    backgroundColor: '#d6feff',
    borderRadius: 12,
    marginHorizontal: 24,
    flexDirection: 'column',
    height: 127,
  },
  inviteButton: {
    backgroundColor: '#00F8FF',
    marginTop: 13,
    height: 32,
    width: 72,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nearbyEventCard: {
    marginTop: 16,
  },
  signinContainer: {
    // marginHorizontal: 52,
    // marginTop: 46,
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
    fontFamily: 'AirbnbCereal_M'
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