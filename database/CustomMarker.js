import React from 'react';
import { StyleSheet, Image,View } from 'react-native';

class CustomMarker extends React.Component {
    render() {
        return (
            <View style={{ backgroundColor: '#fff', height: 35, width: 35, borderRadius: 9, borderColor: '#5669FF', borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    source={require("../Assets/Icons/RangeIcon.png")}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({});

export default CustomMarker;