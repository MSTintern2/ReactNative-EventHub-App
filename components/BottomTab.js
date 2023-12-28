import { Image, StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler'

const BottomTab = (props) => {
    const navigation = useNavigation();
    return (
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.tabBarButtons}>
                        <View style={styles.tabBarIconContainer}>
                            <Image
                                style={styles.tabBarIcons}
                                source={require("../Assets/Icons/CompassTabBar.png")}
                            />
                            <Text style={styles.tabBarText}>Explore</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabBarButtons}
                    onPress={() => navigation.navigate("Events")}>
                        <View style={styles.tabBarIconContainer}>
                            <Image
                                style={[styles.tabBarIcons, { opacity: 0.5 }]}
                                source={require("../Assets/Icons/CalendarTabBar.png")}
                            />
                            <Text style={[styles.tabBarText, { color: '#2C3550' }]}>Events</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.addButton}
                    onPress={() => navigation.navigate("AddEvent")}>
                        <Image
                            style={styles.addIcons}
                            source={require("../Assets/Icons/Add.png")}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tabBarButtons}
                    onPress={() => navigation.navigate("MapPage")}>
                        <View style={styles.tabBarIconContainer}>
                            <Image
                                style={[styles.tabBarIcons, { opacity: 0.5 }]}
                                source={require("../Assets/Icons/LocationTabBar.png")}
                            />
                            <Text style={[styles.tabBarText, { color: '#2C3550' }]}>Map</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabBarButtons}
                    onPress={() => navigation.navigate("MyProfile")}>
                        <View style={styles.tabBarIconContainer}>
                            <Image
                                style={[styles.tabBarIcons, { opacity: 0.5 }]}
                                source={require("../Assets/Icons/ProfileTabBar.png")}
                            />
                            <Text style={[styles.tabBarText, { color: '#2C3550' }]}>Profile</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
    )
}

export default BottomTab

const styles = StyleSheet.create({
    mainContainer: {
        keyboardHidesTabBar: true,
        // backgroundColor: '#fff',
        // borderColor: '#000000',
        // shadowRadius: 1,
        // shadowOffset: {width: 0, height: -10,},
        // shadowColor: '#000000',
        // shadowOpacity: 100,
        borderTopColor: '#ebebeb',
        borderTopWidth: 2,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 28,
        marginTop: 15,
    },
    tabBarButtons: {
        width: 50,
        height: 50,
        // backgroundColor: 'red',
    },
    tabBarIconContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    tabBarIcons: {
        width: 23,
        height: 23,
    },
    tabBarText: {
        color: '#5669FF',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        marginTop: 2,
        fontFamily: 'AirbnbCereal_M' 
    },
    addButton: {
        position: 'absolute',
        bottom: 43,
        alignSelf: 'center',
        backgroundColor: '#5669FF',
        height: 46,
        width: 46,
        borderRadius: 23,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        elevation: 10,
        shadowOpacity: 1,
    },
    addIcons: {
        height: 20,
        width: 20,
    },
})