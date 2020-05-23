import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Utility from "../../../Utility";

const FindGate = ({navigation}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FindId')}>
                <Text style={styles.buttonText}>아이디 찾기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FindPassword')}>
                <Text style={styles.buttonText}>비밀번호 찾기</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    button: {
        margin: 20,
        width: '80%',
        height: 50,
        backgroundColor: Utility.color.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    },
});
export default FindGate;