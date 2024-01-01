import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import OnboardingScreen1 from './components/OnboardingScreen1';
import OnboardingScreen2 from './components/OnboardingScreen2';
import OnboardingScreen3 from './components/OnboardingScreen3';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Verification from './components/Verification';
import ResetPassword from './components/ResetPassword';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './components/Home';
import MenuDrawer from './components/MenuDrawer';
import BottomTab from './components/BottomTab';
import EventCards from './components/EventCards';
import EventDetails from './components/EventDetails';
import Search from './components/Search';
import Notification from './components/Notification';
import MyProfile from './components/MyProfile';
import OrganizerProfile from './components/OrganizerProfile';
import AllUpcomingEvents from './components/AllUpcomingEvents';
import AllNearbyEvents from './components/AllNearbyEvents';
import AllEvents from './components/AllEvents';
import Events from './components/Events';
import Calender from './components/Calender';
import MapPage from './components/MapPage';
import ContactUS from './components/ContactUS';
import Bookmark from './components/Bookmark';
import HelpFAQs from './components/HelpFAQs';
import UpgradePro from './components/UpgradePro';
import Messages from './components/Messages';
import Chat from './components/Chat';
import { enableLatestRenderer } from 'react-native-maps';
import AddEvent from './components/AddEvent';
import SportHome from './components/SportHome';
import BuyTicket from './components/BuyTicket';
import Setting from './components/Setting';
// import OnboardingScreen from './components/OnboardingScreen';

const Stack = createStackNavigator();
enableLatestRenderer();

const App = () => {

  //splash screen
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 300)
  }, []);

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor="#ffffff"
        barStyle="dark-content"
      />
      <Stack.Navigator
      // initialRouteName='Onboarding'
      >
        <Stack.Screen name="OnboardingScreen1" component={OnboardingScreen1} options={{ headerShown: false }} />
        <Stack.Screen name="OnboardingScreen2" component={OnboardingScreen2} options={{ headerShown: false }} />
        <Stack.Screen name="OnboardingScreen3" component={OnboardingScreen3} options={{ headerShown: false }} />

        {/* <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ headerShown: false }} /> */}

        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Verification" component={Verification} options={{ headerShown: false }} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
        <Stack.Screen name="MenuDrawer" component={MenuDrawer} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="EventDetails" component={EventDetails} options={{ headerShown: false }} />
        <Stack.Screen name="AllEvents" component={AllEvents} options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
        <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
        <Stack.Screen name="MyProfile" component={MyProfile} options={{ headerShown: false }} />
        <Stack.Screen name="OrganizerProfile" component={OrganizerProfile} options={{ headerShown: false }} />
        <Stack.Screen name="AllUpcomingEvents" component={AllUpcomingEvents} options={{ headerShown: false }} />
        <Stack.Screen name="AllNearbyEvents" component={AllNearbyEvents} options={{ headerShown: false }} />
        <Stack.Screen name="Events" component={Events} options={{ headerShown: false }} />
        <Stack.Screen name="Calender" component={Calender} options={{ headerShown: false }} />
        <Stack.Screen name="MapPage" component={MapPage} options={{ headerShown: false }} />
        <Stack.Screen name="ContactUS" component={ContactUS} options={{ headerShown: false }} />
        <Stack.Screen name="Bookmark" component={Bookmark} options={{ headerShown: false }} />
        <Stack.Screen name="HelpFAQs" component={HelpFAQs} options={{ headerShown: false }} />
        <Stack.Screen name="UpgradePro" component={UpgradePro} options={{ headerShown: false }} />
        <Stack.Screen name="Messages" component={Messages} options={{ headerShown: false }} />
        <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
        <Stack.Screen name="AddEvent" component={AddEvent} options={{ headerShown: false }} />
        <Stack.Screen name="BuyTicket" component={BuyTicket} options={{ headerShown: false }} />
        <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})