import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  CheckBox,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Utility from '../../../Utility';
import axios from 'axios';
import CookieManager from 'react-native-cookies';
import SplashScreen from 'react-native-splash-screen';

const SignIn = ({navigation}) => {
  //쿠키 내 로그인 데이터 확인
  CookieManager.get('pjhdev.com')
  .then((res) => {
    
    //1회 로그인 시 쿠키 maxAge가 -1로 설정되어 있으나 
    //앱을 종료해도 남아있음
    const isEmptyLoginCookie = (Object.keys(res).length == 0);

    if(isEmptyLoginCookie || !res["is_auto_login"]){
      SplashScreen.hide();
    }
    else{
      axios({
        method: 'GET',
        url: 'http://pjhdev.com:8087/api/member/checkAutoLogin'
      })
      .then(function (response) {
        const isAutoLogin = response.data.isAutoLogin;

        console.log("isAutoLogin :: " + isAutoLogin);

        if(isAutoLogin){
          const name = res["name"];
          navigation.navigate('Home', {
            name
          });
          SplashScreen.hide();
        }
        else{
          SplashScreen.hide();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  });

  const login = () => { 

    //기존 쿠키 삭제
    CookieManager.clearAll();

    axios({
      method: 'POST',
      url: 'http://pjhdev.com:8087/api/member/login',
      headers: { 
        'content-type': 'application/json' 
      },
      data : JSON.stringify({
        id : id,
        pwd : password,
        isAutoLogin : false
      })
    })
    .then(function (response) {

      //쿠키 내 이름 데이터 get
      let name;
      CookieManager.get('pjhdev.com')
      .then((res) => {
        name = decodeURIComponent(res["name"]);
        navigation.navigate('Home', {
          name
        });
      });
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Image style={{height:'60%',width:'60%',marginTop:-100,marginBottom:-50}}
          source={require('../../../../resource/uad.png')}/>
      <View style={styles.textFieldContainer}>
        <TextInput
          style={styles.textField}
          onChangeText={text => setId(text)}
          placeholder="아이디"
          value={id}
        />
        <TextInput
          style={styles.textField}
          onChangeText={text => setPassword(text)}
          value={password}
          placeholder="비밀번호"
          secureTextEntry={true}
        />
      </View>
      <CheckBox/>
      <Text>test</Text>
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.push('SignUp')}>
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
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
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

export default SignIn;
