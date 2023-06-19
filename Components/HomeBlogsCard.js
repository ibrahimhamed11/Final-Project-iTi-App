import * as React from 'react';
import { Text, View, StyleSheet, Image, Dimensions, ImageBackground } from 'react-native';

// You can import from local files

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

const HomeBlogsCard = ({ item }) => {
    return (
        //   <ImageBackground source={item.image} style={{width: Dimensions.get('screen').width*0.5, height: Dimensions.get('screen').height*0.2}}>
        //   <Text>Inside</Text>
        // </ImageBackground>
        <View >

            <View style={styles.card_template}>
                <Image

                    style={styles.card_image}
                    source={item.image}
                />
                <View style={styles.text_container}>
                    <Text style={styles.card_title}>{item.nameOfProduct}</Text>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    card_template: {
        width: Dimensions.get('screen').width * 0.4,
        height: Dimensions.get('screen').height * 0.3,
        boxShadow: "10px 10px 17px 12px rgba(0, 0, 0, 0.893)",
        margin: 20,
        shadowColor: '#654855',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 10,
    },
    card_image: {
        width: Dimensions.get('screen').width * 0.4,
        height: Dimensions.get('screen').height * 0.3,
        borderRadius: 10
    },
    text_container: {
        position: "absolute",
        width: Dimensions.get('screen').width * 0.4,
        height: 30,
        bottom: 0,
        padding: 5,
        backgroundColor: "rgba(243, 238, 238, 0.3)",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    card_title: {
        color: "black",

    }
});

export default HomeBlogsCard