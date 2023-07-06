import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, I18nManager, FlatList, TextInput, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { DataTable, Button as PaperButton, Modal } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import Header from '../Components/Header';
import Paragraph from '../Components/Paragraph';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import ip from '../ipConfig'

export default function Blogs({ navigation }) {
  I18nManager.allowRTL(true); // Enable Right-to-Left layout for Arabic content
  // get all blogs
  // useEffect(() => {
  //   showBlogs();
  // }, []);

  const [blogs, setBlogs] = useState([

    {
      id: 1,
      title: 'طعام صحي لطفلك',
      content: " مع نمو طفلك إلى طفل صغير ، ينتقل إلى مرحلة من النمو البدني والعقلي السريع ويحتاج إلى نظام غذائي متوازن لضمان نمو وتطور صحي. تعرّفي أكثر على الغذاء الصحي للاطفال والأطعمة التي يجب تجنبها.  ",
      image: require('../assets/images/feeding_baby.jpg'), // Replace with the actual path to the blog image
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
      title: 'الالعاب المناسبة لطفلك',
      content: " الألعاب من أهم الوسائل التربوية للمربي وهي في الوقت نفسه من أهم الأولويات عند الطفل وتُعد من وسائل النمو" ,
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
  // const showBlogs = async () => {
  //   try {
  //     const response = await axios.get(`${ip}/blogs/get`);
  //     setBlogs(response.data);
  //     // console.log(response.data);
  //   } catch (error) {
  //     console.error('Error fetching blogs:', error);
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

  const handleAddPost = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
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

  const renderBlogCard = ({ item }) => {
    const { id, title, content, image, owner, comments, commentInput } = item;

    return (

      <View style={styles.blogCard}>
        <View style={styles.ownerContainer}>
          <Paragraph style={styles.ownerName}>{owner.name}</Paragraph>
          <Image source={owner.photo} style={styles.ownerPhoto} />
        </View>
        <ImageBackground source={image} style={styles.blogImage}>
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
              <View style={styles.commentContainer} key={item.id}>
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
            keyExtractor={(item) => item.id.toString()}
          />

          <View style={styles.addCommentContainer}>
            <View style={styles.commentContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="أضف تعليقًا"
                value={commentInput}
                onChangeText={(text) => handleCommentChange(text, id)}
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
        <TouchableOpacity style={styles.header_button} onPress={toggleModal}>
          <Text style={{ fontSize: 18, color: '#fff' }}>اضيفي منشوراً</Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <FlatList
            data={blogs}
            renderItem={renderBlogCard}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </ScrollView>
      <TouchableOpacity onPress={toggleModal} >
        <View style={styles.floating_Button}>
          <FontAwesomeIcon name="plus" size={26} color={'#fff'} />
        </View>
      </TouchableOpacity>
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
    borderBottomColor:'#76005f',
    borderWidth:1
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
    borderWidth: 1
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
