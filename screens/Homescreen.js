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
import Paragraph from '../Components/Paragraph';
import Header from '../Components/Header';

import HomeSlider from "../Components/HomeSlider";
import card from "../card";
import HomeBlogsCard from "../Components/HomeBlogsCard";
import TopRatedProducts from "../Components/topRatedProducts";
import axios from "axios";
import ip from '../ipConfig'

export default function StartScreen({ navigation }) {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'عنوان المدونة 1',
      content: 'هذا هو محتوى المدونة 1.',
      image: require('../assets/images/babies.jpg'), // Replace with the actual path to the blog image
      owner: {
        photo: require('../assets/images/babies.jpg'),
        name: 'Ibrahim Hamed',
      },
      comments: [
        {
          id: 2,
          user: 'جين سميث',
          photo: require('../assets/images/babies.jpg'), // Replace with the actual path to the owner's photo
          comment: 'مدونة رائعة!',
        },
        {
          id: 3,
          user: 'مايكل جونسون',
          photo: require('../assets/images/babies.jpg'), // Replace with the actual path to the owner's photo
          comment: 'استمتعت بقراءة هذا.',
        },
      ],
    },
    {
      id: 4,
      title: 'عنوان المدونة 2',
      content: 'هذا هو محتوى المدونة 2.',
      image: require('../assets/images/babies.jpg'), // Replace with the actual path to the blog image
      owner: {
        name: 'جين سميث',
        photo: require('../assets/images/babies.jpg'), // Replace with the actual path to the owner's photo
      },
      comments: [
        {
          id: 1,
          user: 'جون دو',
          photo: require('../assets/images/babies.jpg'), // Replace with the actual path to the owner's photo
          comment: 'مكتوب بشكل جيد!',
        },
      ],
    },
    // Add more blog objects as needed
    {
      id: 5,
      title: 'عنوان المدونة 2',
      content: 'هذا هو محتوى المدونة 2.',
      image: require('../assets/images/babies.jpg'), // Replace with the actual path to the blog image
      owner: {
        name: 'جين سميث',
        photo: require('../assets/images/babies.jpg'), // Replace with the actual path to the owner's photo
      },
      comments: [
        {
          id: 1,
          user: 'جون دو',
          photo: require('../assets/images/babies.jpg'), // Replace with the actual path to the owner's photo
          comment: 'مكتوب بشكل جيد!',
        },
      ],
    },

    {
      id: 6,
      title: 'عنوان المدونة 2',
      content: 'هذا هو محتوى المدونة 2.',
      image: require('../assets/log.png'), // Replace with the actual path to the blog image
      owner: {
        name: 'جين سميث',
        photo: require('../assets/log.png'), // Replace with the actual path to the owner's photo
      },
      comments: [
        {
          id: 1,
          user: 'جون دو',
          photo: require('../assets/log.png'), // Replace with the actual path to the owner's photo
          comment: 'مكتوب بشكل جيد!',
        },
      ],
    },

  ]);
  const [products, setProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${ip}/products/getAll`) // Update the API endpoint
      .then((response) => {
        console.log(response.data)
        setProducts(response.data); // Update the response handling
        // const topProducts = products
        // // .filter((product) => {
        // //   if (product.rating >=4.5 && product.rating <=5){
        // //       return true;
        // // }})
        // setTopProducts(topProducts)
        console.log("start", products, "endddddddd");

      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const renderBlogCard = ({ item }) => {
    const { id, title, content, image, owner, comments, commentInput } = item;

    return (

        <ImageBackground source={image} style={styles.blogImage}>
        <View style={styles.ownerContainer}>
          <Paragraph style={styles.ownerName}>{owner.name}</Paragraph>
          <Image source={owner.photo} style={styles.ownerPhoto} />
        </View>
          <View style={styles.blog_title}><Text style={{ fontSize: 21,fontWeight: 'bold',color:'#76005ee5',
  }}>{title}</Text>

        <Paragraph>{content}</Paragraph>
        </View>
        </ImageBackground>

    );
  };

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
            justifyContent: 'flex-end'

          }}
        >
          <Text
            style={{ margin: 10, padding: 0, fontSize: 20, fontWeight: "bold", color: '#430335' }}
          >
            {" "}
            الاعلــى تقيـيـمـــاً
          </Text>
        </View>
        <View
          style={{
            width: Dimensions.get("screen").width * 0.2,
            backgroundColor: "#a072a1",
            height: 1,
            marginLeft: 320,
          }}
        >
        </View>

        <FlatList
          data={products}
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
          justifyContent: 'flex-end'
        }}
      >
        <Text
          style={{ margin: 10, padding: 0, fontSize: 20, fontWeight: "bold", color: '#430335' }}
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
      
        data={blogs}
        renderItem={renderBlogCard}
        pagingEnabled
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
    // </Background>
  );
}

const styles = StyleSheet.create({
  con: {
    marginBottom:50
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
  blogCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    // marginHorizontal: 8,
    width: '95%',

  },
  ownerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'flex-end',
    backgroundColor:'#ffffff82',
    paddingHorizontal:20,
    paddingVertical:5,
    borderBottomLeftRadius:20
  },
  ownerPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
    marginTop:10
  },
  blogImage: {
    width: Dimensions.get('screen').width*0.85,
    height: Dimensions.get('screen').height*0.4,
    marginBottom: 20,
    borderRadius: 20,
    marginHorizontal:40,
    alignItems: 'flex-end',
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    overflow: 'hidden',marginTop:10
  },
  ownerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    color:'#070707'
  },
  blog_title:{
    position:'absolute',
    bottom:0,

   
    width:'100%',
    padding:10,
  backgroundColor:'#ffffff69',
  
  }
  
});