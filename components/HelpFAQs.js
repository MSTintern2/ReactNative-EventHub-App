import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, Animated, TouchableHighlight, TextInput, Modal, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
const FAQs = [
  {
    id: 1,
    question: "What is Viral Pitch?",
    answer: "At Viral Pitch we expect at a day’s start is you, better and happier than yesterday. We have got you covered share your concern or check our frequently asked questions listed below.At Viral Pitch we expect at a day’s start is you, better and happier than yesterday. We have got you covered share your concern."
  },
  {
    id: 2,
    question: "How to apply for a campaign?",
    answer: "At Viral Pitch we expect at a day’s start is you, better and happier than yesterday. We have got you covered share your concern or check our frequently asked questions listed below.At Viral Pitch we expect at a day’s start is you, better and happier than yesterday. We have got you covered share your concern."
  },
  {
    id: 3,
    question: "How to know status of a campaign?",
    answer: "At Viral Pitch we expect at a day’s start is you, better and happier than yesterday. We have got you covered share your concern or check our frequently asked questions listed below.At Viral Pitch we expect at a day’s start is you, better and happier than yesterday. We have got you covered share your concern."
  },
  {
    id: 4,
    question: "How to know status of a campaign?",
    answer: "At Viral Pitch we expect at a day’s start is you, better and happier than yesterday. We have got you covered share your concern or check our frequently asked questions listed below.At Viral Pitch we expect at a day’s start is you, better and happier than yesterday. We have got you covered share your concern."
  },
  {
    id: 5,
    question: "How to apply for a campaign?",
    answer: "At Viral Pitch we expect at a day’s start is you, better and happier than yesterday. We have got you covered share your concern or check our frequently asked questions listed below.At Viral Pitch we expect at a day’s start is you, better and happier than yesterday. We have got you covered share your concern."
  },
]

const HelpFAQs = () => {
  const navigation = useNavigation();
  const [show, setShow] = useState(false)
  return (
    <View style={{}}>
      <StatusBar
        backgroundColor="#4A43EC"
        barStyle="light-content"
      />
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingVertical: 12, backgroundColor: '#4A43EC', paddingBottom: 20, }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 24, }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Image
              style={{ height: 22, width: 22, marginRight: 13 }}
              source={require("../Assets/Icons/EventDetailsLeftArrow.png")}
            />
          </TouchableOpacity>
          <Text style={{ color: '#fff', fontSize: 24, fontWeight: '400', fontFamily: 'AirbnbCereal_M'}}>Help Desk</Text>
        </View>
      </View>
      {/* Body */}
      <View style={{}}>
        <View style={{ alignItems: 'center', marginTop: 40, }}>
          <Text style={{ color: '#120D26', fontSize: 30, fontWeight: '400', marginVertical: 10,fontFamily: 'AirbnbCereal_2' }}>
            We’re here to help you with
            anything and everyting on
            ViralPitch
          </Text>
          <Text style={{ color: '#747688', fontSize: 16, fontWeight: '400', marginHorizontal: 20,fontFamily: 'AirbnbCereal_2' }}>
            At Viral Pitch we expect at a day’s start is you, better and happier than yesterday. We have got you covered share your concern or check our frequently asked questions listed below.
          </Text>
        </View>
        {/* faqs */}
        <View style={{ marginTop: 20, marginBottom:1000 }}>
          <Text style={{ color: '#120D26', fontSize: 24, fontWeight: '500', marginVertical: 10, marginLeft: 20, fontFamily: 'AirbnbCereal_M'}}>
            FAQ
          </Text>
          <View style={{ borderColor: '#5B5B5B', borderTopWidth: 1, borderWidth: StyleSheet.hairlineWidth, width: '100%' }}></View>
          <FlatList
            data={FAQs}
            renderItem={({ item }) =>
              <>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, }}>
                  <Text style={{ color: '#5B5B5B', fontSize: 16, fontWeight: '400', marginLeft: 20,fontFamily: 'AirbnbCereal_M' }}>{item.question}</Text>
                  <TouchableOpacity
                    onPress={() => setShow(!show)}>
                    <Text style={{ color: '#5B5B5B', fontSize: 24, fontWeight: '400', marginRight: 20,fontFamily: 'AirbnbCereal_M' }}>+</Text>
                  </TouchableOpacity>
                </View>
                {
                  show ? <Detail /> : null
                }
                <View style={{ borderColor: '#5B5B5B', borderTopWidth: 1, borderWidth: StyleSheet.hairlineWidth, width: '100%' }}></View>
              </>
            }
          />
        </View>
      </View>
    </View>
  )
}
const Detail = () => {
  return (
    <View>
      <Text style={{ color: '#5B5B5B', fontSize: 16, fontWeight: '400', marginHorizontal: 20, marginBottom: 14, }}>At Viral Pitch we expect at a day’s start is you, better and happier than yesterday. We have got you covered share your concern or check our frequently asked questions listed below.At Viral Pitch we expect at a day’s start is you, better and happier than yesterday. We have got you covered share your concern.</Text>
    </View>
  )
}

export default HelpFAQs

const styles = StyleSheet.create({})