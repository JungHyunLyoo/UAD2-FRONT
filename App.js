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
import Attend from './source/Attend';

const MyDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({
        title: '홈',
      }),
    },
    Attend: {
      screen: Attend,
      navigationOptions: () => ({
        title: '참가',
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
