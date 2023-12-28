import { Image, StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, TextInput, TouchableOpacity, TouchableHighlight, Modal, Button } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import NearbyEventsCards from './NearbyEventsCards'
import EventCards from './EventCards'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

const MapPage = () => {
    //get location data
    // const getLocationDate = async () => {
    //     try {
    //         const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${myLatitude},${myLongitude}&key=AIzaSyAMqJdgwZaqsleQ8zw2u78_tP-fhDt-9ko`);
    //         const data = await response.json();
    //         console.log('data:', data);
    //         const city = data.results[0].address_components.find((component) => component.types.includes('locality')).long_name;
    //         const country = data.results[0].address_components.find((component) => component.types.includes('country')).long_name;

    //         console.log('City:', city);
    //         console.log('Country:', country);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    const navigation = useNavigation();

    //location permission on mount
    // useEffect(() => {
    //     requestLocationPermission();
    // }, []);
    // location permissions
    // const requestLocationPermission = async () => {
    //     try {
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //             {
    //                 title: 'EventHub App Location Permission',
    //                 message:
    //                     'EventHub App needs access to your Location',
    //                 buttonNeutral: 'Ask Me Later',
    //                 buttonNegative: 'Cancel',
    //                 buttonPositive: 'OK',
    //             },
    //         );
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //             console.log('You can use the location');
    //         } else {
    //             console.log('Location permission denied');
    //         }
    //     } catch (err) {
    //         console.warn(err);
    //     }
    // };

    //get currnet location

    useEffect(() => {
        getCurrentLocation();
        // getLocationDate();
    }, []);
    //get current location
    const [myLatitude, setMyLatitude] = useState(0);
    const [myLongitude, setMyLongitude] = useState(0);
    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                // console.log(position);
                setMyLatitude(position.coords.latitude)
                setMyLongitude(position.coords.longitude)
                // console.log(myLatitude);
                // console.log(myLongitude);
            },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }
    const mapRef = useRef(<MapView></MapView>);
    //my location
    const MyLocation = () => {
        getCurrentLocation();
        const Me = {
            latitude: myLatitude,
            longitude: myLongitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
        };
        mapRef.current?.animateToRegion(Me)
    }
    // Sport Complex Location
    const SportComplexLocation = () => {
        const SportComplex = {
            latitude: 31.45141,
            longitude: 74.27300,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
        };
        mapRef.current?.animateToRegion(SportComplex)
    }
    // Music Location
    const MusicLocation = () => {
        const Music = {
            latitude: 31.33458,
            longitude: 74.23617,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
        };
        mapRef.current?.animateToRegion(Music)
    }
    // Food Location
    const FoodLocation = () => {
        const Food = {
            latitude: 31.31620,
            longitude: 74.38796,
            latitudeDelta: 0.006,
            longitudeDelta: 0.006,
        };
        mapRef.current?.animateToRegion(Food)
    }
    // Art Location
    const ArtLocation = () => {
        const Art = {
            latitude: 31.55827,
            longitude: 74.32910,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
        };
        mapRef.current?.animateToRegion(Art)
    }
    // Race Track Location
    const RaceTrackLocation = () => {
        const RaceTrack = {
            latitude: 31.43701,
            longitude: 74.33220,
            latitudeDelta: 0.011,
            longitudeDelta: 0.011,
        };
        mapRef.current?.animateToRegion(RaceTrack)
    }
    // Cricket Stadium Location 
    const CricketStadiumLocation = () => {
        const Cricket = {
            latitude: 31.51381,
            longitude: 74.33340,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        };
        mapRef.current?.animateToRegion(Cricket)
    }

    return (
        <View style={{ flex: 1, }}>
            {/* map */}
            <MapView
                style={{ width: '100%', height: '100%', }}
                provider={PROVIDER_GOOGLE}
                zoomEnabled={true}
                zoomControlEnabled={true}
                zoomTapEnabled={true}
                initialRegion={INITIAL_REGION}
                ref={mapRef}
            >
                <Marker coordinate={{ latitude: myLatitude, longitude: myLongitude }} title='My Location' description='Your current Location.' pinColor='#4A43EC' />
                <Marker coordinate={{ latitude: 31.45141, longitude: 74.27300 }} title='Johar Sports Complex' description='Johar Town, Lahore, Punjab, Pakistan' pinColor='#F0635A' />
                <Marker coordinate={{ latitude: 31.33458, longitude: 74.23617 }} title='Pakistan Academy of Music and Arts' description='Kot Araian, Lahore, Punjab, Pakistan' pinColor='#F59762' />
                <Marker coordinate={{ latitude: 31.31620, longitude: 74.38796 }} title='Food Street' description='Central Park Housing Scheme, Lahore, Punjab, Pakistan' pinColor='#29D697' />
                <Marker coordinate={{ latitude: 31.55827, longitude: 74.32910 }} title='Alhamra Art Center' description='Garhi Shahu, Lahore, Punjab 54000, Pakistan' pinColor='#46CDFB' />
                <Marker coordinate={{ latitude: 31.43701, longitude: 74.33220 }} title='Lahore Race Club' description='Muslim Town, Lahore, Punjab, Pakistan' pinColor='#D980FA' />
                <Marker coordinate={{ latitude: 31.51381, longitude: 74.33340 }} title='Gaddafi Stadium' description='Gulberg III, Lahore, Punjab 54000, Pakistan' pinColor='#FFC312' />
            </MapView>
            {/* top View */}
            <View style={{ width: '100%', height: 100, position: 'absolute', top: 0, zIndex: 1 }}>
                {/* header */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 25, marginTop: 10, }}>
                    <View style={{ backgroundColor: '#fff', borderRadius: 12, flexDirection: 'row', alignItems: 'center', flex: 1, paddingLeft: 10 }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}>
                            <Image
                                source={require("../Assets/Icons/EventsLeftArrow.png")}
                            />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: '500', color: '#000', fontFamily: 'AirbnbCereal_M', }}>Event Locations on Map</Text>
                    </View>
                    <TouchableOpacity
                        style={{ backgroundColor: '#fff', borderRadius: 12, marginLeft: 12 }}
                        onPress={() => MyLocation()}
                    >
                        <Image
                            style={{ margin: 15, }}
                            source={require("../Assets/Icons/MapCenterICon.png")}
                        />
                    </TouchableOpacity>
                </View>
                {/* Category */}
                <View style={styles.eventCategoryContainer}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity style={[styles.eventCategory, { marginLeft: 25 }]}
                            onPress={() => SportComplexLocation()}>
                            <Image
                                style={styles.eventCategoryIcon}
                                source={require("../Assets/Icons/SportsIcon.png")}
                            />
                            <Text style={styles.eventCategoryText}>Sports</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.eventCategory, { backgroundColor: '#F59762' }]}
                            onPress={() => MusicLocation()}>
                            <Image
                                style={styles.eventCategoryIcon}
                                source={require("../Assets/Icons/MusicIcon.png")}
                            />
                            <Text style={styles.eventCategoryText}>Music</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.eventCategory, { backgroundColor: '#29D697' }]}
                            onPress={() => FoodLocation()}>
                            <Image
                                style={styles.eventCategoryIcon}
                                source={require("../Assets/Icons/FoodIcon.png")}
                            />
                            <Text style={styles.eventCategoryText}>Food</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.eventCategory, { backgroundColor: '#46CDFB' }]}
                            onPress={() => ArtLocation()}>
                            <Image
                                style={styles.eventCategoryIcon}
                                source={require("../Assets/Icons/ArtIcon.png")}
                            />
                            <Text style={styles.eventCategoryText}>Art</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.eventCategory, { backgroundColor: '#D980FA' }]}
                            onPress={() => RaceTrackLocation()}>
                            <Image
                                style={styles.eventCategoryIcon}
                                source={require("../Assets/Icons/FoodIcon.png")}
                            />
                            <Text style={styles.eventCategoryText}>Race Track</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.eventCategory, { backgroundColor: '#FFC312' }]}
                            onPress={() => CricketStadiumLocation()}>
                            <Image
                                style={styles.eventCategoryIcon}
                                source={require("../Assets/Icons/ArtIcon.png")}
                            />
                            <Text style={styles.eventCategoryText}>Cricket Stadium</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}
//initial location , lahore
const INITIAL_REGION = {
    latitude: 31.52674217070878,
    longitude: 74.35085552593931,
    latitudeDelta: 0.3,
    longitudeDelta: 0.3,
};
export default MapPage

const styles = StyleSheet.create({
    eventCategoryContainer: {
        position: 'absolute',
        top: 70,
        zIndex: 1,
        flexDirection: 'row',
        // backgroundColor: 'red',
    },
    eventCategory: {
        width: 'auto',
        height: 39,
        borderRadius: 21,
        backgroundColor: '#F0635A',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 11.3,
        paddingHorizontal: 16.5,
    },
    eventCategoryIcon: {
        width: 17.7,
        height: 17.7,
        marginRight: 8.3,
    },
    eventCategoryText: {
        color: '#ffffff',
        fontSize: 15,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 25,
        fontFamily: 'AirbnbCereal_M',
    },
})























{/* bottom View */ }
{/* <View>
    Cards
    <View style={{zIndex:1}}>
        <View style={{ alignSelf: 'flex-end', marginRight: 25, }}>
            <TouchableOpacity style={{ backgroundColor: '#fff', padding: 9, borderRadius: 50, }}>
                <Image
                    source={require("../Assets/Icons/MapFloatingButton.png")}
                />
            </TouchableOpacity>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <EventCards />
        </ScrollView>
    </View>
</View> */}