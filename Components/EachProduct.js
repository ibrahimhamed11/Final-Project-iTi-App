import { View, Text, StyleSheet, Image, Dimensions, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons'
import { Button, SegmentedButtons, Divider, TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const EachProduct = () => {
    const [value, setValue] = React.useState('');
    const nav = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.productsImages}>
                <FontAwesome name="heart-o" size={20} color="white" style={{ marginRight: 10, position: 'absolute', zIndex: 500, right: 10, top: 20 }} />
                <TouchableRipple
                    onPress={() => require('../assets/homeimages/baby_clothes.jpg')}
                    rippleColor="rgba(0, 0, 0, .32)"
                >
                    <Image source={require('../assets/homeimages/baby_clothes.jpg')} style={styles.image} />
                </TouchableRipple>
            </View>
            <View style={styles.productsDetails}>
                <View style={{ backgroundColor: '#eed1f0', width: 70, padding: 8, borderRadius: 20, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginLeft: 250 }}>
                    <Icon name='star' size={14} color={'white'} />
                    <Text style={{ color: 'white', marginLeft: 2, fontSize: 14 }} > 3.5</Text>
                </View>
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20, marginHorizontal: 5 }}>
                    <Text style={styles.productPrice}> 300L.E</Text>
                    <Text style={styles.productName}>سالوبت اطفال</Text>
                </View>

                <View style={styles.sizes}>
                    <Text style={styles.productSize}>مقاس</Text>
                    <SafeAreaView style={styles.sizesIcons}>
                        <SegmentedButtons
                            value={value}
                            onValueChange={setValue}
                            buttons={[
                                {
                                    value: '12',
                                    label: '12',
                                },
                                {
                                    value: '13',
                                    label: '13',
                                },
                                { value: '14', label: '14' },
                                { value: '15', label: '15' },
                            ]}
                        />
                    </SafeAreaView>
                </View>
                {/* <Divider /> */}
                <View tyle={styles.productDescription}>
                    <Text style={styles.title}>تفاصيل </Text>
                    <View style={styles.description}>
                        <Text style={styles.descriptionText}>الخامة: قطن</Text>
                        {/* <Text style={styles.descriptionText}>اللون: ابيض</Text> */}
                        <Text style={styles.descriptionText}>المصنع: BabyCare</Text>
                        <Button onPress={() => nav.navigate('moreDetails')} style={{ justifyContent: 'flex-start', alignItems: 'center', width: 100, color: '#76005F' }}>
                            اقرا المزيد ....
                        </Button>
                    </View>
                </View>
                <View style={styles.addProduct}>
                    <FontAwesome name="shopping-cart" size={20} color="#76005F" style={{ borderColor: '#76005F', borderWidth: 1, padding: 10, borderRadius: 100 }} />
                    <Button mode="contained" style={{ backgroundColor: '#76005F' }}> أضف لعربة التسوق</Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: Dimensions.get('screen').width,
        height: 350,
        position: 'relative',
    },
    productsDetails: {
        padding: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        position: 'absolute',
        bottom: 0
    },
    productName: {
        fontSize: 28,
        fontWeight: 600,
        color: '#76005F',
    },
    productPrice: {
        color: '#76005F',
        fontWeight: 500,
        fontSize: 16
    },
    sizes: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productSize: {
        fontSize: 22,
        fontWeight: 400,
        color: '#76005F',
    },
    sizesIcons: {
        width: 20,
        marginVertical: 10,
    },
    addProduct: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    title: {
        fontSize: 22,
        fontWeight: 400,
        color: '#76005F',
        marginTop: 15,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#eaeaea',
        borderRadius: 3
    },
    description: {
        marginHorizontal: 10,
        marginVertical: 10
    },
    descriptionText: {
        fontSize: 16,
        fontWeight: 400,
        color: '#320053',
        margin: 5,
    }
})
export default EachProduct