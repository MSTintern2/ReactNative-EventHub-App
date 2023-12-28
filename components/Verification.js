import { StyleSheet, Text, View, Image, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';

const Verification = (props) => {
    const navigation = useNavigation();

    //20 sec timer
    const [counter, setCounter] = useState(20);
    useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    //auto shift focus on inputfields
    const ref_input1 = useRef();
    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();

    //get input values
    const [v1, setV1] = useState('');
    const [v2, setV2] = useState('');
    const [v3, setV3] = useState('');
    const [v4, setV4] = useState('');
    const [error, setError] = useState(false);
    //check code is 4567
    const checkCodeAndGoNext = () => {
        let hasError = false;
        if (!v1 || !v2 || !v3 || !v4) {
            hasError = true;
        } else if (v1 != 4 || v2 != 5 || v3 != 6 || v4 != 7) {
            hasError = true;
        }
        setError(hasError);
        if (!hasError) {
            navigation.navigate("SignIn");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* bg  */}
            <View>
                <Image
                    style={styles.image}
                    source={require("../Assets/SplashScreen/SplashScreen.png")}
                />
            </View>
            <View style={styles.contentContainer}>
                {/* back btn */}
                <TouchableHighlight
                    onPress={() => props.navigation.navigate("SignUp")}
                    underlayColor={'transparent'}>
                    <Image
                        style={styles.leftarrow}
                        source={require("../Assets/Icons/LeftArrow.png")}
                    />
                </TouchableHighlight>
                {/* heading */}
                <View>
                    <Text style={styles.headingText}>Verification</Text>
                </View>
                <View style={styles.verificationContainer}>
                    <Text style={styles.verificationText}>Please enter the verification code.</Text>
                    <Text style={styles.verificationText}>Verification code is 4567.</Text>
                </View>
                {/* code input field */}
                <View style={styles.inputFieldContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder='_'
                            placeholderTextColor="#747688"
                            style={styles.inputText}
                            keyboardType='numeric'
                            maxLength={1}
                            //focus
                            ref={ref_input1}
                            autoFocus={true}
                            returnKeyType="next"
                            // onSubmitEditing={() => ref_input2.current.focus()}
                            value={v1}
                            onChangeText={text => { setV1(text), text && ref_input2.current.focus() }} //forword
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder='_'
                            placeholderTextColor="#747688"
                            style={styles.inputText}
                            keyboardType='numeric'
                            maxLength={1}
                            //focus
                            ref={ref_input2}
                            returnKeyType="next"
                            // onSubmitEditing={() => ref_input3.current.focus()}
                            value={v2}
                            onChangeText={text => { setV2(text), text ? ref_input3.current.focus() : ref_input1.current.focus() }}
                            // onChangeText={text => text ? ref_input3.current.focus() : ref_input1.current.focus()} //forword&backword
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder='_'
                            placeholderTextColor="#747688"
                            style={styles.inputText}
                            keyboardType='numeric'
                            maxLength={1}
                            //focus
                            ref={ref_input3}
                            returnKeyType="next"
                            // onSubmitEditing={() => ref_input4.current.focus()}
                            value={v3}
                            onChangeText={text => { setV3(text), text ? ref_input4.current.focus() : ref_input2.current.focus() }}
                            // onChangeText={text => text ? ref_input4.current.focus() : ref_input2.current.focus()} //forword&backword
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder='_'
                            placeholderTextColor="#747688"
                            style={styles.inputText}
                            keyboardType='numeric'
                            maxLength={1}
                            //focus
                            ref={ref_input4}
                            value={v4}
                            onChangeText={text => { setV4(text), !text && ref_input3.current.focus() }}
                        // onChangeText={text => !text && ref_input3.current.focus()} //backword
                        />
                    </View>
                </View>
                {error ? <Text style={styles.error}>Please enter correct verification code.</Text> : null}
                {/* Continue btn */}
                <View style={styles.signinContainer}>
                    <TouchableOpacity
                        onPress={checkCodeAndGoNext}
                        style={styles.signinButton}
                        underlayColor={'transparent'}>
                        <View style={styles.signinContent}>
                            <Text style={styles.signinText}>Continue</Text>
                            <TouchableOpacity style={styles.signinIcon}>
                                <Image
                                    style={styles.arrowIcon}
                                    source={require("../Assets/Icons/RightArrow.png")}
                                />
                                {/* <Icon name="arrow-right" size={20} color="#900" /> */}
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* 20 sec counter */}
                <View style={styles.resendCodeContainer}>
                    <Text style={styles.resendCodeText}>Re-send code in</Text>
                    <Text style={[styles.resendCodeText, { marginLeft: 6, color: '#5669FF' }]}>0:{counter}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Verification

const styles = StyleSheet.create({
    error: {
        color: 'red',
        marginLeft: 30,
        marginTop: 1,
        fontFamily: 'AirbnbCereal_M'
    },
    container: {
        flex: 1,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    contentContainer: {
        position: 'absolute',
        top: 0,
        height: '100%',
        width: '100%',
        // backgroundColor: 'red'
    },
    leftarrow: {
        marginTop: 40,
        marginLeft: 24,
    },
    headingText: {
        color: '#000000',
        fontSize: 26,
        fontStyle: 'normal',
        fontWeight: '400',
        marginTop: 20,
        marginLeft: 29,
        fontFamily: 'AirbnbCereal_M'
    },
    verificationContainer: {
        marginTop: 12,
        marginLeft: 28,
        marginRight: 103
    },
    verificationText: {
        color: '#120D26',
        fontSize: 17,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 25,
        fontFamily: 'AirbnbCereal_M'
    },
    inputFieldContainer: {
        flexDirection: 'row',
        marginHorizontal: 35,
        marginTop: 27,
        justifyContent: 'space-between',
    },
    inputContainer: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E4DFDF',
    },
    inputText: {
        color: '#747688',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '400',
        marginTop: 13,
        marginBottom: 11,
        marginLeft: 20,
        marginRight: 20,
        fontFamily: 'AirbnbCereal_2'
    },
    signinContainer: {
        marginHorizontal: 52,
        marginTop: 40,
    },
    signinButton: {
        backgroundColor: '#5669FF',
        borderRadius: 12,
        shadowColor: 'black',
        elevation: 10,
        shadowOpacity: 1,
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
    resendCodeContainer: {
        marginTop: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    resendCodeText: {
        color: '#120D26',
        textAlign: 'center',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 25,
        fontFamily: 'AirbnbCereal_M'
    },
})