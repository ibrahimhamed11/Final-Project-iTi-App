import React from "react";
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
// import Background from "../Components/Background";

export default function StartScreen({ navigation }) {
  return (
    // <Background>
    <ScrollView style={styles.con}>
      {/* <View>
        <View
          style={{
            flexDirection: "row",
            width: Dimensions.get("screen").width,
            paddingRight: 10,
          }}
        >
          <Text
            style={{ margin: 10, padding: 0, fontSize: 20, fontWeight: "bold" }}
          >
            {" "}
            خدماتنا
          </Text>
        </View>
        <View
          style={{
            width: Dimensions.get("screen").width * 0.2,
            backgroundColor: "#a072a1",
            height: 1,
            marginLeft: 260,
          }}
        >
        </View>
      </View> */}
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
            style={{ margin: 10, padding: 0, fontSize: 20, fontWeight: "bold" }}
          >
            {" "}
            الاعلى تقييماً
          </Text>
        </View>
        <View
          style={{
            width: Dimensions.get("screen").width * 0.2,
            backgroundColor: "#a072a1",
            height: 1,
            marginLeft: 260,
          }}
        >
        </View>

        <FlatList
          data={topproducts}
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
          style={{ margin: 10, padding: 0, fontSize: 20, fontWeight: "bold" }}
        >
          {" "}
          مدونات شائعة
        </Text>
      </View>
      <View
        style={{
          width: Dimensions.get("screen").width * 0.2,
          backgroundColor: "#a072a1",
          height: 1,
          marginLeft: 260,
        }}
      ></View>

      <FlatList
        data={topproducts}
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