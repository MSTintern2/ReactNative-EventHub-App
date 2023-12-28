import { StyleSheet, Text, View, TouchableHighlight, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const OrganizerReviews = ({ route }) => {
  const { oId } = route.params;
  useEffect(() => {
    getReviews()
  }, []);
  const [allReviews, setAllReviews] = useState('');
  const getReviews = async () => {
    try {
      // console.log(oId)
      const reviews = [];
      const organizerReviews = firestore().collection('users').doc(oId).collection('reviews');
      const snapshot = await organizerReviews.get();
      if (!snapshot.empty) {
        snapshot.forEach(doc => {
          reviews.push({
            review: doc.data().review,
            reviewByName: doc.data().reviewByName,
            reviewByPic: doc.data().reviewByPic,
            reviewDate: doc.data().reviewDate,
            reviewId: doc.data().reviewId,
            reviewStars: doc.data().reviewStars,
          });
        });
        setAllReviews(reviews)
      }
    }
    catch (error) {
      console.error('Error fetching chat data:', error);
    }
  }

  return (
    <View style={{ paddingTop: 10, flex: 1, backgroundColor: '#fff' }}>
      <View>
        {
          allReviews.length ?
            <FlatList
              showsVerticalScrollIndicator={false}
              data={allReviews}
              renderItem={({ item }) =>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  {
                    item.reviewByPic !== '' ?
                      <Image
                        source={{ uri: item.reviewByPic }}
                        style={{ height: 36, width: 36, borderRadius: 17, marginRight: 16, marginTop: 6, }}
                      /> :
                      <Image
                        source={require("../Assets/Others/UserFakePic.png")}
                        style={{ height: 36, width: 36, borderRadius: 17, marginRight: 16, marginTop: 6, }}
                      />
                  }
                  <View style={{ width: 308 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ color: '#000', fontSize: 18, fontWeight: '400', lineHeight: 34, fontFamily: 'AirbnbCereal_M' }}>{item.reviewByName}</Text>
                      <Text style={{ color: '#ADAFBB', fontSize: 15, fontWeight: '400', lineHeight: 25, fontFamily: 'AirbnbCereal_2' }}>{item.reviewDate}</Text>
                    </View>
                    {
                      item.reviewStars == 1 ?
                        <View style={{ flexDirection: 'row', }}>
                          <Image source={require("../Assets/Others/StarIcon.png")} /></View>
                        : null
                    }
                    {
                      item.reviewStars == 2 ?
                        <View style={{ flexDirection: 'row', }}>
                          <Image source={require("../Assets/Others/StarIcon.png")} />
                          <Image source={require("../Assets/Others/StarIcon.png")} /></View>
                        : null
                    }
                    {
                      item.reviewStars == 3 ?
                        <View style={{ flexDirection: 'row', }}>
                          <Image source={require("../Assets/Others/StarIcon.png")} />
                          <Image source={require("../Assets/Others/StarIcon.png")} />
                          <Image source={require("../Assets/Others/StarIcon.png")} /></View>
                        : null
                    }
                    {
                      item.reviewStars == 4 ?
                        <View style={{ flexDirection: 'row', }}>
                          <Image source={require("../Assets/Others/StarIcon.png")} />
                          <Image source={require("../Assets/Others/StarIcon.png")} />
                          <Image source={require("../Assets/Others/StarIcon.png")} />
                          <Image source={require("../Assets/Others/StarIcon.png")} /></View>
                        : null
                    }
                    {
                      item.reviewStars == 5 ?
                        <View style={{ flexDirection: 'row', }}>
                          <Image source={require("../Assets/Others/StarIcon.png")} />
                          <Image source={require("../Assets/Others/StarIcon.png")} />
                          <Image source={require("../Assets/Others/StarIcon.png")} />
                          <Image source={require("../Assets/Others/StarIcon.png")} />
                          <Image source={require("../Assets/Others/StarIcon.png")} /></View>
                        : null
                    }
                    <Text style={{ color: '#000', fontSize: 15, fontWeight: '400', lineHeight: 25, textAlign: 'justify', fontFamily: 'AirbnbCereal_2' }}>{item.review}</Text>
                  </View>
                </View>
              }
            />
            :
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 80, marginHorizontal: 24 }}>
              <Text style={{ marginTop: 40, color: '#120D26', fontSize: 24, fontWeight: '500', lineHeight: 34, textAlign: 'center', fontFamily: 'AirbnbCereal_M', }}>
                No Reviews Yet
              </Text>
              <Text style={{ marginTop: 7, color: '#747688', fontSize: 16, fontWeight: '400', lineHeight: 25, textAlign: 'center', opacity: 0.7, fontFamily: 'AirbnbCereal_2', }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor
              </Text>
            </View>
        }
      </View>
    </View>
  )
}

export default OrganizerReviews

const styles = StyleSheet.create({})