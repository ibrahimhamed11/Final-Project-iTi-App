import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, I18nManager, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { DataTable, Button as PaperButton } from 'react-native-paper';

import Background from '../Components/Background';
import Logo from '../Components/Logo';
import Header from '../Components/Header';
import Paragraph from '../Components/Paragraph';
import Button from '../Components/Button';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

export default function Blogs({ navigation }) {
  I18nManager.allowRTL(true); // Enable Right-to-Left layout for Arabic content

  const [blogs, setBlogs] = useState([

    {
      id: 1,
      title: 'عنوان المدونة 1',
      content: 'هذا هو محتوى المدونة 1.',
      image: require('../assets/log.png'), // Replace with the actual path to the blog image
      owner: {
        photo: require('../assets/log.png'),
        name: 'Ibrahim Hamed',
      },
      comments: [
        {
          id: 2,
          user: 'جين سميث',
          photo: require('../assets/log.png'), // Replace with the actual path to the owner's photo
          comment: 'مدونة رائعة!',
        },
        {
          id: 3,
          user: 'مايكل جونسون',
          photo: require('../assets/log.png'), // Replace with the actual path to the owner's photo
          comment: 'استمتعت بقراءة هذا.',
        },
      ],
    },
    {
      id: 4,
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
    // Add more blog objects as needed
    {
      id: 5,
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
          <Image source={owner.photo} style={styles.ownerPhoto} />
          <Paragraph style={styles.ownerName}>{owner.name}</Paragraph>
        </View>
        <Image source={image} style={styles.blogImage} />
        <Header>{title}</Header>
        <Paragraph>{content}</Paragraph>


        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button
            mode="contained"
            onPress={() => console.log('Read More')}
            style={{
              width: 250,
              justifyContent: 'center',
              borderRadius: 7,
            }}
          >
            قراءة المزيد
          </Button>
        </View>
        <View style={styles.commentsContainer}>
          <Header>التعليقات</Header>
          <FlatList
            data={comments}
            renderItem={({ item }) => (
              <View style={styles.commentContainer} key={item.id}>
                <Image source={item.photo} style={styles.commentPhoto} />
                <View>
                  <Paragraph style={styles.commentUser}>{item.user}</Paragraph>
                  <Paragraph style={styles.commentText}>{item.comment}</Paragraph>
                </View>
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
                <FontAwesomeIcon name="comment" size={22} style={{ marginRight: 5 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleAddComment(id)} style={styles.deleteButton}>
                <FontAwesomeIcon name="recycle" size={22} style={{ marginRight: 5 }} />
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={blogs}
        renderItem={renderBlogCard}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    marginVertical: 0,
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
    borderRadius: 8,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentsContainer: {
    marginTop: 16,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  commentPhoto: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
  },
  commentUser: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  commentText: {
    flex: 1,
  },
  addCommentContainer: {
    marginTop: 16,


  },
  // commentInput: {
  //   height: 40,
  //   borderWidth: 1,
  //   borderColor: 'gray',
  //   marginBottom: 8,
  //   paddingHorizontal: 8,
  //   borderRadius: 12,
  // },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',



  },
  commentInput: {
    flex: 3,
    textAlign: 'right',
    borderWidth: 0.5, borderColor: 'gray',
    borderRadius: 10,
    height: 40,
    color: "red"
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 8,
    marginLeft: 8,
  },
  deleteButton: {
    backgroundColor: '#F00C0C',
    borderRadius: 10,
    padding: 8,
    marginLeft: 8,
  },
  // buttonText: {
  //   color: '#FFF',
  //   fontSize: 20,
  // },
});
