import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../Components/Background';
import SellerLogo from '../Components/sellerLogo';
import Header from '../Components/Header';
import Button from '../Components/Button';
import TextInput from '../Components/TextInput';
import BackButton from '../Components/BackButton';
import { theme } from '../core/theme';
import { emailValidator } from '../helpers/emailValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import { phoneValidator, nameValidator, addressValidator, usernameValidator } from '../helpers/dataValidator';

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
// import { faCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import * as Font from 'expo-font';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import ip from '../ipConfig';

export default function SellerRegister({ navigation }) {
    const [name, setName] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [phone, setPhone] = useState({ value: '', error: '' });
    const [address, setAddress] = useState({ value: '', error: '' });
    const [username, setUsername] = useState({ value: '', error: '' });
    const [selectedImage, setSelectedImage] = useState(null);

    const [step, setStep] = useState(1);
    const [isFontLoaded, setIsFontLoaded] = useState(false);
    const [imageUri, setImageUri] = useState('');


    const handleImageUpload = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }


        const imageResult = await ImagePicker.launchImageLibraryAsync();
        if (!imageResult.cancelled) {
            setSelectedImage(imageResult.uri);
        }
    };
    // Font
    useEffect(() => {
        const loadFont = async () => {
            await Font.loadAsync({
                'Droid': require('../assets/fonts/Droid.ttf'),
            });
            setIsFontLoaded(true);
        };

        loadFont();
    }, []);

    // const onSignUpPressed = async () => {
    //     const nameError = nameValidator(name.value);
    //     const emailError = emailValidator(email.value);
    //     const passwordError = passwordValidator(password.value);
    //     const phoneError = phoneValidator(phone.value);
    //     const addressError = addressValidator(address.value);
    //     const usernameError = usernameValidator(username.value);

    //     if (emailError || passwordError || nameError || phoneError || addressError) {
    //         setName({ ...name, error: nameError });
    //         setEmail({ ...email, error: emailError });
    //         setPassword({ ...password, error: passwordError });
    //         setPhone({ ...phone, error: phoneError });
    //         setAddress({ ...address, error: addressError });
    //         setUsername({ ...username, error: usernameError });

    //         return;
    //     }

    //     try {
    //         const response = await axios.post(`${ip}/user/register`, {
    //             name: name.value,
    //             email: email.value,
    //             password: password.value,
    //             phone: phone.value,
    //             address: address.value,
    //             username: username.value,
    //             image: selectedImage,
    //             role: 'seller'

    //         });

    //         // Handle the response from the server
    //         console.log(response.data); // You can customize this based on your backend API response
    //         navigation.reset({
    //             index: 0,
    //             routes: [{ name: 'Home' }],
    //         });
    //     } catch (error) {
    //         // Handle error
    //         console.log(error);
    //     }
    // };







    const sendDataToBackend = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name.value);
            formData.append('email', email.value);
            formData.append('password', password.value);
            formData.append('phone', phone.value);
            formData.append('address', address.value);
            formData.append('username', username.value);
            formData.append('image', {
                uri: selectedImage,
                type: 'image/jpeg',
                name: 'product.jpg',
            });
            formData.append('role', 'seller');

            const response = await axios.post(`${ip}/user/register`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },

            });
            

            // Handle the response from the server
            console.log('user add ', response.data); // You can customize this based on your backend API response
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        } catch (error) {
            // Handle error
            console.log(error);
        }
    };


    const onSignUpPressed = () => {
        const nameError = nameValidator(name.value);
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        const phoneError = phoneValidator(phone.value);
        const addressError = addressValidator(address.value);
        const usernameError = usernameValidator(username.value);

        if (emailError || passwordError || nameError || phoneError || addressError) {
            setName({ ...name, error: nameError });
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            setPhone({ ...phone, error: phoneError });
            setAddress({ ...address, error: addressError });
            setUsername({ ...username, error: usernameError });
            sendDataToBackend();
            return;
        }


    };







    const renderProgressBar = () => {
        return (
            <View style={styles.progressBar}>
                <View style={styles.progressStep}>
                    <FontAwesome5Icon
                        name={step >= 1 ? 'check-circle' : 'circle'}
                        size={30}
                        style={styles.progressIcon}
                    />
                    {/* <Text style={styles.stepNumber}>1</Text> */}
                </View>
                <View style={styles.progressLine} />
                <View style={styles.progressStep}>
                    <FontAwesome5Icon
                        name={step >= 2 ? 'check-circle' : 'circle'}
                        size={30}
                        style={styles.progressIcon}
                    />
                    <Text style={styles.stepNumber}>{ip}</Text>
                </View>
                <View style={styles.progressLine} />
                <View style={styles.progressStep}>
                    <FontAwesome5Icon
                        name={step >= 3 ? 'check-circle' : 'circle'}
                        size={30}
                        style={styles.progressIcon}
                    />
                    {/* <Text style={styles.stepNumber}>3</Text> */}
                </View>
            </View>
        );
    };


    if (!isFontLoaded) {
        // Render a loading screen or placeholder while the font is loading
        return null;
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAwareScrollView contentContainerStyle={styles.container}>
                <Background>
                    <BackButton goBack={navigation.goBack} />
                    {/* <Logo /> */}
                    <SellerLogo />
                    <Header style={[styles.arabicText, { fontFamily: 'Droid', fontSize: 20 }]}>
                        استمارة التسجيل للبائع
                    </Header>
                    {renderProgressBar()}
                    {step === 1 && (
                        <View>
                            <TextInput
                                label="الاسم"
                                returnKeyType="next"
                                value={name.value}
                                onChangeText={(text) => setName({ value: text, error: '' })}
                                error={!!name.error}
                                errorText={name.error && <Text style={{ fontFamily: 'Droid', color: 'red' }}>{name.error}</Text>}
                                style={styles.input}
                            />
                            {/* Add any additional fields for step 1 */}
                            <TextInput
                                label="رقم الهاتف"
                                returnKeyType="next"
                                value={phone.value}
                                onChangeText={(text) => setPhone({ value: text, error: '' })}
                                error={!!phone.error}
                                errorText={phone.error && <Text style={{ fontFamily: 'Droid', color: 'red' }}>{phone.error}</Text>}
                                keyboardType="phone-pad"
                                style={[styles.input, { fontFamily: 'Droid' }]}
                            />
                            <TextInput
                                label="العنوان"
                                returnKeyType="next"
                                value={address.value}
                                onChangeText={(text) => setAddress({ value: text, error: '' })}
                                error={!!address.error}
                                errorText={address.error && <Text style={{ fontFamily: 'Droid', color: 'red' }}>{address.error}</Text>}
                                style={[styles.input, { fontFamily: 'Droid' }]}
                            />
                        </View>
                    )}
                    {step === 2 && (
                        <View>
                            <TextInput
                                label="اسم المستخدم"
                                returnKeyType="next"
                                value={username.value}
                                onChangeText={(text) => setUsername({ value: text, error: '' })}
                                error={!!username.error}
                                errorText={username.error && <Text style={{ fontFamily: 'Droid', color: 'red' }}>{username.error}</Text>}
                                autoCapitalize="none"
                                style={[styles.input, { fontFamily: 'Droid' }]}
                            />

                            <TextInput
                                label="البريد الإلكتروني"
                                returnKeyType="next"
                                value={email.value}
                                onChangeText={(text) => setEmail({ value: text, error: '' })}
                                error={!!email.error}
                                errorText={email.error && <Text style={{ fontFamily: 'Droid', color: 'red' }}>{email.error}</Text>}
                                autoCapitalize="none"
                                autoCompleteType="email"
                                textContentType="emailAddress"
                                keyboardType="email-address"
                                style={[styles.input, { fontFamily: 'Droid' }]}
                            />
                            <TextInput
                                label="كلمة المرور"
                                returnKeyType="done"
                                value={password.value}
                                onChangeText={(text) => setPassword({ value: text, error: '' })}
                                error={!!password.error}
                                errorText={password.error && <Text style={{ fontFamily: 'Droid', color: 'red' }}>{password.error}</Text>}
                                secureTextEntry
                                style={styles.input}
                            />
                            {/* Add any additional fields for step 2 */}
                        </View>

                    )}
                    {step === 3 && (
                        <View style={styles.imageContainer}>
                            {selectedImage ? (
                                <Image source={{ uri: selectedImage }} style={styles.image} />
                            ) : (
                                <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
                                    <Text style={styles.uploadButtonText}>رفع صورة</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}


                    <Button
                        mode="contained"
                        onPress={step < 3 ? () => setStep(step + 1) : onSignUpPressed}
                        style={{ marginTop: 24 }}
                    >
                        <Text style={[styles.link, { fontFamily: 'Droid', color: 'white' }]}>
                            {step < 3 ? 'التالي' : 'التسجيل'}
                        </Text>
                    </Button>




                    {step > 1 && (
                        <TouchableOpacity onPress={() => setStep(step - 1)} style={{ marginTop: 8 }}>
                            <Text style={[styles.link, { fontFamily: 'Droid' }]}>الخطوة السابقة</Text>
                        </TouchableOpacity>
                    )}
                    <View style={styles.row}>
                        <Text style={[styles.link, { fontFamily: 'Droid', color: 'black', marginRight: 10, marginBottom: 200 }]}>
                            هل لديك حساب
                        </Text>
                        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
                            <Text style={[styles.link, { fontFamily: 'Droid' }]}>تسجيل الدخول</Text>
                        </TouchableOpacity>
                    </View>
                </Background>
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({

    container: {

        marginTop: 30
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },

    progressBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 32, // Increase the margin-top value
        marginBottom: 30, // Increase the margin-bottom value
        fontSize: 50
    },
    progressStep: {
        alignItems: 'center',
    },
    progressIcon: {
        fontSize: 60, // Increase the font size to make the icon bigger
        color: theme.colors.primary,

    },
    stepNumber: {
        fontFamily: 'Droid',
        fontSize: 20, // Increase the font size for the step number
        marginTop: 8, // Increase the margin-top value
    },
    progressLine: {
        flex: 1,
        height: 4, // Increase the height of the progress line
        backgroundColor: theme.colors.primary,
        alignSelf: 'center',
        marginHorizontal: 12, // Increase the margin-horizontal value
    },
    input: {
        width: 300, // Set your desired fixed width here
    },

    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 150,
        borderRadius: 75, // Half the width and height to create a circular shape
        backgroundColor: 'lightgray',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75, // Half the width and height to maintain the circular shape
    },
    uploadButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 150,
    },
    uploadButtonText: {
        fontSize: 16,
        color: 'white',
    },
});
