import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  ScrollView 
} from 'react-native';
import Utility from '../../../Utility';
import {OutlinedTextField} from 'react-native-material-textfield';
import ImagePicker from "react-native-image-picker";
import RadioForm from 'react-native-simple-radio-button';
import ConstantValue from '../../../constant/ConstantValue';
 

import axios from 'axios';
const SignUp = ({navigation}) => {
  const pickImageHandler = () => {
    ImagePicker.showImagePicker({title: "Pick an Image", maxWidth: 800, maxHeight: 600}, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        console.log(res.uri);
        setImageUrl(res.uri);
      }
    });
  }


  const signUpExec = () =>{
    let formData = new FormData();
    formData.append('id',id);
    formData.append('pwd',password);
    formData.append('name',name);
    formData.append('birthDay',birthDay);
    formData.append('studentId',studentId);
    formData.append('isWorker',isWorker);
    formData.append('phoneNumber',phoneNumber);
    formData.append('profileImg',{
      uri: imageUrl,
      type: 'image/jpeg',
      name: 'imgimg'
    });
    axios({
      method: 'POST',
      url: ConstantValue.serverDomain + '/api/member',
      headers: { 
        'content-type': 'multipart/form-data' 
      },
      data : formData
    })
    .then(function (response) {
      console.log(response);
      // navigation.goBack()
    })
    .catch(error=>{
      let errorObject=JSON.parse(JSON.stringify(error));
      console.log(errorObject);
      //dispatch(authError(errorObject.response.data.error));
      });
  }

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [studentId, setStudentId] = useState('');
  const [isWorker, setIsWorker] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const inputRef = useRef();
  const workerProps = [
    {label: '학생', value: 0 },
    {label: '직장인', value: 1 }
  ];
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
          <View style={styles.textFieldContainer}>
            <OutlinedTextField
              label="아이디"
              keyboardType="default"
              ref={inputRef}
              containerStyle={styles.textField}
              onChangeText={text => setId(text)}
              value={id}
            />
            <OutlinedTextField
              label="비밀번호"
              keyboardType="default"
              ref={inputRef}
              secureTextEntry={true}
              containerStyle={styles.textField}
              onChangeText={text => setPassword(text)}
              value={password}
            />
            <OutlinedTextField
              label="이름"
              keyboardType="default"
              ref={inputRef}
              containerStyle={styles.textField}
              onChangeText={text => setName(text)}
              value={name}
            />
            <OutlinedTextField
              label="생일"
              keyboardType="default"
              ref={inputRef}
              containerStyle={styles.textField}
              onChangeText={text => setBirthDay(text)}
              value={birthDay}
            />
            <OutlinedTextField
              label="학번"
              keyboardType="phone-pad"
              ref={inputRef}
              containerStyle={styles.textField}
              onChangeText={text => setStudentId(text)}
              value={studentId}
            />
            <RadioForm
              radio_props={workerProps}
              initial={0}
              onPress={value => setIsWorker(value)}
              formHorizontal={true}
            />
            <OutlinedTextField
              label="휴대폰"
              keyboardType="phone-pad"
              ref={inputRef}
              containerStyle={styles.textField}
              onChangeText={text => setPhoneNumber(text)}
              value={phoneNumber}
            />
            <Button title="Pick Image" onPress={pickImageHandler} />
            <TouchableOpacity
              style={styles.button}
              onPress={signUpExec}>
              <Text style={styles.buttonText}>회원가입</Text>
            </TouchableOpacity>
          </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    paddingTop:50,
    width: '100%',
    height: '100%',
  },
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
    marginTop: 5,
    marginBottom: 5,
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
