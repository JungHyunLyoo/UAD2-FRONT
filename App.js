import {createDrawerNavigator} from 'react-navigation-drawer';
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
} from 'react-native';

import Home from './source/scene/Home';
import Dues from './source/scene/Dues';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Attend from './source/scene/Attend';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SignIn from './source/component/scene/sign/SignIn';
import SignUp from './source/component/scene/sign/SignUp';
import FindGate from './source/component/scene/sign/FindGate';
import FindId from './source/component/scene/sign/FindId';
import FindPassword from './source/component/scene/sign/FindPassword';

const headerRight = navigation => {
    return (
        <Icon
            name=""
            size={20}
            style={styles.rightButton}
            onPress={navigation.openDrawer}
        >
            헤더
        </Icon>
    );
};

const HomeNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({navigation}) => ({
            title: 'UAD',
            headerRight: () => headerRight(navigation),
        }),
    },
});

const AttendNavigator = createStackNavigator({
    Attend: {
        screen: Attend,
        navigationOptions: ({navigation}) => ({
            title: '참가',
            headerRight: () => headerRight(navigation),
        }),
    },
});

const DuesNavigator = createStackNavigator({
    Dues: {
        screen: Dues,
        navigationOptions: ({navigation}) => ({
            title: '회비',
            headerRight: () => headerRight(navigation),
        }),
    },
});

const styles = StyleSheet.create({
    rightButton: {
        marginRight: 10,
    },
});

const MyDrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomeNavigator,
            navigationOptions: () => ({
                title: '홈',
            }),

        },
        Attend: {
            screen: AttendNavigator,
            navigationOptions: () => ({
                title: '참가',
            }),
        },
        Dues: {
            screen: DuesNavigator,
            navigationOptions: () => ({
                title: '회비',
            }),
        },
    },
    {
        initialRouteName: 'Home',
        drawerPosition: 'right',
        drawerWidth: 150,
        contentOptions: {
            activeTintColor: '#e91e63',
        }
    },
);

const SignNavigator = createStackNavigator({
    SignIn: {
        screen: SignIn,
        navigationOptions: () => ({
            headerShown: false
        }),
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: () => ({
            headerShown: false
        }),
    },
    FindGate: {
        screen: FindGate,
        navigationOptions: () => ({
            headerShown: false
        }),
    },
    FindId: {
        screen: FindId,
        navigationOptions: () => ({
            headerShown: false
        }),
    },
    FindPassword: {
        screen: FindPassword,
        navigationOptions: () => ({
            headerShown: false
        }),
    },
});

const AppNavigator = createSwitchNavigator({
    Sign: {
        screen: SignNavigator,
    },
    Main: {
        screen: MyDrawerNavigator,
    },
});

const App = createAppContainer(AppNavigator);

export default App;
