import { StyleSheet, Text, View, Image, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Formik } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Please enter email.'),
});

const ResetPassword = (props) => {
    return (
        <Formik initialValues={{
            email: '',
        }}
            validationSchema={SignupSchema}>
            {({ values, errors, touched, handleSubmit, handleChange, setFieldTouched, isValid }) => (
                <SafeAreaView style={styles.container}>
                    <View>
                        <Image
                            style={styles.image}
                            source={require("../Assets/SplashScreen/SplashScreen.png")}
                        />
                    </View>
                    <View style={styles.contentContainer}>
                        <TouchableHighlight
                            onPress={() => props.navigation.navigate("SignIn")}
                            underlayColor={'transparent'}>
                            <Image
                                style={styles.leftarrow}
                                source={require("../Assets/Icons/LeftArrow.png")}
                            />
                        </TouchableHighlight>
                        <View>
                            <Text style={styles.headingText}>Reset Password</Text>
                        </View>
                        <View style={styles.verificationContainer}>
                            <Text style={styles.verificationText}>Please enter your email address to request a password reset</Text>
                        </View>
                        <View style={styles.inputTextContainer}>
                            <Image
                                style={styles.inputTextIcon}
                                source={require("../Assets/Icons/Message.png")}
                            />
                            <TextInput placeholder='abc@email.com' placeholderTextColor='#747688' style={{ color: '#747688', fontSize: 16 ,fontFamily: 'AirbnbCereal_2',flex:1}}
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={() => setFieldTouched('email')}
                            />
                        </View>
                            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
                        <View style={styles.signinContainer}>
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate("SignIn")}
                                style={styles.signinButton}
                                underlayColor={'transparent'}>
                                <View style={styles.signinContent}>
                                    <Text style={styles.signinText}>Send</Text>
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
                </SafeAreaView>
            )}
        </Formik>
    )
}

export default ResetPassword

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
    inputTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 26,
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
    error: {
        color: 'red',
        marginLeft: 30,
        marginTop: 1,
        fontFamily: 'AirbnbCereal_M'
      },
})