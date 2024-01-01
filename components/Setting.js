import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useState } from 'react'

const Setting = () => {
    const [date1, setDate1] = useState('');
    const [date2, setDate2] = useState('');
    const [result, setResult] = useState('');

    const compareDates = () => {
        const date1Parts = date1.split('-');
        const date2Parts = date2.split('-');

        const date1Timestamp = new Date(
            parseInt(date1Parts[2]), // Year
            parseInt(date1Parts[1]) - 1, // Month (0-indexed)
            parseInt(date1Parts[0])
        ).getTime();

        const date2Timestamp = new Date(
            parseInt(date2Parts[2]),
            parseInt(date2Parts[1]) - 1,
            parseInt(date2Parts[0])
        ).getTime();

        if (date1Timestamp < date2Timestamp) {
            setResult('Date 1 is in the past, Date 2 is upcoming.');
        } else if (date1Timestamp > date2Timestamp) {
            setResult('Date 1 is upcoming, Date 2 is in the past.');
        } else {
            setResult('The dates are the same.');
        }
    };
    return (
        <View>
            <TextInput
                value={date1}
                onChangeText={setDate1}
                placeholder="Enter Date 1 (DD-MM-YYYY)"
            />
            <TextInput
                value={date2}
                onChangeText={setDate2}
                placeholder="Enter Date 2 (DD-MM-YYYY)"
            />
            <Button title="Compare" onPress={compareDates} />
            <Text>{result}</Text>
        </View>
    )
}

export default Setting

const styles = StyleSheet.create({})