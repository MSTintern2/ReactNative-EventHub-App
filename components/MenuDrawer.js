import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, Animated, FlatList, TouchableHighlight, TextInput, Modal, BackHandler, Alert } from 'react-native'
import React, { useRef, useState, useEffect, Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from './Home';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import usersInfo from '../database/UserInfo';
import Filter from './Filter';
import firestore from '@react-native-firebase/firestore';
// import { collection, getDocs, where, orderBy, limit } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CustomLabel from '../database/CustomLable';
import CustomMarker from '../database/CustomMarker';
import LoginLoader from './LoginLoader';

const MenuDrawer = () => {
    //go back from home , exit app

    let currentDate;
    let tomorrowDate;
    let weekDate;
    //activity loader
    const [visible, setVisible] = useState(false);
    //apply filter
    const applyFilter = async () => {
        setVisible(true)
        currentDate = getCurrentDate()
        console.log("currentDate " + currentDate)
        // try {
        //     setVisible(true)
        //     let tempAllEventsData = [];
        //     console.log("in if of selectedCategories")
        //     await firestore().collection('events').where("eventCategory", "in", selectedCategories).get()
        //         .then(
        //             res => {
        //                 if (res.docs != []) {
        //                     res.docs.map(item => {
        //                         tempAllEventsData.push(item.data())
        //                     })
        //                     setFilteredEvents(tempAllEventsData);
        //                     console.log(filteredEvents);
        //                     if (showTodayEvents) {
        //                         todayFilter()
        //                     }
        //                     if (showTomorrowEvents) {
        //                         tomorrowFilter()
        //                     }
        //                     if (showWeekEvents) {
        //                         weekFilter()
        //                     }
        //                 }
        //                 // console.log(JSON.stringify(res.docs[0].data().eventDate));
        //             });
        // }
        // catch (error) {
        //     console.log(error)
        // }
        if (showTodayEvents) {
            todayFilter()
        }
        if (showTomorrowEvents) {
            tomorrowFilter()
        }
        if (showWeekEvents) {
            weekFilter()
        }

        // setVisible(true)
        // console.log(selectedCategories)
        // let query = firestore().collection('events');
        // if (selectedCategories.length === 1) {
        //     switch (selectedCategories[0]) {
        //         case 'Sport':
        //             query = query.where('eventCategory', '==', 'Sport');
        //             break;
        //         case 'Music':
        //             query = query.where('eventCategory', '==', 'Music');
        //             break;
        //         case 'Art':
        //             query = query.where('eventCategory', '==', 'Art');
        //             break;
        //         case 'Food':
        //             query = query.where('eventCategory', '==', 'Food');
        //             break;
        //         default:
        //         // console.log("in default")
        //     }
        // } else if (selectedCategories.length === 2) {
        //     switch (selectedCategories[0]) {
        //         case 'Sport', 'Music':
        //             query = query.where('eventCategory', 'in', ['Sport', 'Music']);
        //             break;
        //         case 'Sport', 'Food':
        //             query = query.where('eventCategory', 'in', ['Sport', 'Food']);
        //             break;
        //         case 'Sport', 'Art':
        //             query = query.where('eventCategory', 'in', ['Sport', 'Art']);
        //             break;
        //         case 'Music', 'Food':
        //             query = query.where('eventCategory', 'in', ['Music', 'Food']);
        //             break;
        //         case 'Music', 'Art':
        //             query = query.where('eventCategory', 'in', ['Music', 'Art']);
        //             break;
        //         case 'Art', 'Food':
        //             query = query.where('eventCategory', 'in', ['Art', 'Food']);
        //             break;
        //         default:
        //         // console.log("in default")
        //     }
        // } else if (selectedCategories.length === 3) {
        //     switch (selectedCategories[0]) {
        //         case 'Sport', 'Music', 'Art':
        //             query = query.where('eventCategory', 'in', ['Sport', 'Music', 'Art']);
        //             break;
        //         case 'Sport', 'Music', 'Food':
        //             query = query.where('eventCategory', 'in', ['Sport', 'Music', 'Food']);
        //             break;
        //         case 'Sport', 'Food', 'Art':
        //             query = query.where('eventCategory', 'in', ['Sport', 'Food', 'Art']);
        //             break;
        //         case 'Music', 'Art', 'Food':
        //             query = query.where('eventCategory', 'in', ['Music', 'Art', 'Food']);
        //             break;
        //         default:
        //         // console.log("in default")
        //     }
        // } else if (selectedCategories.length === 4) {
        //     query = query.where('eventCategory', 'in', ['Sport', 'Food', 'Art', 'Music']);
        // }
        // // let selectedDate = '29-12-2023'
        // // if (selectedDate) {
        // //     query = query.where('eventDate', '==', selectedDate);
        // // }
        // // if (selectedPriceRange) {
        // //     const [minPrice, maxPrice] = selectedPriceRange.split('-');
        // //     query = query.where('eventTicketPrice', '>=', minPrice).where('eventTicketPrice', '<=', maxPrice);
        // // }
        // const snapshot = await query.get();
        // setEvents(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        // setonApplyFilter(true)
        // setShow(false)
        // setSelectedCategories([])
        // setVisible(false)
        setonApplyFilter(true)
        setShow(false)
        setSelectedCategories([])
        setShowSportEvents(false)
        setShowMusicEvents(false)
        setShowFoodEvents(false)
        setShowArtEvents(false)
        setShowTodayEvents(false)
        setShowTomorrowEvents(false)
        setShowWeekEvents(false)
        setVisible(false)
    };
    const todayFilter = () => {
        console.log("in if of showTodayEvents")
        currentDate = getCurrentDate()
        console.log("currentDate " + currentDate)
        console.log("before today filter ")
        const todayFilteredEvents = filteredEvents1.filter((event) => event.eventDate === currentDate);
        setFilteredEvents1(todayFilteredEvents)
        console.log("after today filter ")
        console.log(filteredEvents1)
    }
    const tomorrowFilter = () => {
        console.log("in if of showTomorrowEvents")
        tomorrowDate = getTomorrowDate()
        console.log("tomorrowdate " + tomorrowDate)
        console.log("before tomorrow filter ")
        const todayFilteredEvents = filteredEvents1.filter((event) => event.eventDate === tomorrowDate);
        setFilteredEvents1(todayFilteredEvents)
        console.log("after tomorrow filter ")
        console.log(filteredEvents1)
    }
    const weekFilter = () => {
        console.log("in if of showWeekEvents")
        const weekDates = getWeekDates()
        console.log("week Start " + weekDates.formattedStart)
        console.log("week end " + weekDates.formattedEnd)
        console.log("before week filter ")
        let ff = []
        const todayFilteredEvents = filteredEvents1.filter((event) => event.eventDate <= weekDates.formattedEnd);
        ff = todayFilteredEvents
        console.log("ff" + ff)
        const todayFilteredEvents1 = ff.filter((event) => event.eventDate >= weekDates.formattedStart);
        setFilteredEvents1(todayFilteredEvents1)
        console.log("after week filter ")
        console.log(filteredEvents1)
    }

    const [onApplyFilter, setonApplyFilter] = useState(false);
    // const [onApplyFilter1, setonApplyFilter1] = useState(false);
    const [filteredEvents, setFilteredEvents] = useState("");

    // const [todayFilteredEvents, setTodayFilteredEvents] = useState("");
    //reset filter
    const resetFilter = () => {
        setShow(false)
        setonApplyFilter(false)
        setShowSportEvents(false)
        setShowMusicEvents(false)
        setShowFoodEvents(false)
        setShowArtEvents(false)
        setSelectedCategories([])
    }
    //cross filter view 
    const closeFilter = () => {
        setonApplyFilter(false)
        setSelectedCategories([])
    }
    //price filter slider
    const [multiSliderValue, setMultiSliderValue] = useState([0, 999]);
    multiSliderValuesChange = values => setMultiSliderValue(values);
    //category filter 
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [showSportEvents, setShowSportEvents] = useState(false);
    const [showMusicEvents, setShowMusicEvents] = useState(false);
    const [showFoodEvents, setShowFoodEvents] = useState(false);
    const [showArtEvents, setShowArtEvents] = useState(false);
    const [showTodayEvents, setShowTodayEvents] = useState(false);
    const [showTomorrowEvents, setShowTomorrowEvents] = useState(false);
    const [showWeekEvents, setShowWeekEvents] = useState(false);
    // console.log(selectedCategories)
    const [filteredEvents1, setFilteredEvents1] = useState('');
    const SportBtn = async () => {
        setShowSportEvents(!showSportEvents)
        setShowMusicEvents(false)
        setShowFoodEvents(false)
        setShowArtEvents(false)
        // setSelectedCategories((prevCategories) =>
        //     prevCategories.includes("Sport")
        //         ? prevCategories.filter((cat) => cat !== "Sport")
        //         : [...prevCategories, "Sport"])
        let tempAllEventsData = [];
        await firestore().collection('events').where("eventCategory", "==", "Sport").get()
            .then(
                res => {
                    if (res.docs != []) {
                        res.docs.map(item => {
                            tempAllEventsData.push(item.data())
                        })
                        setFilteredEvents1(tempAllEventsData);
                    }
                })
        console.log(filteredEvents1)
    }
    const MusicBtn = async () => {
        setShowMusicEvents(!showMusicEvents)
        setShowSportEvents(false)
        setShowFoodEvents(false)
        setShowArtEvents(false)
        // setSelectedCategories((prevCategories) =>
        //     prevCategories.includes("Music")
        //         ? prevCategories.filter((cat) => cat !== "Music")
        //         : [...prevCategories, "Music"])
        let tempAllEventsData = [];
        await firestore().collection('events').where("eventCategory", "==", "Music").get()
            .then(
                res => {
                    if (res.docs != []) {
                        res.docs.map(item => {
                            tempAllEventsData.push(item.data())
                        })
                        setFilteredEvents1(tempAllEventsData);
                    }
                })
        console.log(filteredEvents1)
    }
    const FoodBtn = async () => {
        setShowFoodEvents(!showFoodEvents)
        setShowSportEvents(false)
        setShowMusicEvents(false)
        setShowArtEvents(false)
        // setSelectedCategories((prevCategories) =>
        //     prevCategories.includes("Food")
        //         ? prevCategories.filter((cat) => cat !== "Food")
        //         : [...prevCategories, "Food"])
        let tempAllEventsData = [];
        await firestore().collection('events').where("eventCategory", "==", "Food").get()
            .then(
                res => {
                    if (res.docs != []) {
                        res.docs.map(item => {
                            tempAllEventsData.push(item.data())
                        })
                        setFilteredEvents1(tempAllEventsData);
                    }
                })
        console.log(filteredEvents1)
    }
    const ArtBtn = async () => {
        setShowArtEvents(!showArtEvents)
        setShowSportEvents(false)
        setShowMusicEvents(false)
        setShowFoodEvents(false)
        // setSelectedCategories((prevCategories) =>
        //     prevCategories.includes("Art")
        //         ? prevCategories.filter((cat) => cat !== "Art")
        //         : [...prevCategories, "Art"])
        let tempAllEventsData = [];
        await firestore().collection('events').where("eventCategory", "==", "Art").get()
            .then(
                res => {
                    if (res.docs != []) {
                        res.docs.map(item => {
                            tempAllEventsData.push(item.data())
                        })
                        setFilteredEvents1(tempAllEventsData);
                    }
                })
        console.log(filteredEvents1)
    }
    const TodayBtn = () => {
        setShowTodayEvents(!showTodayEvents)
        setShowTomorrowEvents(false)
        setShowWeekEvents(false)
        console.log("today btn pressed")
    }
    const TomorrowBtn = () => {
        setShowTomorrowEvents(!showTomorrowEvents)
        setShowTodayEvents(false)
        setShowWeekEvents(false)
        console.log("Tomorrow Btn pressed")
    }
    const WeekBtn = () => {
        setShowWeekEvents(!showWeekEvents)
        setShowTodayEvents(false)
        setShowTomorrowEvents(false)
        console.log("Week Btn pressed")
    }
    // console.log(multiSliderValue)
    // get currnet date
    const getCurrentDate = () => {
        // var date = new Date().getDate(); //Current Date
        // var month = new Date().getMonth() + 1; //Current Month
        // var year = new Date().getFullYear(); //Current Year
        // let currentdate = (date + "-" + month + "-" + year)
        // console.log("get current date ----------------" + currentdate)
        // return currentdate;
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        // console.log(`${day}-${month}-${year}`);
        return `${day}-${month}-${year}`;
    }
    // get Tomorrow date
    const getTomorrowDate = () => {
        // var date = new Date().getDate() + 1; //Current Date
        // var month = new Date().getMonth() + 1; //Current Month
        // var year = new Date().getFullYear(); //Current Year
        // let tomorrowdate = (date + "-" + month + "-" + year)
        // console.log("get tomorrow date ----------------" + tomorrowdate)
        // return tomorrowdate;
        const today = new
            Date();
        const tomorrow = new
            Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const year = tomorrow.getFullYear();
        const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
        const day = tomorrow.getDate().toString().padStart(2, '0');
        console.log("get tomorrow date ----------------" + `${day}-${month}-${year}`)
        return `${day}-${month}-${year}`;
    }
    // get week date
    const getWeekDates = () => {
        const today = new Date();
        const offset = (today.getDay() + 6) % 7;
        // const dayOfWeek = today.getDay();
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - offset);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        const formattedStart = formatDate(weekStart).toUpperCase();
        const formattedEnd = formatDate(weekEnd).toUpperCase();
        console.log(formattedStart);
        console.log(formattedEnd);
        return { formattedStart, formattedEnd };
    };
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${day}-${month}-${year}`;
    };
    //get location data
    // const getLocationDate = () => {
    //     Geocoder.init("AIzaSyAMqJdgwZaqsleQ8zw2u78_tP-fhDt-9ko");
    //     Geocoder.from(41.89, 12.49)
    //         .then(json => {
    //             var addressComponent = json.results[0];
    //             console.log(addressComponent);
    //         })
    //         .catch(error => console.warn(error));
    // }
    //show search event 
    const [onSearch, setOnSearch] = useState(false);
    //get enterd text from textinput
    const [typedText, setTypedText] = useState('');
    // console.log(typedText)
    const [filterEvents, setFilterEvents] = useState('');
    const searchEvents = (text) => {
        setTypedText(text);
        const filteredEvents = allEvents.filter((event) => event.eventName.toLowerCase().includes(text.toLowerCase()));
        setFilterEvents(filteredEvents);
    };
    //get user data from firebase on the base of userId saved in Async Storage
    const [userName, setUserName] = useState('');
    const [userImage, setUserImage] = useState('');
    useEffect(() => {
        getUserDataByUserId()
    })
    const getUserDataByUserId = async () => {
        try {
            const myId = await AsyncStorage.getItem('USERID')
            // console.log(myId)
            const userData = await firestore().collection('users').doc(myId).get();
            setUserName(userData._data.name)
            setUserImage(userData._data.profileImage)
            // console.log(userPhone)
        } catch (error) {
            console.log(error)
        }
    }
    //remove login data from async storage on Sign out
    const removeLoginData = async () => {
        await AsyncStorage.clear()
        navigation.navigate("SignIn")
    }
    //get bookmark number
    const [noBook, setNoBook] = useState(0);
    useEffect(() => {
        getNoBooks()
    });
    const getNoBooks = async () => {
        const myId = await AsyncStorage.getItem('USERID')
        const bookmark = await firestore().collection('users').doc(myId).get();
        setNoBook(bookmark._data.bookmarks.length);
    }
    // console.log(noBook)

    const navigation = useNavigation();
    const [show, setShow] = useState(false)
    const item = usersInfo[0];

    const [showMenu, setShowMenu] = useState(false);
    const offSetValue = useRef(new Animated.Value(0)).current;
    const scaleValue = useRef(new Animated.Value(1)).current;

    const notification = [
        {
            id: 1,
            name: 'David Silbia',
            message: 'Invite Jo Malone London’s Mother’s',
            time: 'Just now',
            image: require("../Assets/FriendsImages/f1.png")
        },
        {
            id: 2,
            name: 'Adnan Safi',
            message: 'Started following you',
            time: '20 min ago',
            image: require("../Assets/FriendsImages/f2.png")
        },
        {
            id: 3,
            name: 'Ronald C. Kinch',
            message: 'Like you events',
            time: '9 hr ago',
            image: require("../Assets/FriendsImages/f3.png")
        },
        {
            id: 4,
            name: 'Clara Tolson',
            message: 'Join your Event Gala Music Festival',
            time: 'Wed, 3:30 pm',
            image: require("../Assets/FriendsImages/f4.png")
        },
    ]
    const [notificationData, setNotificationData] = useState('')
    // console.log(notificationData);
    //get events from firebase
    const [allEvents, setAllEvents] = useState("")
    useEffect(() => {
        getAllEvents();
        // getLocationDate();
    }, []);
    const getAllEvents = async () => {
        try {
            // setVisible(true)
            let tempAllEventsData = [];
            // const events = await AsyncStorage.getItem('EMAIL');
            firestore().collection('events').get()
                .then(
                    res => {
                        if (res.docs != []) {
                            res.docs.map(item => {
                                tempAllEventsData.push(item.data())
                            })
                        }
                        setAllEvents(tempAllEventsData);
                        // setVisible(false)
                        // console.log(allEvents);
                        // console.log(JSON.stringify(res.docs[0].data()));
                    });

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SafeAreaView style={[styles.mainContainer, show ? { opacity: 0.3 } : null]}>
            {/* Menu Drawer */}
            <View>
                <View style={styles.prfileImageContainer}>
                    {
                        userImage == '' ?
                            <Image
                                style={styles.prfileImage}
                                source={require("../Assets/Others/UserFakePic.png")}
                            />
                            :
                            <Image
                                style={styles.prfileImage}
                                source={{ uri: userImage }}
                            />
                    }
                </View>
                <View style={styles.prfileNameContainer}>
                    <Text style={styles.prfileName}>{userName}</Text>
                </View>
                <View style={styles.MainmenuContainer}>
                    <View style={styles.menuContainer}>
                        <TouchableOpacity style={styles.menu}
                            onPress={() => navigation.navigate("MyProfile")}>
                            <View style={styles.menuInside}>
                                <Image
                                    source={require("../Assets/Icons/MyProfile.png")}
                                    style={styles.menuIcon} />
                                <Text style={styles.menuText}>My Profile</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menu}
                            onPress={() => navigation.navigate("Messages")}>
                            <View style={styles.menuInside}>
                                <Image
                                    source={require("../Assets/Icons/MenuMessage.png")}
                                    style={styles.menuIcon} />
                                <Text style={styles.menuText}>Message</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menu}
                            onPress={() => navigation.navigate("Calender")}>
                            <View style={styles.menuInside}>
                                <Image
                                    source={require("../Assets/Icons/Calendar.png")}
                                    style={styles.menuIcon} />
                                <Text style={styles.menuText}>Calender</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menu}
                            onPress={() => navigation.navigate("Bookmark")}>
                            <View style={styles.menuInside}>
                                <Image
                                    source={require("../Assets/Icons/Bookmark.png")}
                                    style={styles.menuIcon} />
                                <Text style={styles.menuText}>Bookmark </Text>
                                <Text style={styles.books}> {noBook}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menu}
                            onPress={() => navigation.navigate("ContactUS")}>
                            <View style={styles.menuInside}>
                                <Image
                                    source={require("../Assets/Icons/ContactUs.png")}
                                    style={styles.menuIcon} />
                                <Text style={styles.menuText}>Contact Us</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menu}
                            onPress={() => navigation.navigate("Setting")}>
                            <View style={styles.menuInside}>
                                <Image
                                    source={require("../Assets/Icons/Settings.png")}
                                    style={styles.menuIcon} />
                                <Text style={styles.menuText}>Settings</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menu}
                            onPress={() => navigation.navigate("HelpFAQs")}>
                            <View style={styles.menuInside}>
                                <Image
                                    source={require("../Assets/Icons/Help&FAQs.png")}
                                    style={styles.menuIcon} />
                                <Text style={styles.menuText}>Help & FAQs</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menu}
                            onPress={removeLoginData}>
                            <View style={styles.menuInside}>
                                <Image
                                    source={require("../Assets/Icons/SignOut.png")}
                                    style={styles.menuIcon} />
                                <Text style={styles.menuText}>Sign Out</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.upgradeProContainer}>
                        <TouchableOpacity style={styles.upgradeProButton}
                            onPress={() => navigation.navigate("UpgradePro")}>
                            <Image
                                style={styles.upgradeProIcon}
                                source={require("../Assets/Icons/UpgradePro.png")}
                            />
                            <Text style={styles.upgradeProText}>Upgrade Pro</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* Home Page*/}
            <Animated.View
                style={[styles.container,
                { transform: [{ scale: scaleValue }, { translateX: offSetValue }], borderRadius: showMenu ? 40 : 0, }]}>
                <View style={styles.menuRow}>
                    {/* <StatusBar
                        backgroundColor="#4A43EC"
                        barStyle="light-content"
                    /> */}
                    <TouchableOpacity
                        onPress={() => {
                            Animated.timing(scaleValue, {
                                toValue: showMenu ? 1 : 0.8,
                                duration: 300,
                                useNativeDriver: true,
                            }).start()
                            Animated.timing(offSetValue, {
                                toValue: showMenu ? 0 : 287,
                                duration: 300,
                                useNativeDriver: true,
                            }).start()

                            setShowMenu(!showMenu);
                        }}
                        style={styles.menuButton}>
                        <Image
                            style={styles.menuIcon}
                            source={require("../Assets/Icons/SideMenu.png")}
                        />
                    </TouchableOpacity>
                    <View>
                        <TouchableHighlight>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{ fontSize: 12, fontStyle: 'normal', fontWeight: 400, opacity: 0.7, color: '#fff', marginRight: 3, fontFamily: 'AirbnbCereal_2' }}>Current Location</Text>
                                <Image
                                    style={{ width: 10, height: 5, marginTop: 6 }}
                                    source={require("../Assets/Icons/DropArrow.png")}
                                />
                            </View>
                        </TouchableHighlight>
                        <View>
                            <Text style={{ fontSize: 13, fontStyle: 'normal', fontWeight: 500, color: '#F4F4FE', fontFamily: 'AirbnbCereal_M' }}>Lahore, Pakistan</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={[styles.BellButton, { marginRight: 8, width: 50, }]}
                            onPress={() => setNotificationData(notification)}>
                            {/* onPress={() => navigation.navigate("Notification", { item: notification })}> */}
                            <Image
                                style={{ width: 50, height: 50 }}
                                source={require("../Assets/Icons/SendNotificationIcon.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.BellButton}
                            onPress={() => navigation.navigate("Notification", { item: notificationData })}>
                            {/* onPress={() => handleSecondButtonPress}> */}
                            {
                                notificationData.length === 0
                                    ?
                                    <Image
                                        style={styles.BellIcon}
                                        source={require("../Assets/Icons/BellIcon.png")}
                                    />
                                    :
                                    <Image
                                        style={styles.BellIcon}
                                        source={require("../Assets/Icons/NotificationIconWithDot.png")}
                                    />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                {/* search */}
                <View style={styles.searchFilterContainer}>
                    <View style={styles.searchContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Search")}>
                            <Image
                                style={styles.searchIcon}
                                source={require("../Assets/Icons/Search.png")}
                            />
                        </TouchableOpacity>
                        <View style={styles.searchLine}></View>
                        <TextInput placeholder='Search...' style={styles.searchTextInput} placeholderTextColor="#fff"
                            onChangeText={(text) => { setOnSearch(true), searchEvents(text) }}
                        />
                    </View>
                    {
                        onSearch ?
                            <View style={{ marginLeft: 120, backgroundColor: '#5c56ee', borderRadius: 50, padding: 3, marginRight: 4 }}>
                                <TouchableOpacity
                                    style={{}}
                                    onPress={() => setOnSearch(false)}>
                                    <Image
                                        style={{ height: 25, width: 25 }}
                                        source={require("../Assets/Icons/crossss.png")} />
                                </TouchableOpacity>
                            </View>
                            :
                            null
                    }
                    <View style={styles.filterContainer}>
                        <TouchableOpacity style={styles.filterButton}
                            onPress={() => setShow(true)}>
                            <View style={styles.filterInside}>
                                <Image
                                    style={styles.filterIcon}
                                    source={require("../Assets/Icons/FilterIcon.png")}
                                />
                                <Text style={styles.filterText}>Filters</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    onSearch && typedText != "" ?
                        <View style={{}}>
                            <FlatList
                                data={filterEvents}
                                renderItem={({ item }) =>
                                    <View style={styles.nearbyEventCard}>
                                        <TouchableOpacity style={{}}
                                            onPress={() => navigation.navigate("EventDetails", { item: item })}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 7, }}>
                                                <Image
                                                    style={{ height: 80, width: 105, borderRadius: 12, marginRight: 16, }}
                                                    source={{ uri: item.eventBanner }}
                                                />
                                                <View style={{ marginRight: 27 }}>
                                                    <Text style={{ color: '#5669FF', fontSize: 12, fontWeight: '400', textTransform: 'uppercase', fontFamily: 'AirbnbCereal_M' }}>
                                                        {item.eventDate} {item.eventStartingTime}
                                                    </Text>
                                                    <Text style={{ width: 193, color: '#120D26', fontSize: 18, fontWeight: '400', lineHeight: 25, textAlign: 'auto', fontFamily: 'AirbnbCereal_M' }}>
                                                        {item.eventName}
                                                    </Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                }
                            />
                        </View>
                        :
                        null
                }
                {
                    onApplyFilter ?
                        <View>
                            {
                                filteredEvents1 != '' ?
                                    <View>
                                        <View style={{ marginHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '400', marginLeft: 10, fontFamily: 'AirbnbCereal_M' }}>Filtered Data</Text>
                                            <View style={{ marginLeft: 120, backgroundColor: '#5c56ee', borderRadius: 50, padding: 3, marginRight: 4 }}>
                                                <TouchableOpacity
                                                    style={{}}
                                                    onPress={() => closeFilter()}>
                                                    <Image
                                                        style={{ height: 25, width: 25 }}
                                                        source={require("../Assets/Icons/crossss.png")} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <FlatList
                                            data={filteredEvents1}
                                            horizontal={true}
                                            keyExtractor={item => item.eventId}
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={({ item, index }) =>
                                                <TouchableOpacity
                                                    onPress={() => navigation.navigate("EventDetails", { item: item })}
                                                    style={styles.eventCardContainer}
                                                >
                                                    <Image
                                                        style={{ width: 217, height: 90, resizeMode: 'cover', borderRadius: 10, }}
                                                        source={{ uri: item.eventBanner }}
                                                    />
                                                    <View style={styles.eventDateContainer}>
                                                        <View style={styles.dateContainer}>
                                                            <Text style={{ color: '#F0635A', fontSize: 18, fontWeight: '400', textTransform: 'uppercase', fontFamily: 'AirbnbCereal_M' }}>{item.eventDate.slice(0, 2)}</Text>
                                                            <Text style={{ color: '#F0635A', fontSize: 12, fontWeight: '400', textTransform: 'uppercase', fontFamily: 'AirbnbCereal_M' }}>{item.eventMonth}</Text>
                                                        </View>
                                                    </View>
                                                    <View>
                                                        <View>
                                                            <View style={{ marginLeft: 7, marginRight: 17, marginTop: 10, }}>
                                                                <Text style={{ color: '#000', fontSize: 18, fontWeight: '400', fontFamily: 'AirbnbCereal_M' }} numberOfLines={1}>{item.eventName}</Text>
                                                            </View>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 7, marginTop: 8 }}>
                                                                <Image
                                                                    style={{ marginRight: 5, height: 22, width: 22 }}
                                                                    source={require("../Assets/Icons/EventDetailsCalendar.png")}
                                                                />
                                                                <Text style={{ color: '#5669FF', fontSize: 13, fontWeight: '400', textTransform: 'uppercase', fontFamily: 'AirbnbCereal_M' }}>
                                                                    {item.eventDate} {item.eventStartingTime}
                                                                </Text>
                                                            </View>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 7, marginTop: 8, }}>
                                                                <Image
                                                                    style={{ opacity: 0.4, marginRight: 5, height: 22, width: 22 }}
                                                                    source={require("../Assets/Icons/hfevent.png")}
                                                                />
                                                                <Text style={{ color: '#2B2849', fontSize: 13, fontWeight: '400', fontFamily: 'AirbnbCereal_2' }}>Event Category: {item.eventCategory}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                        />
                                    </View>
                                    :
                                    <View>
                                        <View style={{ marginHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '400', marginLeft: 10, fontFamily: 'AirbnbCereal_M' }}>Filtered Data</Text>
                                            <View style={{ marginLeft: 120, backgroundColor: '#5c56ee', borderRadius: 50, padding: 3, marginRight: 4 }}>
                                                <TouchableOpacity
                                                    style={{}}
                                                    onPress={() => closeFilter()}>
                                                    <Image
                                                        style={{ height: 25, width: 25 }}
                                                        source={require("../Assets/Icons/crossss.png")} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10, marginHorizontal: 24 }}>
                                            <Image
                                                style={{ height: 100, width: 100, }}
                                                source={require("../Assets/Others/NoEvents.png")}
                                            />
                                            <Text style={{ marginTop: 10, color: '#fff', fontSize: 24, fontWeight: '500', lineHeight: 34, textAlign: 'center', fontFamily: 'AirbnbCereal_M', }}>
                                                No Event
                                            </Text>
                                            <Text style={{ marginTop: 7, color: '#fff', fontSize: 16, fontWeight: '400', lineHeight: 25, textAlign: 'center', opacity: 0.7, fontFamily: 'AirbnbCereal_2', }}>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor
                                            </Text>
                                        </View>
                                    </View>
                            }
                        </View>
                        : null
                }
                {/* Home File */}
                <Home />
            </Animated.View>
            {/* Filter Modal */}
            <Modal transparent={true} visible={show} animationType='slide'>
                <View style={{ backgroundColor: '#fff', flex: 1, marginTop: 71, borderTopRightRadius: 38, borderTopLeftRadius: 38 }}>
                    <View style={{ height: 5, width: 26, backgroundColor: 'rgba(178, 178, 178, 0.5)', marginTop: 12, borderRadius: 2.5, alignSelf: 'center' }}></View>
                    {/* header */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 24, marginTop: 17, }}>
                        <TouchableOpacity
                            onPress={() => setShow(false)}>
                            <Image source={require("../Assets/Icons/LeftArrow.png")} />
                        </TouchableOpacity>
                        <Text style={{ color: '#120D26', fontSize: 24, fontWeight: '500', marginLeft: 10, fontFamily: 'AirbnbCereal_M' }}>
                            Filter
                        </Text>
                    </View>
                    {/* categories */}
                    <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', marginHorizontal: 30 }}>
                        <View style={{ marginRight: 15, alignItems: 'center' }}>
                            <TouchableOpacity
                                style={[{ width: 64, height: 64, borderColor: '#E5E5E5', borderRadius: 32, borderWidth: 1, alignItems: 'center', justifyContent: 'center', }, { backgroundColor: showSportEvents ? '#5669FF' : '#fff' }]}
                                onPress={() => SportBtn()}>
                                <Image
                                    style={[{ height: 40, width: 40, }, { tintColor: showSportEvents ? "#fff" : '#807A7A' }]}
                                    source={require("../Assets/Icons/fsport.png")}
                                />
                            </TouchableOpacity>
                            <Text style={{ color: '#120D26', fontSize: 14, fontWeight: '400', lineHeight: 23, marginTop: 8, fontFamily: 'AirbnbCereal_M' }}>Sports</Text>
                        </View>
                        <View style={{ marginRight: 15, alignItems: 'center' }}>
                            <TouchableOpacity
                                style={[{ width: 64, height: 64, borderColor: '#E5E5E5', borderRadius: 32, borderWidth: 1, alignItems: 'center', justifyContent: 'center', }, { backgroundColor: showMusicEvents ? '#5669FF' : '#fff' }]}
                                onPress={() => MusicBtn()}>
                                <Image
                                    style={[{ height: 40, width: 40, }, { tintColor: showMusicEvents ? "#fff" : '#807A7A' }]}
                                    source={require("../Assets/Icons/FilterIcon1.png")}
                                />
                            </TouchableOpacity>
                            <Text style={{ color: '#120D26', fontSize: 14, fontWeight: '400', lineHeight: 23, marginTop: 8, fontFamily: 'AirbnbCereal_M' }}>Music</Text>
                        </View>
                        <View style={{ marginRight: 15, alignItems: 'center' }}>
                            <TouchableOpacity
                                style={[{ width: 64, height: 64, borderColor: '#E5E5E5', borderRadius: 32, borderWidth: 1, alignItems: 'center', justifyContent: 'center', }, { backgroundColor: showArtEvents ? '#5669FF' : '#fff' }]}
                                onPress={() => ArtBtn()}>
                                <Image
                                    style={[{ height: 40, width: 40, }, { tintColor: showArtEvents ? "#fff" : '#807A7A' }]}
                                    source={require("../Assets/Icons/fart.png")}
                                />
                            </TouchableOpacity>
                            <Text style={{ color: '#120D26', fontSize: 14, fontWeight: '400', lineHeight: 23, marginTop: 8, fontFamily: 'AirbnbCereal_M' }}>Art</Text>
                        </View>
                        <View style={{ marginRight: 15, alignItems: 'center' }}>
                            <TouchableOpacity
                                style={[{ width: 64, height: 64, borderColor: '#E5E5E5', borderRadius: 32, borderWidth: 1, alignItems: 'center', justifyContent: 'center', }, { backgroundColor: showFoodEvents ? '#5669FF' : '#fff' }]}
                                onPress={() => FoodBtn()}>
                                <Image
                                    style={[{ height: 40, width: 40, }, { tintColor: showFoodEvents ? "#fff" : '#807A7A' }]}
                                    source={require("../Assets/Icons/FilterIcon2.png")}
                                />
                            </TouchableOpacity>
                            <Text style={{ color: '#120D26', fontSize: 14, fontWeight: '400', lineHeight: 23, marginTop: 8, fontFamily: 'AirbnbCereal_M' }}>Food</Text>
                        </View>
                    </View>
                    {/* Time & Date Filter */}
                    <View style={{ marginTop: 25, marginHorizontal: 20, }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#120D26', fontSize: 18, fontWeight: '400', lineHeight: 34, fontFamily: 'AirbnbCereal_M' }}>Time & Date </Text>
                            {/* <Text style={{ color: '#807A7A', fontSize: 14, fontWeight: '400', lineHeight: 34, fontFamily: 'AirbnbCereal_2' }}>(Not Functional)</Text> */}
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
                            <TouchableOpacity
                                style={[{ borderRadius: 10, borderColor: '#E6E6E6', borderWidth: 1, }, { backgroundColor: showTodayEvents ? '#5669FF' : '#fff' }]}
                                onPress={() => TodayBtn()}>
                                <Text style={[{ fontSize: 15, fontWeight: '400', lineHeight: 25, paddingVertical: 9, paddingHorizontal: 19, fontFamily: 'AirbnbCereal_M' }, { color: showTodayEvents ? "#fff" : '#807A7A', }]}>
                                    Today
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[{ borderRadius: 10, borderColor: '#E6E6E6', borderWidth: 1, }, { backgroundColor: showTomorrowEvents ? '#5669FF' : '#fff' }]}
                                onPress={() => TomorrowBtn()}>
                                <Text style={[{ fontSize: 15, fontWeight: '400', lineHeight: 25, paddingVertical: 9, paddingHorizontal: 19, fontFamily: 'AirbnbCereal_M' }, { color: showTomorrowEvents ? "#fff" : '#807A7A', }]}>
                                    Tomorrow
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[{ borderRadius: 10, borderColor: '#E6E6E6', borderWidth: 1, }, { backgroundColor: showWeekEvents ? '#5669FF' : '#fff' }]}
                                onPress={() => WeekBtn()}>
                                <Text style={[{ fontSize: 15, fontWeight: '400', lineHeight: 25, paddingVertical: 9, paddingHorizontal: 19, fontFamily: 'AirbnbCereal_M' }, { color: showWeekEvents ? "#fff" : '#807A7A', }]}>
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
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#120D26', fontSize: 18, fontWeight: '400', lineHeight: 34, fontFamily: 'AirbnbCereal_M' }}>Location </Text>
                            <Text style={{ color: '#807A7A', fontSize: 14, fontWeight: '400', lineHeight: 34, fontFamily: 'AirbnbCereal_2' }}>(Not Functional)</Text>
                        </View>
                        <TouchableOpacity
                            style={{ borderRadius: 10, borderColor: '#E6E6E6', borderWidth: 1, marginTop: 10, paddingVertical: 9, paddingHorizontal: 19, }}
                            onPress={() => { }}
                        >
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
                                        Lahore, Pakistan
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
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: '#120D26', fontSize: 18, fontWeight: '400', lineHeight: 34, fontFamily: 'AirbnbCereal_M' }}>Select price range </Text>
                                <Text style={{ color: '#807A7A', fontSize: 14, fontWeight: '400', lineHeight: 34, fontFamily: 'AirbnbCereal_2' }}>(Not Functional)</Text>
                            </View>
                            <Text style={{ color: '#3F38DD', fontSize: 18, fontWeight: '400', lineHeight: 34, fontFamily: 'AirbnbCereal_M' }}>
                                ${multiSliderValue[0]} - ${multiSliderValue[1]}
                            </Text>
                        </View>
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
                            <Text style={{ color: '#120D26', fontSize: 16, fontWeight: '500', letterSpacing: 1, fontFamily: 'AirbnbCereal_M' }}
                                onPress={() => resetFilter()}>
                                RESET
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ borderRadius: 14, backgroundColor: '#5669FF', marginTop: 10, paddingVertical: 19, paddingHorizontal: 66, }}>
                            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '400', letterSpacing: 1, fontFamily: 'AirbnbCereal_M' }}
                                onPress={() => applyFilter()}
                            >
                                APPLY
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/* <Filter /> */}
                </View>
            </Modal>
            {/* activity loader */}
            <LoginLoader visible={visible} />
        </SafeAreaView>
    )
}

export default MenuDrawer

const styles = StyleSheet.create({
    eventCardContainer: {
        padding: 10,
        // height: 255,
        width: 237,
        backgroundColor: '#fff',
        borderRadius: 18,
        marginLeft: 24,
        marginTop: 10,
        marginBottom: 10,
        shadowColor: '#000000',
        elevation: 3,
        shadowOpacity: 1,
    },
    eventDateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 200,
        position: 'absolute',
        top: 16,
        right: 18,
    },
    dateContainer: {
        height: 45,
        width: 45,
        backgroundColor: 'rgba(255, 255, 255, 0.70)',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookmarkContainer: {
        height: 30,
        width: 30,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nearbyEventCard: {
        backgroundColor: '#fff',
        marginHorizontal: 24,
        borderRadius: 16,
        shadowColor: '#000000',
        elevation: 1,
        shadowOpacity: 1,
        marginBottom: 16,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        height: 180,
    },
    container: {
        flex: 1,
        backgroundColor: '#4A43EC',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    menuButton: {
        marginLeft: 24,
    },
    menuIcon: {
        height: 20,
        width: 24,
    },
    prfileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    prfileImageContainer: {
        marginTop: 45,
        marginLeft: 25,
    },
    prfileNameContainer: {
        marginTop: 12,
        marginLeft: 25,
    },
    prfileName: {
        color: '#000000',
        fontSize: 19,
        fontStyle: 'normal',
        fontWeight: '500',
        textTransform: 'capitalize',
        fontFamily: 'AirbnbCereal_M'
    },
    MainmenuContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    menuContainer: {
        marginTop: 48,
        marginLeft: 31,
        marginBottom: 78,
    },
    menu: {
        marginBottom: 33,
        width: 130,
    },
    menuInside: {
        flexDirection: 'row',
    },
    menuIcon: {
        width: 23,
        height: 23,
        marginRight: 14,
    },
    menuText: {
        color: '#000000',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 25,
        fontFamily: 'AirbnbCereal_2'
    },
    upgradeProText: {
        color: '#00F8FF',
        fontSize: 15,
        fontStyle: 'normal',
        fontWeight: '400',
        fontFamily: 'AirbnbCereal_M'
    },
    upgradeProIcon: {
        marginRight: 10,
    },
    upgradeProContainer: {
        marginLeft: 26,
    },
    upgradeProButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 46,
        borderRadius: 8,
        borderColor: '#00F8FF',
        borderWidth: 1,
        backgroundColor: '#d8feff'
    },
    menuRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    BellButton: {
        marginRight: 24,
        height: 36,
        width: 36,
        backgroundColor: '#5c56ee',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchIcon: {
        height: 24,
        width: 24,
    },
    searchLine: {
        width: 1,
        height: 20,
        marginLeft: 10,
        backgroundColor: '#7974E7'
    },
    searchTextInput: {
        flex: 1,
        marginLeft: 7,
        color: '#ffffff',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '400',
        letterSpacing: -1,
        opacity: 0.3,
        fontFamily: 'AirbnbCereal_2'
    },
    filterContainer: {
        width: 75,
        height: 32,
        backgroundColor: '#5c56ee',
        borderRadius: 50,
    },
    filterButton: {},
    filterInside: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterIcon: {
        width: 24,
        height: 24,
        marginRight: 3.7,
        marginTop: 4.06,
        marginBottom: 4.33,
        marginLeft: 4.29,
    },
    filterText: {
        color: '#ffffff',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        fontFamily: 'AirbnbCereal_M'
    },
    searchFilterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 24,
        justifyContent: 'space-between',
        marginTop: 10,
        // marginBottom: 48,
        // borderBottomRightRadius: 33,
        // borderBottomLeftRadius: 33,
    },
    books: {
        backgroundColor: '#4A43EC',
        color: '#fff',
        paddingVertical: 3,
        paddingHorizontal: 4,
        height: 25,
        width: 25,
        borderRadius: 13,
        fontFamily: 'AirbnbCereal_M'
    }
})