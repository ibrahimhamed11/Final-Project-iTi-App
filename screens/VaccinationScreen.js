import React, { useState, useEffect } from 'react'
import randomColor from 'randomcolor';
import { View, StyleSheet, FlatList, ScrollView, Image, Text, Dimensions, TouchableOpacity, ImageBackground } from 'react-native'
// import Icon from 'react-native-vector-icons/Ionicons'
import { Checkbox } from 'react-native-paper';



const VaccinationScreen = () => {
    const [vaccinationAge, setvaccinationAge] = useState([
        { minAge: 0, maxAge: 2, by: 'mo .' },
        { minAge: 2, maxAge: 4, by: 'mo .' },
        { minAge: 4, maxAge: 6, by: 'mo .' },
        { minAge: 6, maxAge: 8, by: 'mo .' },
        { minAge: 8, maxAge: 10, by: 'mo .' },
        { minAge: 10, maxAge: 12, by: 'mo .' },
        { minAge: 12, maxAge: 14, by: 'mo .' },
        { minAge: 14, maxAge: 16, by: 'mo .' },
        { minAge: 16, maxAge: 18, by: 'mo .' },
        { minAge: 18, maxAge: 20, by: 'mo .' },
        { minAge: 20, maxAge: 22, by: 'mo .' },
        { minAge: 22, maxAge: 24, by: 'mo .' },
    ]);
    const [itemColors, setItemColors] = useState([]);

    const [arr, setArr] = useState([
        { vaccinename: 'جدرى', status: 'complete', date: '16 jun 2023', color: 'red' },
        { vaccinename: 'تطعيم شلل الاطفال ', status: 'coming', date: '16 jun 2023' },
        { vaccinename: 'شلل الاطفال', status: 'coming', date: '16 jun 2023', color: 'red' },
        { vaccinename: 'شلل الاطفال', status: 'coming', date: '16 jun 2023', color: 'red' },
        { vaccinename: 'شلل الاطفال', status: 'coming', date: '16 jun 2023', color: 'red' },

    ]);

    const [babyInfo, setbabyInfo] = useState([
        { vaccinename: 'vaccinename', status: 'complete' },

    ]);

    useEffect(() => {
        const colors = [];
        for (let i = 0; i < arr.length; i++) {
            const color = randomColor({ format: 'rgba', hue: '#76005f', luminosity: 'light' });
            colors.push(color);
        }
        setItemColors(colors);
    }, [arr]);

    // function showVaccines() {  
    //     axios.get("https://dummyjson.com/{{baby_id}}"+{maxAge}).then(res => {
    //         // console.log(res.data)
    //         setArr([...res.data.vaccines]);

    //     })
    // }

    return (
        <View>
            <View style={{ height: 220, backgroundColor: '#d4bdd0b3', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                {/* <Image source={require('../assets/images/Untitled design.png')} style={{ width: 100 }}></Image> */}
                <Text style={styles.title}>Vaccination Progress</Text>
                <FlatList
                    horizontal
                    data={vaccinationAge}
                    key={(item) => item.age}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <ImageBackground source={require('../assets/images/vaccine.jpg')} style={[styles.box, { flex: 1, borderRadius: 10, overflow: 'hidden', }]} >
                                <TouchableOpacity onPress={() => { }} style={{
                                    shadowColor: '#dcd9e0f8',
                                    shadowOffset: { width: 1, height: 1 },
                                    shadowOpacity: 0.6,
                                    shadowRadius: 2
                                }}>
                                    <Text style={styles.age} >{item.minAge}-{item.maxAge}</Text>
                                    <Text style={styles.month}>{item.by}</Text>
                                </TouchableOpacity>
                            </ImageBackground >
                        )
                    }}
                />
            </View>
            <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 50 }}>
                {/* <ImageBackground source={require('../assets/images/background.jpg')}    > */}
                <FlatList
                    style={{ paddingHorizontal: 15, height: Dimensions.get('screen').height, }}
                    data={arr}
                    key={(item) => item.vaccinename}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.progress_container}>


                                {/* <Text style={{ fontSize:15, width:80}}>{item.status}</Text> */}
                                <View style={[styles.vaccine_box, { backgroundColor: itemColors[index] }]}>
                                    <Checkbox status="checked" />
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ fontSize: 20, paddingHorizontal: 10, color: 'white' }}>{item.vaccinename}</Text>
                                        <Text style={{ fontSize: 15, padding: 10, color: '#a9a4a8' }}>{item.date}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'column', alignItems: 'center', width: 10 }}>
                                    <View style={styles.circle}><View style={styles.inside_circle}></View></View>
                                    <View style={styles.line}></View>
                                </View>

                            </View>

                        )
                    }}
                />
                {/* </ImageBackground> */}
            </ScrollView>
        </View >
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: 26,
        fontWeight: 500,
        padding: 10,
        marginVertical: 8,
        color: '#76005f',
        borderBottomColor: 'grey',
        borderBottomWidth: 2,
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
        margin: 6,

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
        justifyContent: 'center'
    },
    inside_circle: {
        width: 10,
        height: 10,
        borderRadius: 100,
        backgroundColor: '#fcdb76ff',
        shadowColor: '#c9168df8',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
    },
    line: {
        width: 1,
        height: 80,
        backgroundColor: 'black',
        padding: 0.1
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
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingVertical: 10,
        justifyContent: 'space-between'
    }
})
export default VaccinationScreen;