import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginLoader from './LoginLoader';

const OnboardingScreen1 = (props) => {
    const navigation = useNavigation();
    //activity loader
    const [visible, setVisible] = useState(false);
    //login info , check login or not
    useEffect(() => {
        setVisible(true)
        checkLogin();
    }, [])
    const checkLogin = async () => {
        const id = await AsyncStorage.getItem('USERID')
        if (id !== null) {
            navigation.navigate("MenuDrawer")
            setVisible(false)
        } else {
            setVisible(false)
            navigation.navigate("OnboardingScreen1")
        }
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <Image
                    style={styles.image}
                    source={require("../Assets/Onboarding/OnboardingImage1.png")}
                />
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.mainTextContainer}>
                    <Text style={styles.mainText}>Explore Upcoming and Nearby Events</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}> In publishing and graphic design, Lorem is a placeholder text commonly </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableHighlight
                        onPress={() => props.navigation.navigate("SignIn")}
                        underlayColor={'transparent'}>
                        <Text style={styles.skipButton}>Skip</Text>
                    </TouchableHighlight>
                    <View style={styles.dotContainer}>
                        <View style={styles.dot1}></View>
                        <View style={styles.dot2}></View>
                        <View style={styles.dot3}></View>
                    </View>
                    <TouchableHighlight
                        onPress={() => props.navigation.navigate("OnboardingScreen2")}
                        underlayColor={'transparent'}>
                        <Text style={styles.nextButton}>Next</Text>
                    </TouchableHighlight>
                </View>
            </View>
            {/* activity loader */}
            <LoginLoader visible={visible} />
        </SafeAreaView>
    )
}

export default OnboardingScreen1

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        // paddingTop: 12,
    },
    image: {
        width: 'auto',
        height: 545,
        marginHorizontal: 45,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 288,
        backgroundColor: '#5669FF',
        borderTopLeftRadius: 48,
        borderTopRightRadius: 48,
    },
    mainTextContainer: {
        marginHorizontal: 40,
        marginTop: 40,
    },
    mainText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 26,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 34,
        fontFamily: 'AirbnbCereal_M'
    },
    textContainer: {
        marginHorizontal: 40,
        marginTop: 16,
    },
    text: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 17,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 25,
        opacity: 0.8,
        fontFamily: 'AirbnbCereal_M'
    },
    buttonContainer: {
        marginTop: 43,
        marginHorizontal: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'red'
    },
    skipButton: {
        color: '#ffffff',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 34,
        opacity: 0.5,
        fontFamily: 'AirbnbCereal_M'
    },
    nextButton: {
        color: '#ffffff',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 34,
        fontFamily: 'AirbnbCereal_M'
    },
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 40,
        height: 8,
    },
    dot1: {
        backgroundColor: '#ffffff',
        height: 8,
        width: 8,
        borderRadius: 4,
    },
    dot2: {
        backgroundColor: '#ffffff',
        height: 8,
        width: 8,
        borderRadius: 4,
        opacity: 0.5,
    },
    dot3: {
        backgroundColor: '#ffffff',
        height: 8,
        width: 8,
        borderRadius: 4,
        opacity: 0.5,
    },
})