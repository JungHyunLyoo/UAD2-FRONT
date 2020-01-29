import React from 'react';
import {Text, StyleSheet, View, SafeAreaView} from 'react-native';
import Welcome from '../component/scene/home/Welcome';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Welcome name={'진여준'} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginLeft: '5%',
    marginRight: '5%',
    width: '90%',
  },

  content: {
    paddingTop: 20,
    width: '100%',
  },
});

export default Home;
