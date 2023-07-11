import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, I18nManager, FlatList, TextInput, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { DataTable, Button as PaperButton, Modal } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import Header from '../Components/Header';
import Paragraph from '../Components/Paragraph';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import ip from '../ipConfig'


export default function Blogs({ navigation }) {
  I18nManager.allowRTL(true); // Enable Right-to-Left layout for Arabic content
  // get all blogs
  useEffect(() => {
    // setTimeout(() => {
    //   setIsLoading(false);
    //   }, 5000);
    showBlogs();
    // getAuthor();
  }, []);

  const [blogs, setBlogs] = useState([]);
  const [author, setAuthor] = useState('');
  // const [ID, setUserId] = useState('');
  const [authorimage, setAuthorImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  let Authorimage = ""
  let Author = ""

  const showBlogs = async () => {
    try {
      const response = await axios.get(`${ip}/blogs/get`);
      setBlogs(response.data);
      // blogs.map(async (blog) => {
      //   const authorId = blog.user;
      //   getAuthor(authorId)
        // const authorResponse = await axios.get(`${ip}/users/${authorId}`);
        // const authorData = authorResponse.data;
        // console.log(authorResponse.data)
        // console.log( blog.user, "dareee");
        // return authorData;
      // });

    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };


  // get author data
  // const getAuthor = async (ID) => {
  //   try {
  //     const response = await axios.get(`${ip}/user/${ID}`);
  //     console.log(ID, "didididiidididid");
  //     console.log(response.data, "llllllll");
  //     setAuthor(response.data.data.name);
  //     setAuthorImage(response.data.data.image);
  //     Authorimage = authorimage
  //     Author = author
  //   } catch (error) {
  //     console.error('Error fetching author data:', error, userId);
  //   }
  // };
  // add post modal
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleImageUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const imageResult = await ImagePicker.launchImageLibraryAsync();
    if (!imageResult.canceled) {
      setSelectedImage(imageResult.uri);
    }
  };
  // Function to retrieve the ID from AsyncStorage
  const getUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      return userId;
    } catch (error) {
      console.log('Error retrieving ID:', error);
      return null;
    }
  };

  const handleAddPost = async () => {
    try {
      const user = await getUserId();
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('author', user);
      formData.append('image', {
        uri: selectedImage,
        type: 'image/jpeg',
        name: 'product.jpg',
      });

      const response = await axios.post(`${ip}/blogs/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },


      });

      // console.log(' added:', response.data);

      // Reset form and state
      setTitle('');
      setContent('');
      setSelectedImage(null);
      // close modal and get all blogs 
      toggleModal();
      showBlogs();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentChange = (text, blogId) => {
    setBlogs((prevBlogs) => {
      return prevBlogs.map((blog) => {
        if (blog.id === blogId) {
          return { ...blog, commentInput: text };
        }
        return blog;
      });
    });
  };

  const handleAddComment = (blogId) => {
    setBlogs((prevBlogs) => {
      return prevBlogs.map((blog) => {
        if (blog.id === blogId && blog.commentInput.trim() !== '') {
          const newComment = {
            id: blog.comments.length + 1,
            user: 'مستخدم جديد',
            photo: require('../assets/log.png'),
            comment: blog.commentInput,
          };
          const updatedComments = [...blog.comments, newComment];
          return { ...blog, comments: updatedComments, commentInput: '' };
        }
        return blog;
      });
    });
  };

 // get author data
 const getAuthor = async (ID) => {
  try {
    const response = await axios.get(`${ip}/user/${ID}`);
    console.log(ID, "didididiidididid");
    console.log(response.data, "llllllll");
    console.log(response.data.data.name);
    // setAuthorImage(response.data.data.image);
     Authorimage = response.data.data.image

     Author = response.data.data.name
  } catch (error) {
    console.error('Error fetching author data:', error, userId);
  }
};

  const renderBlogCard = ({ item }) => {
    const { _id, user, title, content, image, comments, commentInput } = item;
  
    getAuthor(user)
    console.log(Author , "Authorrrrrrrrrrrrrrr/rr")
    console.log(Authorimage, "Authorrrrrrrrrrrrrrr/rr")
    return (

      <View style={styles.blogCard}>
        <View style={styles.ownerContainer}>
          <Paragraph style={styles.ownerName}>{Author}</Paragraph>
          <Image source={{ uri: `${ip}/${Authorimage}` }} style={styles.ownerPhoto} />
        </View>
        <ImageBackground source={{ uri: `${ip}/${image}` }} style={styles.blogImage}>
          <Header>{title}</Header>

        </ImageBackground>
        <Paragraph>{content}</Paragraph>
        <View style={styles.commentsContainer}>
          <Text style={{
            fontSize: 21,
            color: '#76005ee5',
            fontWeight: 'bold',
            width: '100%',
            paddingLeft: 160,
            backgroundColor: '#ffffff69',
            borderRadius: 10
          }}>التعليقات</Text>
          <FlatList
            data={comments}
            style={{
              alignItems: 'flex-end',
              justifyContent: 'space-between',
            }}
            renderItem={({ item }) => (
              <View style={styles.commentContainer} key={item._id}>
                {/* <TouchableOpacity onPress={() => handleAddComment(id)} style={styles.deleteButton}>
                <FontAwesomeIcon name="trash" size={12}  />
              </TouchableOpacity> */}
                <View >
                  <Paragraph style={styles.commentUser}>{item.user}</Paragraph>
                  <Paragraph style={styles.commentText}>{item.comment}</Paragraph>
                </View>
                <Image source={item.photo} style={styles.commentPhoto} />
              </View>
            )}
            keyExtractor={(item) => item._id}
          />

          <View style={styles.addCommentContainer}>
            <View style={styles.commentContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="أضف تعليقًا"
                value={commentInput}
                onChangeText={(text) => handleCommentChange(text, _id)}
              />
              <TouchableOpacity onPress={() => handleAddComment(id)} style={styles.addButton}>
                <FontAwesomeIcon name="comment" size={20} color={'#ffffffb8'} />
              </TouchableOpacity>

            </View>
          </View>

        </View>
      </View>
    );
  };
  // // Render a loading state while waiting for the data
  // if (isLoading) {
  //   return (
  //     <View style={styles.con}>
  //       <Image style={{ width: 400, height: 400 }} source={require('../assets/loader.gif')} />
  //     </View>
  //   );
  // }
  return (
    <>
      <ScrollView>
        <View style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          backgroundColor: '#76005e1b',
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height * 0.3,
          zIndex: 9999,
          borderBottomLeftRadius: 90,
          borderBottomRightRadius: 0,
        }} ></View>
        <Image source={require('../assets/images/Blogs.png')} style={styles.header_Image}></Image>
        <View
          style={styles.header_text}><Text style={{ fontSize: 25, color: '#76005f' }}>اهلا بكِ في المدونة</Text>
        </View>
        <TouchableOpacity style={styles.header_button} onPress={toggleModal} >
          <Text style={{ fontSize: 18, color: '#fff' }}>اضيفي منشوراً</Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <FlatList
            data={blogs}
            renderItem={renderBlogCard}
            keyExtractor={(item) => item._id}
          />
        </View>
      </ScrollView>
      <Modal visible={isModalVisible} onDismiss={toggleModal} contentContainerStyle={styles.modalContainer}>

        <View style={styles.modalContent}>
          <TextInput
            mode="outlined"
            label="Outlined input"
            placeholder="Type something"
            selectionColor='#76005e51'
            multiline={true}
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            mode="outlined"
            label="Outlined input"
            placeholder="Type something"
            selectionColor='#76005e51'
            multiline={true}
            value={content}
            onChangeText={setContent}
            style={styles.input}
          />

          <View style={{ flexDirection: 'row', }}>
            <TouchableOpacity onPress={handleImageUpload} >
              <View style={styles.postButton}>
                <Text style={{ color: '#ffffff', marginRight: 5 }}>ارفق صورة</Text>
                <FontAwesomeIcon name="image" size={20} color={'#fff'} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAddPost} >
              <View style={styles.postButton}>
                <Text style={{ color: '#ffffff', marginRight: 5 }}>نشر</Text>
                <FontAwesomeIcon name="file" size={20} color={'#fff'} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.floating_Button} onPress={toggleModal} >
        <View >
          <FontAwesomeIcon name="plus" size={26} color={'#fff'} />
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    marginVertical: 0,
    marginTop: 20,
    marginBottom: 30,

  },
  header_Image: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height * 0.3,
    borderBottomLeftRadius: 90,
    borderBottomRightRadius: 0,
    borderBottomColor: '#76005f',
    borderWidth: 1
  },
  header_text: {
    position: 'absolute',
    top: 8,
    right: 10,
  },
  header_button: {
    position: 'absolute',
    top: 180,
    left: 30,
    backgroundColor: '#76005eff',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10
  },
  blogCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    marginHorizontal: 8,
    width: '95%',

  },
  ownerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'flex-end',
  },
  ownerPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  blogImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    // borderRadius: 8,
    alignItems: 'flex-end',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden'
  },
  ownerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10
  },
  commentsContainer: {
    marginTop: 16,
    alignItems: 'flex-end',
  },
  commentContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 8,
  },
  commentPhoto: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
    alignItems: 'center',

  },
  commentUser: {
    fontWeight: 'bold',
    marginRight: 8,
    textAlign: 'right'

  },
  commentText: {
    flex: 1,

  },
  addCommentContainer: {
    marginTop: 16,


  },

  commentContainer: {
    flexDirection: 'row',
    width: '100%'



  },
  commentInput: {
    flex: 3,
    textAlign: 'right',
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 10,
    height: 40,
    color: '#000000',
    paddingRight: 10

  },
  addButton: {
    backgroundColor: '#76005e98',
    borderRadius: 50,
    padding: 10,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteButton: {
    backgroundColor: '#F00C0C',
    borderRadius: 10,
    padding: 8,
    position: 'absolute',
    marginRight: 100

  },

  floating_Button: {
    position: 'absolute',
    bottom: 80,
    right: 10,
    borderRadius: 100,
    backgroundColor: '#76005ee5',
    width: Dimensions.get('screen').width * 0.17,
    height: Dimensions.get('screen').height * 0.09,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: Dimensions.get('screen').width * 0.9,
    height: Dimensions.get('screen').height * 0.5,
    alignSelf: 'center',
    borderColor: '#d862c1e5',
    borderStyle: 'solid',
    borderWidth: 1,
    marginBottom: 100
  },
  modalContent: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between'
  },
  postButton: {
    borderRadius: 10,
    backgroundColor: '#76005ee5',
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 10
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    width: "80%",
    marginTop: 15,
    borderColor: '#76005e51',
    borderBottom: 20,
    borderBottomWidth: 2

  },


});
