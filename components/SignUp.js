import { StyleSheet, Text, View, Image, TextInput, TouchableHighlight, TouchableOpacity,Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid'

const SignUp = (props) => {
  const navigation = useNavigation();
  //get form data 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  //clear data
  const clearData = () => {
    setName(''), setEmail(''), setPassword(''), setCPassword('')
  }
  //show / hide password
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  //error
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [cPasswordError, setCPasswordError] = useState(false);
  const [passwordCheckError, setPasswordCheckError] = useState(false);
  //validarion & add data to firebase  
  const validDataAddToFirebase = async () => {
    { !name ? setNameError(true) : setNameError(false) }
    { !email ? setEmailError(true) : setEmailError(false) }
    { !password ? setPasswordError(true) : setPasswordError(false) }
    { !cPassword ? setCPasswordError(true) : setCPasswordError(false) }
    { cPassword != password ? setPasswordCheckError(true) : setPasswordCheckError(false) }
    if (!name || !email || !password || !cPassword) { return; }
    let hasError = false; 
    if (cPassword != password) { hasError = true; return; }
    setPasswordCheckError(hasError);
    //add data to firebase
    const userId = uuid.v4()
    firestore().collection('users').doc(userId).set({
      userId: userId,
      name: name,
      email: email,
      password: password,
      bookmarks: [],
      phone: "", 
      about: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      followers: [],
      following: [],
      intrest: [],
      profileImage: "",
    })
      .then(
        res => {
          Alert.alert('New User', 'New User created successfully.', [
            {text: 'OK', onPress: () => navigation.navigate("Verification")},
          ]);
        }
      )
      .catch(err => {
        alert(err)
      });
  }
  //add data to firebase
  // const addFormData = async () => {
  //   //id generate using uuid packet
  //   const userId = uuid.v4()
  //   firestore().collection('users').doc(userId).set({
  //     userId: userId,
  //     name: name,
  //     email: email,
  //     password: password
  //   })
  //     .then(
  //       res => {
  //         alert('User Created')
  //       }
  //     )
  //     .catch(err => {
  //       alert(err)
  //     });
  // }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.image}
          source={require("../Assets/SplashScreen/SplashScreen.png")}
        />
      </View>
      <View style={styles.contentContainer}>
        {/* header */}
        <TouchableHighlight
          onPress={() => props.navigation.navigate("SignIn")}
          underlayColor={'transparent'}>
          <Image
            style={styles.leftarrow}
            source={require("../Assets/Icons/LeftArrow.png")}
          />
        </TouchableHighlight>
        <Text style={styles.headingText}>Sign up</Text>
        {/* body */}
        {/* name */}
        <View style={styles.inputTextContainer}>
          <Image
            style={styles.inputTextIcon}
            source={require("../Assets/Icons/Profile.png")}
          />
          <TextInput placeholder='Full name' placeholderTextColor='#747688' style={{ color: '#747688', fontSize: 16, flex: 1,fontFamily: 'AirbnbCereal_2' }}
            value={name}
            onChangeText={txt => setName(txt)}
          />
        </View>
        {nameError ? <Text style={styles.error}>Please enter name.</Text> : null}
        {/* email */}
        <View style={styles.inputTextContainer}>
          <Image
            style={styles.inputTextIcon}
            source={require("../Assets/Icons/Message.png")}
          />
          <TextInput placeholder='abc@email.com' placeholderTextColor='#747688' style={{ color: '#747688', fontSize: 16, flex: 1,fontFamily: 'AirbnbCereal_2' }}
            value={email}
            onChangeText={txt => setEmail(txt)}
          />
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
        {/* confirm password */}
        <View style={styles.inputTextContainer}>
          <Image
            style={styles.inputTextIcon}
            source={require("../Assets/Icons/Lock.png")}
          />
          <TextInput placeholder='Confirm password' placeholderTextColor="#747688" secureTextEntry={!showPassword1} style={{ color: '#747688', fontSize: 16, flex: 1,fontFamily: 'AirbnbCereal_2' }}
            value={cPassword}
            onChangeText={txt => setCPassword(txt)}
          />
          <TouchableOpacity
            onPress={toggleShowPassword1} >
            <View>
              {
                showPassword1 ? <Image
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
        {cPasswordError ? <Text style={styles.error}>Please enter password again.</Text> : null}
        {passwordCheckError ? <Text style={styles.error}>Password not match.</Text> : null}
        {/* sign in button */}
        <View style={styles.signinContainer}>
          <TouchableOpacity
            style={[styles.signinButton, { backgroundColor: '#5669FF' }]}
            onPress={validDataAddToFirebase}
            // onPress={() => navigation.navigate("Verification")}
            underlayColor={'transparent'}>
            <View style={styles.signinContent}>
              <Text style={styles.signinText}>Sign up</Text>
              <View style={[styles.signinIcon, { backgroundColor: '#5669FF' }]}>
                <Image
                  style={[styles.arrowIcon, { backgroundColor: '#5669FF' }]}
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
        {/* login with google */}
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
        {/* login with facebook */}
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
         {/* go to sign in page      */}
        <View style={styles.notHaveAccount}>
          <Text style={styles.notHaveAccountText}>Don’t have an account?</Text>
          <TouchableHighlight
            onPress={() => navigation.navigate("SignIn")}
            style={{ marginLeft: 8 }}
            underlayColor={'transparent'}>
            <Text style={[styles.notHaveAccountText, { color: '#5669FF' }]}>Sign in</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SignUp

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
  inputTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
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
  },
  signinContainer: {
    marginHorizontal: 52,
    marginTop: 20,
  },
  signinButton: {
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
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    height: 18,
    width: 18,
  },
  orTextContainer: {
    marginTop: 10,
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
  leftarrow: {
    marginTop: 40,
    marginLeft: 24,
  },
  error: {
    color: 'red',
    marginLeft: 30,
    marginTop: 1,
    fontFamily: 'AirbnbCereal_M'
  },
})