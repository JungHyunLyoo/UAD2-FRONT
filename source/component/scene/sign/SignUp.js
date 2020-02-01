import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Utility from '../../../Utility';
import {OutlinedTextField} from 'react-native-material-textfield';

const SignUp = ({navigation}) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const inputRef = useRef();
  return (
    <View style={styles.container}>
      <View style={styles.textFieldContainer}>
        <OutlinedTextField
          label="아이디"
          keyboardType="default"
          ref={inputRef}
          containerStyle={styles.textField}
        />
        <OutlinedTextField
          label="비밀번호"
          keyboardType="default"
          ref={inputRef}
          secureTextEntry={true}
          containerStyle={styles.textField}
        />
        <OutlinedTextField
          label="이름"
          keyboardType="default"
          ref={inputRef}
          containerStyle={styles.textField}
        />
        <OutlinedTextField
          label="생일"
          keyboardType="phone-pad"
          ref={inputRef}
          containerStyle={styles.textField}
        />
        <OutlinedTextField
          label="학번"
          keyboardType="phone-pad"
          ref={inputRef}
          containerStyle={styles.textField}
        />
        <OutlinedTextField
          label="휴대폰"
          keyboardType="phone-pad"
          ref={inputRef}
          containerStyle={styles.textField}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>회원가입</Text>
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
  name: {
    color: 'white',
    fontSize: 20,
  },
  textFieldContainer: {
    width: '100%',
    alignItems: 'center',
  },
  textField: {
    width: '80%',
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
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

export default SignUp;
