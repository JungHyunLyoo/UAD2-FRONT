import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import Utility from '../../../Utility';
import {isEmpty, isNotEmpty} from '../../../util';
import axios from 'axios';
import CookieManager from 'react-native-cookies';
import SplashScreen from 'react-native-splash-screen';
import ConstantValue from '../../../constant/ConstantValue';
import CheckBox from '@react-native-community/checkbox';

const SignIn = ({navigation}) => {

    const [id, setId] = useState('');
    const [noticeText, setNoticeText] = useState('');
    const [password, setPassword] = useState('');
    const [isAutoLogin, setIsAutoLogin] = useState(false);

    const getIsAutoLoginInCookie = cookieList => {
        const isAutoLogin = cookieList["is_auto_login"];
        return isNotEmpty(isAutoLogin) && isAutoLogin;
    };

    useEffect(() => {
        //쿠키 내 로그인 데이터 확인
        CookieManager.get('122.42.231.152')
            .then((cookieList) => {
                console.log('cookieList', cookieList);
                //1회 로그인 시 쿠키 maxAge가 -1로 설정되어 있으나
                //앱을 종료해도 남아있음
                const isAutoLoginInCookie = getIsAutoLoginInCookie(cookieList);
                console.log('isAutoLoginInCookie', isAutoLoginInCookie);

                if (!isAutoLoginInCookie) {
                    SplashScreen.hide();
                } else {
                    axios({
                        method: 'GET',
                        url: ConstantValue.serverDomain + '/api/member/checkAutoLogin'
                    })
                        .then(function (response) {
                            const isAutoLogin = response.data.isAutoLogin;

                            console.log("isAutoLogin :: " + isAutoLogin);

                            if (isAutoLogin) {
                                const name = cookieList["name"];
                                navigation.navigate('Home', {
                                    name
                                });
                                SplashScreen.hide();
                            } else {
                                SplashScreen.hide();
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            });

    }, []);

    const handleIdTextChange = id => {
        setId(id);
        setNoticeText('');
    };

    const handlePwdTextChange = password => {
        setPassword(password);
        setNoticeText('');
    };

    const handleFindButton = () => {
        navigation.navigate('FindGate');
    };

    const login = () => {
        console.log('===login start===');
        console.log('isEmpty(id)', isEmpty(id));
        if (isEmpty(id)) {
            setNoticeText('아이디를 입력해주세요');
            return;
        }
        console.log('isEmpty(password)', isEmpty(password));
        if (isEmpty(password)) {
            setNoticeText('비밀번호를 입력해주세요');
            return;
        }

        //기존 쿠키 삭제
        CookieManager.clearAll();

        const loginParam = JSON.stringify({
            id: id,
            pwd: password,
            isAutoLogin: isAutoLogin
        });

        console.log(loginParam);

        axios({
            method: 'POST',
            url: ConstantValue.serverDomain + '/api/member/login',
            headers: {
                'content-type': 'application/json'
            },
            data: loginParam
        })
            .then(function (response) {

                //쿠키 내 이름 데이터 get
                let name;
                CookieManager.get('122.42.231.152')
                    .then((cookieList) => {
                        name = decodeURIComponent(cookieList["name"]);
                        navigation.navigate('Home', {
                            name
                        });
                    });

            })
            .catch(function (error) {
                console.log(error);
            });
        console.log('===login end===');
    };
    return (
        <View style={styles.container}>
            <Image style={{height: '60%', width: '60%', marginTop: -100, marginBottom: -50}}
                   source={require('../../../../resource/uad.png')}/>
            <View style={styles.textFieldContainer}>
                <TextInput
                    maxLength={Utility.idLength}
                    style={styles.textField}
                    onChangeText={text => handleIdTextChange(text)}
                    placeholder="아이디"
                    value={id}
                />
                <TextInput
                    maxLength={Utility.passWordLength}
                    style={styles.textField}
                    onChangeText={text => handlePwdTextChange(text)}
                    value={password}
                    placeholder="비밀번호"
                    secureTextEntry={true}
                />
            </View>

            <View style={styles.signOptionContainer}>
                <CheckBox title='자동 로그인'
                          checked={isAutoLogin}
                          onChange={() => setIsAutoLogin(!isAutoLogin)}
                />
                <Text style={styles.signOptionTextTest}>자동 로그인</Text>
                <Text style={styles.signOptionText} onPress={() => navigation.push('SignUp')}>회원가입</Text>
                <Text style={styles.signOptionText}>|</Text>
                <Text style={styles.signOptionText} onPress={handleFindButton}>아이디 · 비밀번호 찾기</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={login}>
                <Text style={styles.buttonText}>로그인</Text>
            </TouchableOpacity>

            <Text style={styles.noticeText}>{noticeText}</Text>
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
        margin: 10,
        borderBottomWidth: 1,
        borderBottomColor: Utility.color.primary,
    },
    signOptionContainer: {
        margin: 10,
        width: '85%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    signOptionTextTest: {
        left: -5,
    },
    signOptionText: {
        fontSize: 12
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
    noticeText: {
        marginTop: 10,
        color: 'red',
    },
});

export default SignIn;
