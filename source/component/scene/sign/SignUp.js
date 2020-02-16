import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button
} from 'react-native';
import Utility from '../../../Utility';
import {OutlinedTextField} from 'react-native-material-textfield';
import ImagePicker from "react-native-image-picker";

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
      }
    });
  }


  const signUpExec = () =>{

    let formData = new FormData();
    formData.append('id','idid');
    formData.append('pwd','pwdpwd');
    formData.append('name','namename');
    formData.append('birthDay','20200101');
    formData.append('studentId','11');
    formData.append('isWorker','1');
    formData.append('phoneNumber','01012341234');
    formData.append('profileImg',{
      uri: 'file:///storage/emulated/0/Android/data/com.uad2/files/Pictures/image-1208fad9-9e98-464f-a450-403ee4eaaaac.jpg',
      type: 'image/jpeg',
      name: 'imgimg'
    });
    axios({
      method: 'POST',
      url: 'http://pjhdev.com:8087/api/member',
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
        <OutlinedTextField
          label="프로필 이미지"
          keyboardType="phone-pad"
          ref={inputRef}
          containerStyle={styles.textField}
        />
        <Button title="Pick Image" onPress={pickImageHandler} />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={signUpExec}>
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
