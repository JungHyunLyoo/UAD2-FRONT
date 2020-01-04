import {createDrawerNavigator} from 'react-navigation-drawer';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Home from './source/scene/Home';
import Dues from './source/scene/Dues';
import {createAppContainer} from 'react-navigation';
import Attend from './source/scene/Attend';

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
    initialRouteName: 'Attend',
  },
);

const App = createAppContainer(MyDrawerNavigator);

export default App;
