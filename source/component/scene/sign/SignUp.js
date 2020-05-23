import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Utility from '../../../Utility';
import ImagePicker from "react-native-image-picker";
import RadioForm from 'react-native-simple-radio-button';
import CheckBox from "@react-native-community/checkbox";
import DatePicker from "react-native-datepicker";
import {isNotEmpty} from "../../../util";

const SignUp = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [studentId, setStudentId] = useState('');
    const [isWorker, setIsWorker] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isPictureUploaded, setIsPictureUploaded] = useState(false);
    const [isDisableImagePicker, setIsDisableImagePicker] = useState(true);

    const [idNoticeText, setIdNoticeText] = useState('');
    const [passwordNoticeText, setPasswordNoticeText] = useState('');
    const [nameNoticeText, setNameNoticeText] = useState('');
    const [studentIdNoticeText, setStudentIdNoticeText] = useState('');
    const [phoneNumberNoticeText, setPhoneNumberNoticeText] = useState('');

    const idRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    const studentIdRef = useRef();
    const phoneNumberRef = useRef();

    const workerProps = [
        {label: '학생', value: 0},
        {label: '직장인', value: 1}
    ];

    const handleIdTextBlur = () => {
        const idRegExp = /^[가-힣|a-z|A-Z|0-9]+$/;
        const id = idRef.current._lastNativeText;
        if (idRegExp.test(id)) {
            setId(id);
            setIdNoticeText('');
            //nginx 502 해결, 운영서버 빌드 해결 후 적용
            // axios({
            //     method: 'GET',
            //     url: ConstantValue.serverDomain + `/api/member/isAlreadyExistId/${id}`
            // })
            //     .then(function (response) {
            //         console.log(response);
            //         // setId(id);
            //         // setIdNoticeText('');
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });
        } else {
            setIdNoticeText('아이디 형식이 맞지 않습니다');
        }
    };

    const handlePasswordTextBlur = () => {
        const passwordRegExp = /^[가-힣|a-z|A-Z|0-9]+$/;
        const password = passwordRef.current._lastNativeText;
        if (passwordRegExp.test(password)) {
            console.log('set password in useState', password);
            setPassword(password);
            setPasswordNoticeText('');
        } else {
            setPasswordNoticeText('비밀번호 형식이 맞지 않습니다');
        }
    };

    const handleNameTextBlur = () => {
        const nameRegExp = /^[가-힣|a-z|A-Z|0-9]+$/;
        const name = nameRef.current._lastNativeText;
        if (nameRegExp.test(name)) {
            console.log('set name in useState', name);
            setName(name);
            setNameNoticeText('');
        } else {
            setNameNoticeText('이름 형식이 맞지 않습니다');
        }
    };

    const handleStudentIdTextBlur = () => {
        const studentIdRegExp = /^[가-힣|a-z|A-Z|0-9]+$/;
        const studentId = studentIdRef.current._lastNativeText;
        if (studentIdRegExp.test(studentId)) {
            setStudentId(studentId);
            setStudentIdNoticeText('');
        } else {
            setStudentIdNoticeText('학번 형식이 맞지 않습니다');
        }
    };

    const handlePhoneNumberTextBlur = () => {
        const phoneNumberRegExp = /^[가-힣|a-z|A-Z|0-9]+$/;
        const phoneNumber = phoneNumberRef.current._lastNativeText;
        if (phoneNumberRegExp.test(phoneNumber)) {
            setPhoneNumber(phoneNumber);
            setPhoneNumberNoticeText('');
        } else {
            setPhoneNumberNoticeText('핸드폰 번호 형식이 맞지 않습니다');
        }
    };

    const pickImageHandler = () => {
        ImagePicker.showImagePicker({title: "Pick an Image", maxWidth: 800, maxHeight: 600}, res => {
            if (res.didCancel) {
                console.log("User cancelled!");
            } else if (res.error) {
                console.log("Error", res.error);
            } else {
                console.log(res.uri);
                setImageUrl(res.uri);
                setIsPictureUploaded(true);
            }
        });
    };

    const getMaxDate = () => {
        const fullYear = new Date().getFullYear();
        return `${fullYear - 18}-12-31`;
    };

    const signUpExec = () => {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('pwd', password);
        formData.append('name', name);
        formData.append('birthDay', birthDay);
        formData.append('studentId', studentId);
        formData.append('isWorker', isWorker);
        formData.append('phoneNumber', phoneNumber);
        formData.append('profileImg', {
            uri: imageUrl,
            type: 'image/jpeg',
            name: 'imgimg'
        });

        showSignUpFormData(formData);

        // axios({
        //     method: 'POST',
        //     url: ConstantValue.serverDomain + '/api/member',
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     },
        //     data: formData
        // })
        //     .then(function (response) {
        //         console.log(response);
        //         // navigation.goBack()
        //     })
        //     .catch(error => {
        //         let errorObject = JSON.parse(JSON.stringify(error));
        //         console.log(errorObject);
        //         //dispatch(authError(errorObject.response.data.error));
        //     });
    };

    const showSignUpFormData = formData => {
        const data = formData["_parts"];
        data.forEach(element => console.log(element[0], element[1]));
    };

    useEffect(() => {
        if (isPictureUploaded) {
            setIsDisableImagePicker(false);
        } else {
            setIsDisableImagePicker(true);
        }
    }, [isPictureUploaded]);

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <View style={styles.textFieldContainer}>
                    <Text style={styles.titleText}>회원가입</Text>
                    <TextInput
                        ref={idRef}
                        maxLength={Utility.idLength}
                        style={styles.textField}
                        onBlur={() => handleIdTextBlur()}
                        placeholder="아이디"
                    />
                    {isNotEmpty(idNoticeText) && (
                        <Text style={styles.noticeText}>{idNoticeText}</Text>
                    )}
                    <TextInput
                        ref={passwordRef}
                        maxLength={Utility.passWordLength}
                        style={styles.textField}
                        onBlur={() => handlePasswordTextBlur()}
                        secureTextEntry={true}
                        placeholder="비밀번호"
                    />
                    {isNotEmpty(passwordNoticeText) && (
                        <Text style={styles.noticeText}>{passwordNoticeText}</Text>
                    )}
                    <TextInput
                        ref={nameRef}
                        maxLength={Utility.nameLength}
                        style={styles.textField}
                        placeholder="이름"
                        onBlur={() => handleNameTextBlur()}
                    />
                    {isNotEmpty(nameNoticeText) && (
                        <Text style={styles.noticeText}>{nameNoticeText}</Text>
                    )}
                    <TextInput
                        ref={studentIdRef}
                        maxLength={Utility.studentIdLength}
                        style={styles.textField}
                        placeholder="학번 (ex 19 or 20)"
                        onBlur={() => handleStudentIdTextBlur()}
                        // onChangeText={text => setStudentId(text)}
                    />
                    {isNotEmpty(studentIdNoticeText) && (
                        <Text style={styles.noticeText}>{studentIdNoticeText}</Text>
                    )}
                    <TextInput
                        ref={phoneNumberRef}
                        maxLength={Utility.phoneNumberLength}
                        style={styles.textField}
                        placeholder="휴대폰"
                        onBlur={() => handlePhoneNumberTextBlur()}
                    />
                    {isNotEmpty(phoneNumberNoticeText) && (
                        <Text style={styles.noticeText}>{phoneNumberNoticeText}</Text>
                    )}
                    <DatePicker
                        style={styles.datePicker}
                        mode="date"
                        placeholder="생일 입력"
                        format="YYYY-MM-DD"
                        androidMode="spinner"
                        maxDate={getMaxDate()}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={(date) => {
                            setBirthDay(date);
                        }}
                        date={birthDay}
                    />
                    <View style={{flexDirection: 'row', margin: 10}}>
                        <RadioForm
                            style={styles.radioForm}
                            radio_props={workerProps}
                            initial={isWorker}
                            onPress={value => setIsWorker(value)}
                            labelHorizontal={false}
                            formHorizontal={true}
                        />
                        <View style={styles.imagePicker}>
                            <CheckBox
                                disabled={isDisableImagePicker}
                                value={isPictureUploaded}
                                onChange={() => setIsPictureUploaded(false)}
                            />
                            <TouchableOpacity
                                onPress={pickImageHandler}>
                                <Text style={styles.imagePickerText}>사진 가져오기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
        paddingTop: 50,
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
        height: 50,
        margin: 10,
        borderBottomWidth: 1,
        borderBottomColor: Utility.color.primary,
    },
    button: {
        marginBottom: 20,
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
    titleText: {
        fontSize: 20,
        paddingBottom: 20,
    },
    datePicker: {
        margin: 20,
        width: "60%"
    },
    radioForm: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
    imagePicker: {
        flexDirection: 'row',
        marginLeft: 20,
        height: 50,
        backgroundColor: '#00ff0000',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePickerText: {
        color: 'black',
    },
    noticeText: {
        color: 'red',
    },
});

export default SignUp;
