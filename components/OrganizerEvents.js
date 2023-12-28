import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const OrganizerEvents = ({ route }) => {
  const { oId } = route.params;
  // console.log("in events"+oId)
  const navigation = useNavigation();
  useEffect(() => {
    getAllEvents();
  }, []);
  const [allEvents, setAllEvents] = useState("")
  const getAllEvents = async () => {
    try {
      // setVisible(true)
      let tempAllEventsData = [];
      // firestore().collection('events').get()
      firestore().collection('events').where("eventOrganizerId", "==", oId).get()
        .then(
          res => {
            if (res.docs != []) {
              res.docs.map(item => {
                tempAllEventsData.push(item.data())
              })
              setAllEvents(tempAllEventsData);
            }
            // setVisible(false)
            // console.log(allEvents);
            // console.log(JSON.stringify(res.docs[0].data().eventDate));
          });
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={{ paddingTop: 14, backgroundColor: '#fff', flex: 1 }}>
      <View>
        {
          allEvents.length ?
            <FlatList
              showsVerticalScrollIndicator={false}
              data={allEvents}
              renderItem={({ item }) =>
                <View style={styles.nearbyEventCard}>
                  <TouchableOpacity style={{}}
                    onPress={() => navigation.navigate("EventDetails", { item: item })}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', margin: 7, }}>
                      <Image
                        style={{ height: 105, width: 105, borderRadius: 12, marginRight: 16, }}
                        source={{ uri: item.eventBanner }}
                      />
                      <View style={{ marginRight: 27 }}>
                        <Text style={{ color: '#5669FF', fontSize: 12, fontWeight: '400', textTransform: 'uppercase', fontFamily: 'AirbnbCereal_M', }}>
                          {item.eventDate} {item.eventStartingTime}
                        </Text>
                        <Text style={{ width: 193, color: '#120D26', fontSize: 18, fontWeight: '400', lineHeight: 25, textAlign: 'auto', fontFamily: 'AirbnbCereal_M', }}>
                          {item.eventName}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              }
            />
            :
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 80, marginHorizontal: 24 }}>
              <Text style={{ marginTop: 40, color: '#120D26', fontSize: 24, fontWeight: '500', lineHeight: 34, textAlign: 'center', fontFamily: 'AirbnbCereal_M', }}>
                No Events
              </Text>
              <Text style={{ marginTop: 7, color: '#747688', fontSize: 16, fontWeight: '400', lineHeight: 25, textAlign: 'center', opacity: 0.7, fontFamily: 'AirbnbCereal_2', }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor
              </Text>
            </View>
        }
      </View>
    </View>
  )

  // return (
  //   <View style={{ flex: 1, backgroundColor: '#fff' }}>
  //     <View>
  //           <View style={styles.nearbyEventCard}>
  //             <TouchableOpacity style={{}}
  //               onPress={() => navigation.navigate("EventDetails", { item: event })}>
  //               <View style={{ flexDirection: 'row', alignItems: 'center', margin: 7, }}>
  //                 {/* <Image
  //                   style={{ height: 105, width: 105, borderRadius: 12, marginRight: 16, }}
  //                   source={{}}
  //                 /> */}
  //                 <View style={{ marginRight: 27 }}>
  //                   <Text style={{ color: '#5669FF', fontSize: 12, fontWeight: '400', textTransform: 'uppercase',fontFamily: 'AirbnbCereal_M' }}>
  //                     date staring time
  //                   </Text>
  //                   <Text style={{ width: 193, color: '#120D26', fontSize: 18, fontWeight: '400', lineHeight: 25, textAlign: 'auto',fontFamily: 'AirbnbCereal_M' }}>
  //                     name
  //                   </Text>
  //                 </View>
  //               </View>
  //             </TouchableOpacity>
  //           </View>
  //     </View>
  //   </View>
  // )
}

export default OrganizerEvents

const styles = StyleSheet.create({
  nearbyEventCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000000',
    elevation: 1,
    shadowOpacity: 1,
    marginBottom: 16,
    marginTop: 10,
  },
})