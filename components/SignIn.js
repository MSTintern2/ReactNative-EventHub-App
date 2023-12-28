import { StyleSheet, Text, View, Image, TextInput, TouchableHighlight, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Switch } from 'react-native-switch'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginLoader from './LoginLoader';

const SignIn = (props) => {
    const navigation = useNavigation();
    //activity loader
    const [visible, setVisible] = useState(false);
    //remember me switch
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    //get input data 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //show / hide password
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    //error
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    //validarion & login
    const validDataLogin = async () => {
        { !email ? setEmailError(true) : setEmailError(false) }
        { !password ? setPasswordError(true) : setPasswordError(false) }
        if (!email || !password) { return; }
        setVisible(true)
        //firebase
        firestore().collection('users').where('email', '==', email).get()
            .then(
                res => {
                    // console.log(JSON.stringify(res.docs[0].data()));
                    if (res.docs[0].data().password == password) {
                        loginData(res.docs[0].data().name, res.docs[0].data().email, res.docs[0].data().userId);
                    } else {
                        setVisible(false)
                        Alert.alert('Login Fail', 'Password not match with entered Email. Try Again', [
                            { text: 'OK', onPress: () => { } },
                        ]);
                    }
                })
            .catch(err => {
                setVisible(false)
                Alert.alert('404 Not Found', 'Sorry! User not found. Try Again', [
                    { text: 'OK', onPress: () => { } },
                ]);
            })
    }
    //save login data in Async storage
    const loginData = async (name, email, userId) => {
        await AsyncStorage.setItem('NAME', name);
        await AsyncStorage.setItem('EMAIL', email);
        await AsyncStorage.setItem('USERID', userId);
        setVisible(false)
        setEmail('')
        setPassword('')
        navigation.navigate("MenuDrawer")
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* bg */}
            <View>
                <Image
                    style={styles.image}
                    source={require("../Assets/SplashScreen/SplashScreen.png")}
                />
            </View>
            <View style={styles.contentContainer}>
                {/* logo & heading */}
                <Image
                    style={styles.logoImage}
                    source={require("../Assets/Logo/EventHubLogo.png")}
                />
                <Text style={styles.appName}>EventHub</Text>
                <Text style={styles.headingText}>Sign in</Text>
                {/* email */}
                <View style={styles.inputTextContainer}>
                    <Image
                        style={styles.inputTextIcon}
                        source={require("../Assets/Icons/Message.png")}
                    />
                    <TextInput placeholder='abc@email.com'
                    placeholderTextColor='#747688' style={{ color: '#747688', fontSize: 16, flex: 1,fontFamily: 'AirbnbCereal_2' }}
                        value={email}
                        onChangeText={txt => setEmail(txt)} />
                </View>
                {emailError ? <Text style={styles.error}>Please enter email.</Text> : null}
                {/* password */}
                <View style={styles.inputTextContainer}>
                    <Image
                        style={styles.inputTextIcon}
                        source={require("../Assets/Icons/Lock.png")}
                    />
                    <TextInput placeholder='Your password' placeholderTextColor='#747688' secureTextEntry={!showPassword} style={{ color: '#747688', fontSize: 16, flex: 1,fontFamily: 'AirbnbCereal_2' }}
                        value={password}
                        onChangeText={txt => setPassword(txt)}
                    />
                    <TouchableOpacity
                        onPress={toggleShowPassword} >
                        <View>
                            {
                                showPassword ? <Image
                                    style={{ height: 25, width: 25, marginRight: 10, }}
                                    source={require("../Assets/Icons/Pshow.png")}
                                /> : <Image
                                    style={{ height: 25, width: 25, marginRight: 10, }}
                                    source={require("../Assets/Icons/Phide.png")}
                                />
                            }
                        </View>
                    </TouchableOpacity>
                </View>
                {passwordError ? <Text style={styles.error}>Please enter password.</Text> : null}
                {/* remember me button */}
                <View style={styles.optionsContainer}>
                    <View style={styles.switchContainer}>
                        <Switch
                            value={isEnabled}
                            onValueChange={toggleSwitch}
                            activeText={''} inActiveText={''}
                            circleSize={22} barHeight={25}
                            circleBorderWidth={0}
                            backgroundActive={'#5669FF'} backgroundInactive={'#E4DFDF'}
                            circleActiveColor={'#ffffff'} circleInActiveColor={'#ffffff'}
                            switchLeftPx={3} switchRightPx={3}
                        />
                        <Text style={styles.switchText}>Remember Me</Text>
                    </View>
                    <View>
                        <TouchableHighlight
                            onPress={() => props.navigation.navigate("ResetPassword")}
                            underlayColor={'transparent'}>
                            <Text style={styles.forgotText}>Forgot Password?</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                {/* sign in btn */}
                <View style={styles.signinContainer}>
                    <TouchableOpacity
                        onPress={validDataLogin}
                        style={styles.signinButton}
                        underlayColor={'transparent'}>
                        <View style={styles.signinContent}>
                            <Text style={styles.signinText}>Sign in</Text>
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
                {/* or */}
                <View style={styles.orTextContainer}>
                    <Text style={styles.orText}>OR</Text>
                </View>
                {/* Login with Google */}
                <View style={[styles.signinContainer, { marginTop: 5 }]}>
                    <TouchableOpacity
                        onPress={() => console.warn("Feature not available.")}
                        style={[styles.signinButton, { backgroundColor: '#ffffff' }]}
                        underlayColor={'transparent'}>
                        <View style={[styles.signinContent, { marginTop: 17, marginBottom: 14 }]}>
                            <Image
                                style={{ marginRight: 20 }}
                                source={require("../Assets/Icons/Google.png")}
                            />
                            <Text style={styles.otherLoginButtonText}>Login with Google</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* Login with Facebook */}
                <View style={[styles.signinContainer, { marginTop: 17 }]}>
                    <TouchableOpacity
                        onPress={() => console.warn("Feature not available.")}
                        style={[styles.signinButton, { backgroundColor: '#ffffff' }]}
                        underlayColor={'transparent'}>
                        <View style={[styles.signinContent, { marginTop: 17, marginBottom: 14 }]}>
                            <Image
                                style={{ marginRight: 20 }}
                                source={require("../Assets/Icons/Facebook.png")}
                            />
                            <Text style={styles.otherLoginButtonText}>Login with Facebook</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* go to sign up */}
                <View style={styles.notHaveAccount}>
                    <Text style={styles.notHaveAccountText}>Don’t have an account?</Text>
                    <TouchableHighlight
                        onPress={() => props.navigation.navigate("SignUp")}
                        style={{ marginLeft: 8 }}
                        underlayColor={'transparent'}>
                        <Text style={[styles.notHaveAccountText, { color: '#5669FF' }]}>Sign up</Text>
                    </TouchableHighlight>
                </View>
            </View>
            {/* activity loader */}
            <LoginLoader visible={visible} />
        </SafeAreaView>
    )
}

export default SignIn

const styles = StyleSheet.create({
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
    logoImage: {
        height: 59,
        width: 56,
        marginHorizontal: 180,
        marginTop: 31,
    },
    appName: {
        color: '#37364A',
        textAlign: 'center',
        fontSize: 45,
        fontStyle: 'normal',
        fontWeight: 'bold',
        lineHeight: 60,
        fontFamily: 'AirbnbCereal_M'
    },
    headingText: {
        color: '#000000',
        fontSize: 26,
        fontStyle: 'normal',
        fontWeight: '400',
        marginTop: 30,
        marginLeft: 29,
        fontFamily: 'AirbnbCereal_M'
    },
    inputTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 11,
        marginRight: 30,
        marginLeft: 28,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E4DFDF',
    },
    inputTextIcon: {
        height: 22,
        width: 22,
        marginVertical: 17,
        marginHorizontal: 15,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    switchText: {
        marginLeft: 10,
        color: '#000000',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 23,
        fontFamily: 'AirbnbCereal_2'
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 21,
        marginRight: 30,
        marginLeft: 28,
    },
    forgotText: {
        color: '#120D26',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 23,
        fontFamily: 'AirbnbCereal_M'
    },
    signinContainer: {
        marginHorizontal: 52,
        marginTop: 36,
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
    orTextContainer: {
        marginTop: 24,
    },
    orText: {
        color: '#9D9898',
        textAlign: 'center',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 34,
        fontFamily: 'AirbnbCereal_M'
    },
    otherLoginButtonText: {
        color: '#120D26',
        textAlign: 'center',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 25,
        fontFamily: 'AirbnbCereal_M'
    },
    notHaveAccount: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
    },
    notHaveAccountText: {
        color: '#120D26',
        textAlign: 'center',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 25,
        fontFamily: 'AirbnbCereal_M'
    },
    error: {
        color: 'red',
        marginLeft: 30,
        marginTop: 1,
        fontFamily: 'AirbnbCereal_M',
    },
})