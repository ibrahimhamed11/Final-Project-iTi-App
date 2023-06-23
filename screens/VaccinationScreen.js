import React, { useState, useEffect } from 'react'
import randomColor from 'randomcolor';
import { View, StyleSheet, FlatList, ScrollView, Image, Text, Dimensions, TouchableOpacity, ImageBackground } from 'react-native'
// import Icon from 'react-native-vector-icons/Ionicons'
import { Checkbox, Divider } from 'react-native-paper';
import axios from 'axios';


const VaccinationScreen = ({ motherId }) => {
    // set age averages 
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

    // make random colors to vaccine cards 
    const [itemColors, setItemColors] = useState([]);

    useEffect(() => {
        const colors = [];
        for (let i = 0; i < arr.length; i++) {
            const color = randomColor({ format: 'rgba', hue: '#76005f', luminosity: 'light' });
            colors.push(color);
        }
        setItemColors(colors);
    }, [arr]);
    // get vaccination data according to pressed age 
    const [arr, setArr] = useState([
        { name: 'جدرى', status: 'complete', date: '16 jun 2023' },
        { name: 'جدرى', status: 'complete', date: '16 jun 2023' },
        { name: 'جدرى', status: 'complete', date: '16 jun 2023' },
        { name: 'جدرى', status: 'complete', date: '16 jun 2023' },]);

    const showVaccines = (min, max) => {
        axios.get(`http://192.168.80.1:4000/vaccination/user/6492bf65d14976a97957160f`, { min, max }).then(res => {

            // console.log(res.data)
            setArr([...res.data.vaccinations]);
        }).catch(err => console.log(err));
    }

    const handleCompletedVaccine = (index) => {
        const updatedVaccinations = [...arr];
        updatedVaccinations[index].status = 'completed';
        setArr(updatedVaccinations);
    
        axios.put(`http://192.168.80.1:4000/vaccination/${updatedVaccinations[index]._id}`,{ status: 'completed' }
          ).then((res) => {
            console.log(res.data);
          })
          .catch((err) => console.log(err));
      };


    return (
        <View>
            <View style={{ height: 240, backgroundColor: '#d4bdd0b3', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
                <View style={styles.header_con}>
                    {/* <Image source={require('../assets/images/Untitled design.png')} style={{ width: 100 }}></Image> */}
                    <Text style={styles.title}>التـطعيـمـــات</Text>
                    <Image source={require('../assets/images/feeding_baby.jpg')} style={styles.baby_photo}></Image>
                </View>

                <FlatList
                    horizontal
                    data={vaccinationAge}
                    key={(item) => item.age}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <ImageBackground source={require('../assets/images/vaccine.jpg')} style={[styles.box, { flex: 1, borderRadius: 10, overflow: 'hidden', }]} >
                                <TouchableOpacity onPress={() => { showVaccines(item.min, item.max) }} style={{
                                    shadowColor: '#dcd9e0f8',
                                    shadowOffset: { width: 1, height: 1 },
                                    shadowOpacity: 0.6,
                                    shadowRadius: 2
                                }}>
                                    <Text style={styles.age} >{item.min}-{item.max}</Text>
                                    <Text style={styles.month}>{item.by}</Text>
                                </TouchableOpacity>
                            </ImageBackground >
                        )
                    }}
                />
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 10, }}>
                <ImageBackground source={require('../assets/images/background.jpg')} >
                    <FlatList
                        style={{ height: Dimensions.get('screen').height, }}
                        data={arr}
                        key={(item) => item.name}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={styles.progress_container}>
                                    <TouchableOpacity onPress={() => {  handleCompletedVaccine(index) }} style={{ elevation: 5 }}>
                                        <View style={[styles.vaccine_box, { backgroundColor: item.status === 'completed' ? '#3d0a31' : itemColors[index] }]}>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={{ fontSize: 20, paddingHorizontal: 10,  color: item.status === 'completed' ? '#f2eef1' : '#3d0a31' ,textDecorationLine:item.status === 'completed' ?'line-through' :'none' }}>{item.name}</Text>
                                                <Text style={{ fontSize: 15, padding: 10, color: '#722d6d' }}>{item.date}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: 'column', alignItems: 'center', width: 10 }}>
                                        <View style={styles.circle}>
                                            {item.status == 'completed' && <View style={styles.inside_circle}></View>}
                                        </View>
                                        <View style={styles.line}></View>
                                    </View>
                                </View>

                            )
                        }}
                    />
                </ImageBackground>
            </ScrollView>
        </View >
    )
}
const styles = StyleSheet.create({
    header_con: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    baby_photo: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginTop: 20,
        marginRight: 10,
        marginLeft: 10
    },
    title: {
        fontSize: 26,
        fontWeight: 500,
        paddingVertical: 10,
        // marginVertical: 8,
        color: '#76005f',
        marginTop: 40

        // borderBottomColor: 'grey',
        // borderBottomWidth: 0.5,
    },
    boxes_con: {
        flexDirection: 'row',

    },
    box: {
        flexGrow: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 115,
        height: 100,
        // backgroundColor: '#b802c5d3',
        // borderRadius: 200,
        margin: 3,
        shadowColor: '#000000f8',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 5
    },
    age: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white'
    },
    month: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10

    },
    progress_container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // alignItems: 'flex-end',
    },
    circle: {
        width: 20,
        height: 20,
        marginHorizontal: 20,
        borderRadius: 100,
        backgroundColor: '#a10081',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5

    },
    inside_circle: {
        width: 10,
        height: 10,
        borderRadius: 100,
        backgroundColor: '#f6ca45fb',
        // shadowColor: '#f4f41af8',
        // shadowOffset: { width: 0, height: 0 },
        // shadowOpacity: 0.8,
        // shadowRadius: 3,
        elevation: 5
    },
    line: {
        width: 1,
        height: 80,
        // backgroundColor: 'black',
        padding: 0.1,
        borderStyle: 'dashed',
        borderLeftColor: 'black',
        borderLeftWidth: 1

    },
    vaccine_box: {
        width: Dimensions.get('screen').width * 0.85,
        height: 80,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        // flexDirection: 'row',
        // alignItems: 'flex-end',
        paddingVertical: 10,
        justifyContent: 'space-between',

    }
})
export default VaccinationScreen;