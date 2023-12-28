import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';


const OrganizerAbout = ({ route }) => {
    const { oId } = route.params;
    // console.log(oId)
    useEffect(() => {
        getOrganizerAbout();
    }, []);
    const [organizerAbout, setOrganizerAbout] = useState('');
    const getOrganizerAbout = async () => {
        const data = await firestore().collection('users').doc(oId).get();
        setOrganizerAbout(data._data.about)
    }

    return (
        <View style={{ paddingHorizontal: 0, paddingTop: 20, flex: 1, backgroundColor: '#fff' }}>
            <Text style={{ color: '#3C3E56', fontSize: 18, fontWeight: '400', lineHeight: 25, textAlign: 'justify', fontFamily: 'AirbnbCereal_2' }}>
                {organizerAbout}
            </Text>
            {/* <TouchableHighlight style={{marginTop:4,}}>
            <Text style={{ color: '#5669FF', fontSize: 16, fontWeight: '400', textAlign: 'right',fontFamily: 'AirbnbCereal_M' }}>Read More...</Text>
          </TouchableHighlight> */}
        </View>
    )
}

export default OrganizerAbout

const styles = StyleSheet.create({})