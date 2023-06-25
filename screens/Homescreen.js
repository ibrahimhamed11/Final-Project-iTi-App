import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  Text,
  Dimensions,
  ImageBackground,
} from "react-native";
import HomeSlider from "../Components/HomeSlider";
import card from "../card";
import topproducts from "../topproducts";
import HomeBlogsCard from "../Components/HomeBlogsCard";
import TopRatedProducts from "../Components/topRatedProducts";
import axios from "axios";

export default function StartScreen({ navigation }) {
 
  const [products, setProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/products').then((response) => {
        setProducts(response.data.products);
        const topProducts = products.filter((product) => {
          if (product.rating >=4.5 && product.rating <=5){
              return true;
        }})
        setTopProducts(topProducts)
        console.log("start",topProducts,"endddddddd");
 
        })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    // <Background>
    <ScrollView style={styles.con}>
      
      <View>
        <FlatList
          data={card}
          renderItem={({ item }) => <HomeSlider item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            width: Dimensions.get("screen").width,
            paddingRight: 10,
            justifyContent:'flex-end'

          }}
        >
          <Text
            style={{ margin: 10, padding: 0, fontSize: 20, fontWeight: "bold",color:'#430335' }}
          >
            {" "}
            الاعلــى تقيـيـمـــاً
          </Text>
        </View>
        <View
          style={{
            width: Dimensions.get("screen").width * 0.3,
            backgroundColor: "#a072a1",
            height: 1,
            marginLeft: 300,
          }}
        >
        </View>

        <FlatList
          data={topProducts}
          renderItem={({ item }) => <TopRatedProducts item={item} />}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          width: Dimensions.get("screen").width,
          paddingRight: 10,
          justifyContent:'flex-end'
        }}
      >
        <Text
          style={{ margin: 10, padding: 0, fontSize: 20, fontWeight: "bold",color:'#430335' }}
        >
          {" "}
          مدونــات شــائعة
        </Text>
      </View>
      <View
        style={{
          width: Dimensions.get("screen").width * 0.2,
          backgroundColor: "#a072a1",
          height: 1,
          marginLeft: 330,
        }}
      ></View>

      <FlatList
        data={topProducts}
        renderItem={({ item }) => <HomeBlogsCard item={item} />}
        pagingEnabled
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
    // </Background>
  );
}

const styles = StyleSheet.create({
  con: {
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    position: 'absolute'
  },
  card_template: {
    width: 250,
    height: 250,
    boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)",
  },
  card_image: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  text_container: {
    position: "absolute",
    width: 250,
    height: 30,
    bottom: 0,
    padding: 5,
    backgroundColor: "rgba(0,0,0, 0.3)",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  card_title: {
    color: "white",
  },
});