import {createDrawerNavigator} from 'react-navigation-drawer';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Home from './source/Home';
import Dues from './source/Dues';
import {createAppContainer} from 'react-navigation';

const MyDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({
        title: '홈',
      }),
    },
    Dues: {
      screen: Dues,
      navigationOptions: () => ({
        title: '회비',
      }),
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const App = createAppContainer(MyDrawerNavigator);

export default App;
