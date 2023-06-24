import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
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
            <Header style={[styles.arabicText, { fontFamily: 'Droid', fontSize: 30, marginBottom: '50%' }]}>

                هل تود الرغبه في الانضمام             </Header>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('sellerRegister')}
                style={styles.cardContainer}
            >
                <Card style={[styles.card, styles.sellerCard]}>
                    <Animated.View style={[styles.cardContent, { transform: [{ scale: animatedScale }] }]}>
                        <FontAwesome5 name="user" size={50} color="#fff" />
                        <Title style={[styles.cardTitle, { fontFamily: 'Droid' }]}>بائع</Title>
                    </Animated.View>
                </Card>
            </TouchableOpacity>




            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('motherRegister')} style={styles.cardContainer}
            >
                <Card style={[styles.card, styles.motherCard]}>
                    <Animated.View style={[styles.cardContent, { transform: [{ scale: animatedScale }] }]}>
                        <FontAwesome5 name="female" size={50} color="#fff" />
                        <Title style={[styles.cardTitle, { fontFamily: 'Droid' }]}>أم</Title>
                    </Animated.View>
                </Card>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#e1f5fe', // Change the background color here
    },
    cardContainer: {
        marginBottom: 16,
        width: 300,
        borderRadius: 8,
        overflow: 'hidden',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 4,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
    },
    cardTitle: {
        marginLeft: 16,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    sellerCard: {
        backgroundColor: '#ff5777',
    },
    motherCard: {
        backgroundColor: '#f582ae',
    },
});

export default HomeScreen;
