import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Dimensions, Image, Text } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import { Font } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import Header from '../Components/Header'

const HomeScreen = () => {
    const animatedScale = useRef(new Animated.Value(1)).current;
    const [isFontLoaded, setIsFontLoaded] = useState(false);
    const navigation = useNavigation();

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

    const handleCardPress = (isSeller) => {
        Animated.sequence([
            Animated.timing(animatedScale, {
                toValue: 0.9,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(animatedScale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ])
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/onboarding/basic.png')} style={styles.backgroundImage}/>
            <View style={styles.joinAs}>
                <View 
                style={{  
                    flexDirection:'row',
                    alignItems:'center',
                    backgroundColor:'#76005f',  
                    paddingHorizontal: Dimensions.get('screen').width*0.05,
                    paddingVertical: Dimensions.get('screen').width*0.015,
                    borderRadius:10,
                    marginBottom:'25%',
                    }}>
                    <FontAwesome5 name="arrow-circle-down" style={{color:'white', fontSize:18 }} />
                    <Text style={{
                        fontFamily: 'Droid', 
                        fontSize: 18, 
                        fontWeight:'bold',
                        color:'white',
                        marginLeft:10
                    }}>
                        أختر نوع المستخدم
                    </Text>
                </View>

                {/* join as */}
                <View>
                    {/* join us as seller */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('sellerRegister')}
                        style={styles.cardContainer}
                    >
                        <Card style={[styles.card,{backgroundColor: '#A9A9A9'}]}>
                            <Animated.View style={[styles.cardContent, { transform: [{ scale: animatedScale }] }]}>
                                <Image source={require('../assets/onboarding/seller.png')} style={styles.cardImage} />
                                <Title style={[styles.cardTitle, { fontFamily: 'Droid' }]}>بائع</Title>
                            </Animated.View>
                        </Card>
                    </TouchableOpacity>

                    {/* join us as mother*/}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('motherRegister')} style={styles.cardContainer}
                    >
                        <Card style={[styles.card,{backgroundColor: '#76005f'}]}>
                            <Animated.View style={[styles.cardContent, { transform: [{ scale: animatedScale }] }]}>
                                <Image source={require('../assets/onboarding/mother.png')} style={styles.cardImage} />
                                <Title style={[styles.cardTitle, { fontFamily: 'Droid'}]}>أم</Title>
                            </Animated.View>
                        </Card>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },
    backgroundImage:{
        width:Dimensions.get('screen').width,
        height:Dimensions.get('screen').height,
        position:'relative',
    },
    joinAs:{
        position:'absolute',
        top:0,
        paddingVertical:'24%',
        alignItems:'center',
        justifyContent: 'space-between',
    },
    cardContainer: {
        marginBottom:30,
        width:Dimensions.get('screen').width*0.8,
        backgroundColor:'white',
        overflow: 'hidden',
        borderRadius:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius:10,
        elevation: 8,
    },
    card: {
        borderRadius: 10,
        paddingVertical:'2%',
        height:Dimensions.get('screen').height*0.19,
        paddingHorizontal:20,
        width:Dimensions.get('screen').width*0.8,
    },
    cardContent:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'100%',
        height:'100%'
    },
    cardImage:{
        width:'50%', 
        height:'100%',
        // resizeMode:'center'
    },
    cardTitle: {
        marginLeft: 16,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        width:'50%',
        textAlign:'center'
    },
});

export default HomeScreen;