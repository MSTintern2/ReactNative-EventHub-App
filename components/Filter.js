import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
// import Slider from "react-native-a11y-slider";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CustomLabel from '../database/CustomLable';
import CustomMarker from '../database/CustomMarker';

const Filter = ({show}) => {
    const navigation = useNavigation();
    const [multiSliderValue, setMultiSliderValue] = useState([60, 220]);
    multiSliderValuesChange = values => setMultiSliderValue(values);
    // console.log(multiSliderValue)
    const [buttonStates, setButtonStates] = useState({
        button1: { backgroundColor: 'white', color: '#807A7A' },
        button2: { backgroundColor: 'white', color: '#807A7A' },
        button3: { backgroundColor: 'white', color: '#807A7A' },
        button4: { backgroundColor: 'white', },
        button5: { backgroundColor: 'white', },
        button6: { backgroundColor: 'white', },
        button7: { backgroundColor: 'white', },
        button8: { backgroundColor: 'white', },
        button9: { backgroundColor: 'white', },
    });

    const handleButtonPress = (buttonId) => {
        const updatedButtonStates = { ...buttonStates };
        updatedButtonStates[buttonId] = {
            backgroundColor: updatedButtonStates[buttonId].backgroundColor === 'white' ? '#5669FF' : 'white',
            color: updatedButtonStates[buttonId].color === '#807A7A' ? '#fff' : '#807A7A',
        };
        setButtonStates(updatedButtonStates);
    };
    return (
        <View>
            {/* Filter 1 */}
            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', marginHorizontal: 30 }}>
                <View style={{ marginRight: 15, alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{ width: 64, height: 64, borderColor: '#E5E5E5', borderRadius: 32, borderWidth: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red', }}
                        onPress={() => {}}>
                        <Image
                            style={{ height: 40, width: 40, tintColor: '#807A7A' }}
                            source={require("../Assets/Icons/fsport.png")}
                        />
                    </TouchableOpacity>
                    <Text style={{ color: '#120D26', fontSize: 14, fontWeight: '400', lineHeight: 23, marginTop: 8, fontFamily: 'AirbnbCereal_M' }}>Sports</Text>
                </View>
                <View style={{ marginRight: 15, alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{ width: 64, height: 64, borderColor: '#E5E5E5', borderRadius: 32, borderWidth: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red', }}
                        onPress={() => {}}>
                        <Image
                            style={{ height: 35, width: 35, tintColor: '#807A7A' }}
                            source={require("../Assets/Icons/FilterIcon1.png")}
                        />
                    </TouchableOpacity>
                    <Text style={{ color: '#120D26', fontSize: 14, fontWeight: '400', lineHeight: 23, marginTop: 8, fontFamily: 'AirbnbCereal_M' }}>Music</Text>
                </View>
                <View style={{ marginRight: 15, alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{ width: 64, height: 64, borderColor: '#E5E5E5', borderRadius: 32, borderWidth: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red', }}
                        onPress={() => {}}>
                        <Image
                            style={{ height: 40, width: 40, tintColor: '#807A7A' }}
                            source={require("../Assets/Icons/fart.png")}
                        />
                    </TouchableOpacity>
                    <Text style={{ color: '#120D26', fontSize: 14, fontWeight: '400', lineHeight: 23, marginTop: 8, fontFamily: 'AirbnbCereal_M' }}>Art</Text>
                </View>
                <View style={{ marginRight: 15, alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{ width: 64, height: 64, borderColor: '#E5E5E5', borderRadius: 32, borderWidth: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red', }}
                        onPress={() => {}}>
                        <Image
                            style={{ height: 40, width: 40, tintColor: '#807A7A' }}
                            source={require("../Assets/Icons/FilterIcon2.png")}
                        />
                    </TouchableOpacity>
                    <Text style={{ color: '#120D26', fontSize: 14, fontWeight: '400', lineHeight: 23, marginTop: 8, fontFamily: 'AirbnbCereal_M' }}>Food</Text>
                </View>
                {/* <View style={{ marginRight: 15, alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{ width: 64, height: 64, borderColor: '#E5E5E5', borderRadius: 32, borderWidth: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: buttonStates.button8.backgroundColor, }}
                        onPress={() => handleButtonPress('button8')}>
                        <Image
                            source={require("../Assets/Icons/FilterIcon1.png")}
                        />
                    </TouchableOpacity>
                    <Text style={{ color: '#120D26', fontSize: 14, fontWeight: '400', lineHeight: 23, marginTop: 8, fontFamily: 'AirbnbCereal_M' }}>Sports</Text>
                </View>
                <View style={{ marginRight: 15, alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{ width: 64, height: 64, borderColor: '#E5E5E5', borderRadius: 32, borderWidth: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: buttonStates.button9.backgroundColor, }}
                        onPress={() => handleButtonPress('button9')}>
                        <Image
                            source={require("../Assets/Icons/FilterIcon2.png")}
                        />
                    </TouchableOpacity>
                    <Text style={{ color: '#120D26', fontSize: 14, fontWeight: '400', lineHeight: 23, marginTop: 8, fontFamily: 'AirbnbCereal_M' }}>Music</Text>
                </View> */}
            </View>
            {/* Time & Date Filter */}
            <View style={{ marginTop: 25, marginHorizontal: 20, }}>
                <Text style={{ color: '#120D26', fontSize: 18, fontWeight: '400', lineHeight: 34, fontFamily: 'AirbnbCereal_M' }}>Time & Date</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
                    <TouchableOpacity
                        style={{ borderRadius: 10, borderColor: '#E6E6E6', borderWidth: 1, backgroundColor: 'red', }}
                        onPress={() => {}}>
                        <Text style={{ color: buttonStates.button1.color, fontSize: 15, fontWeight: '400', lineHeight: 25, paddingVertical: 9, paddingHorizontal: 19, fontFamily: 'AirbnbCereal_M' }}>
                            Today
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ borderRadius: 10, borderColor: '#E6E6E6', borderWidth: 1, backgroundColor: 'red', }}
                        onPress={() => {}}>
                        <Text style={{ color: buttonStates.button2.color, fontSize: 15, fontWeight: '400', lineHeight: 25, paddingVertical: 9, paddingHorizontal: 19, fontFamily: 'AirbnbCereal_M' }}>
                            Tomorrow
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ borderRadius: 10, borderColor: '#E6E6E6', borderWidth: 1, backgroundColor: 'red', }}
                        onPress={() => {}}>
                        <Text style={{ color: buttonStates.button3.color, fontSize: 15, fontWeight: '400', lineHeight: 25, paddingVertical: 9, paddingHorizontal: 19, fontFamily: 'AirbnbCereal_M' }}>
                            This week
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={{ borderRadius: 10, borderColor: '#E6E6E6', borderWidth: 1, marginTop: 14, width: 260, paddingVertical: 9, paddingLeft: 19, }}
                    onPress={() => { }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Image
                            style={{ marginRight: 13 }}
                            source={require("../Assets/Icons/EventDetailsCalendar.png")}
                        />
                        <Text style={{ color: '#807A7A', fontSize: 15, fontWeight: '400', lineHeight: 25, marginRight: 14, fontFamily: 'AirbnbCereal_M' }}>
                            Choose from calender
                        </Text>
                        <Image
                            style={{}}
                            source={require("../Assets/Icons/BlueArrowRight.png")}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            {/* Location Filter */}
            <View style={{ marginTop: 25, marginHorizontal: 20, }}>
                <Text style={{ color: '#120D26', fontSize: 18, fontWeight: '400', lineHeight: 34, fontFamily: 'AirbnbCereal_M' }}>Location</Text>
                <TouchableOpacity
                    style={{ borderRadius: 10, borderColor: '#E6E6E6', borderWidth: 1, marginTop: 10, paddingVertical: 9, paddingHorizontal: 19, }}
                    onPress={() => { }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ backgroundColor: '#e6e9ff', width: 45, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 11, marginRight: 18 }}>
                                <View style={{ backgroundColor: '#fFF', width: 30, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                                    <Image
                                        style={{ width: 15, height: 15 }}
                                        source={require("../Assets/Icons/LocationBlueIcon.png")}
                                    />
                                </View>
                            </View>
                            <Text style={{ color: '#141736', fontSize: 16, fontWeight: '400', lineHeight: 25, fontFamily: 'AirbnbCereal_M' }}>
                                New Yourk, USA
                            </Text>
                        </View>
                        <Image
                            source={require("../Assets/Icons/BlueArrowRight.png")}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            {/* Price Range Filter */}
            <View style={{ marginTop: 24, marginHorizontal: 20, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#120D26', fontSize: 18, fontWeight: '400', lineHeight: 34, fontFamily: 'AirbnbCereal_M' }}>Select price range</Text>
                    <Text style={{ color: '#3F38DD', fontSize: 18, fontWeight: '400', lineHeight: 34, fontFamily: 'AirbnbCereal_M' }}>
                        ${multiSliderValue[0]} - ${multiSliderValue[1]}
                    </Text>
                </View>
                {/* <Slider
                        min={1}
                        max={300}
                        values={[20, 220]}
                        markerComponent={MyMarker}
                        selectedTrackStyle={{color:'red'}}
                    /> */}
                <View style={{ alignItems: 'center', marginTop: 20, }}>
                    <MultiSlider
                        values={[multiSliderValue[0], multiSliderValue[1]]}
                        sliderLength={350}
                        onValuesChange={multiSliderValuesChange}
                        min={0}
                        max={300}
                        step={1}
                        allowOverlap
                        snapped
                        customLabel={CustomLabel}
                        customMarker={CustomMarker}
                        trackStyle={{ height: 3, backgroundColor: '#e6e9ff', }}
                        selectedStyle={{ backgroundColor: '#5669FF', }}
                        unselectedStyle={{ backgroundColor: '#e6e9ff', }}
                    />
                </View>
            </View>
            {/* Buttons */}
            <View style={{ flexDirection: 'row', marginHorizontal: 20, justifyContent: 'space-between', marginTop: 20, }}>
                <TouchableOpacity
                    style={{ borderRadius: 14, borderColor: '#E6E6E6', borderWidth: 1, marginTop: 10, paddingVertical: 19, paddingHorizontal: 40, }}>
                    <Text style={{ color: '#120D26', fontSize: 16, fontWeight: '500', letterSpacing: 1, fontFamily: 'AirbnbCereal_M' }}>RESET</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ borderRadius: 14, backgroundColor: '#5669FF', marginTop: 10, paddingVertical: 19, paddingHorizontal: 66, }}>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: '400', letterSpacing: 1, fontFamily: 'AirbnbCereal_M' }}
                    onPress={()=>{ }}
                    >
                        APPLY
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


export default Filter

const styles = StyleSheet.create({})