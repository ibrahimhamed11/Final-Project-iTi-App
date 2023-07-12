import React, { useState, useEffect } from 'react';
import randomColor from 'randomcolor';
import {
    View,
    StyleSheet,
    FlatList,
    ScrollView,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
    ImageBackground,
    Modal,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ip from '../ipConfig';

const VaccinationScreen = ({ route }) => {
    const [vaccinationAge, setvaccinationAge] = useState([
        { min: 0, max: 2, by: 'mo .' },
        { min: 2, max: 4, by: 'mo .' },
        { min: 4, max: 6, by: 'mo .' },
        { min: 6, max: 8, by: 'mo .' },
        { min: 8, max: 10, by: 'mo .' },
        { min: 10, max: 12, by: 'mo .' },
        { min: 12, max: 14, by: 'mo .' },
        { min: 14, max: 16, by: 'mo .' },
        { min: 16, max: 18, by: 'mo .' },
        { min: 18, max: 20, by: 'mo .' },
        { min: 20, max: 22, by: 'mo .' },
        { min: 22, max: 24, by: 'mo .' },
    ]);

    const [itemColors, setItemColors] = useState([]);
    const [babyList, setBabyList] = useState([]);
    const [selectedBaby, setSelectedBaby] = useState(null);
    const [vaccinations, setVaccinations] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchBabyData = async () => {
            try {
                const motherId = await AsyncStorage.getItem('userId');
                const response = await axios.get(`${ip}/user/${motherId}`);
                const babyInfo = response.data.data.profile.babyInfo;
                setBabyList(babyInfo);
            } catch (error) {
                console.log('Error fetching baby data:', error);
            }
        };

        fetchBabyData();
    }, []);

    useEffect(() => {
        const colors = [];
        for (let i = 0; i < vaccinations.length; i++) {
            const color = randomColor({
                format: 'rgba',
                hue: '#76005f',
                luminosity: 'light',
            });
            colors.push(color);
        }
        setItemColors(colors);
    }, [vaccinations]);

    const getBabyVaccinations = async (babyId) => {
        try {
            const response = await axios.get(`${ip}/user/baby/vaccinations/${babyId}`);
            setVaccinations(response.data.vaccinations);
        } catch (error) {
            console.log('Error fetching baby vaccinations:', error);
        }
    };

    const toggleStatus = async (vaccinationId, status) => {
        try {
            const response = await axios.put(`${ip}/vaccination/${vaccinationId}`, {
                status: !status,
            });
            const updatedVaccination = response.data;
            setVaccinations((prevVaccinations) =>
                prevVaccinations.map((vaccination) =>
                    vaccination._id === updatedVaccination._id ? updatedVaccination : vaccination
                )
            );
        } catch (error) {
            console.log('Error updating vaccine status:', error);
        }
    };

    const updateVaccinationStatus = async (vaccinationId, babyId) => {
        try {
            const response = await axios.patch(
                `${ip}/user/baby/${babyId}/vaccination/${vaccinationId}`,
                {
                    status: true,
                }
            );
            // Handle success
            console.log(response.data);
        } catch (error) {
            // Handle error
            console.log(error);
        }
    };

    return (
        <View style={{ backgroundColor: '#ffffff' }}>
            <View
                style={{
                    height: Dimensions.get('screen').height * 0.35,
                    backgroundColor: '#d4bdd0b3',
                    borderBottomLeftRadius: 90,
                }}
            >
                <View style={styles.header_con}>
                    <Text style={styles.title}>التـطعيـمـــات</Text>
                </View>

                <FlatList
                    style={{ marginLeft: 2 }}
                    horizontal
                    data={vaccinationAge}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <ImageBackground
                                source={require('../assets/images/vaccine.jpg')}
                                style={[
                                    styles.box,
                                    { flex: 1, borderRadius: 10, overflow: 'hidden' },
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={() => getBabyVaccinations(selectedBaby?._id)}
                                    style={{
                                        shadowColor: '#dcd9e0f8',
                                        shadowOffset: { width: 1, height: 1 },
                                        shadowOpacity: 0.6,
                                        shadowRadius: 2,
                                    }}
                                >
                                    <Text style={styles.age}>
                                        {item.min}-{item.max}
                                    </Text>
                                    <Text style={styles.month}>{item.by}</Text>
                                </TouchableOpacity>
                            </ImageBackground>
                        );
                    }}
                />
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 300 }}>
                <ImageBackground source={require('../assets/images/background.jpg')}>
                    {babyList.map((baby) => (
                        <TouchableOpacity
                            key={baby._id}
                            style={styles.babyContainer}
                            onPress={() => {
                                setSelectedBaby(baby);
                                getBabyVaccinations(baby._id);
                                setModalVisible(true);
                            }}
                        >
                            <Text style={styles.babyName}>{baby.name}</Text>
                            <Text style={styles.vaccineCount}>
                                {baby.vaccination.length} التطعيمات
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ImageBackground>
            </ScrollView>

            {/* Modal */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>التطعيمات</Text>
                        {vaccinations.length > 0 ? (
                            <FlatList
                                data={vaccinations.filter((vaccine) => !vaccine.status)}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item }) => (
                                    <View style={styles.modalVaccineItem}>
                                        <Text style={styles.modalVaccineName}>{item.name}</Text>
                                        <Text style={styles.modalVaccineName}>{item.age}</Text>

                                        <TouchableOpacity
                                            style={styles.modalVaccineButton}
                                            onPress={() =>
                                                updateVaccinationStatus(item._id, selectedBaby?._id)
                                            }
                                        >
                                            <Text style={styles.modalVaccineButtonText}>تم التطعيم</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                        ) : (
                            <Text style={styles.vtextStyle}>لا يوجد تطعيم له </Text>
                        )}

                        <TouchableOpacity
                            style={styles.modalCloseButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.modalCloseButtonText}>اغلاق </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    header_con: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    title: {
        fontSize: 26,
        fontWeight: '500',
        paddingVertical: 10,
        marginVertical: 10,
        color: '#76005f',
        marginTop: 40,
        fontFamily: 'Droid',
    },
    box: {
        flexGrow: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 115,
        height: 100,
        margin: 5,
        shadowColor: '#000000f8',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 5,
    },
    age: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white',
    },
    month: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    babyContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    babyName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#76005f',
        fontFamily: 'Droid',
        alignSelf: 'center'

    },
    vaccineCount: {
        color: '#76005f',
        fontFamily: 'Droid',

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 30,
        marginHorizontal: 20,
        alignItems: 'center',
        elevation: 5,
        height: '40%',
        minWidth: 200, // Set the minimum width value here
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#76005f',
        fontFamily: 'Droid',
    },
    modalVaccineItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
        width: '100%',
    },
    modalVaccineName: {
        fontSize: 16,
        color: '#76005f',
        paddingHorizontal: 10,
    },
    modalVaccineButton: {
        backgroundColor: '#76005f',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
    },
    modalVaccineButtonText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
    modalCloseButton: {
        marginTop: 30,
        backgroundColor: '#76005f',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
    },
    modalCloseButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    vtextStyle: {
        fontFamily: 'Droid',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 50,
    },
});

export default VaccinationScreen;
