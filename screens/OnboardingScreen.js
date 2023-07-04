import React from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get('window');

const COLORS = { primary: '#282534', white: '#fff' };

const slides = [
  {
    id: '1',
    image: require('../assets/onboarding/Motherhood.gif'),
    title:'أهلاً بك في عالم الامومة',
    subtitle: ' هذا الموقع خصيصا لك حتى يسهل عليكي عالم الامومة و تنظيم حياتك اليومية لكي و لطفلك',
  },
  {
    id: '2',
    image: require('../assets/onboarding/online.gif'),
    title: 'متجرك الالكترونى',
    subtitle: 'يتوفر لدينا متجر متكامل لاحتياجاتك واحتياجات طفلك ',
  },
  {
    id: '3',
    image: require('../assets/onboarding/Midwives.gif'),
    title: 'متابعة بانتظام',
    subtitle: 'خصصنا لكى نظام كامل لمتابعه تطعيمات مولودك منذ الولادة بالاضافة الى توفر سجل صحى متكامل',
  },
];

const Slide = ({ item }) => {
  return (
    <View style={{ width, justifyContent: 'center' }}>
      <Image
        source={item?.image}
        style={{
          height: '70%',
          width: Dimensions.get('window').width * 0.75,
          resizeMode: 'contain',
          marginTop: 50,
          justifyContent: 'flex-end',
          marginLeft: '15%'
        }}
      />
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const OnboardingScreen = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();

  const goToLogin = () => {
    navigation.navigate('joinus');
  };

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.2,
          justifyContent: 'space-between',
          paddingVertical: 10,
        }}
      >
        {/* Indicator container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex === index && {
                  backgroundColor: '#76005f',
                  width: 20,
                  height: 6,
                  borderRadius: 4
                },
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={{marginBottom: 20 }}>
          {currentSlideIndex === slides.length - 1 ? (
            <View style={{justifyContent:'center', alignItems:'center'}}>
              <TouchableOpacity  onPress={goToLogin}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    fontFamily: 'Droid', // Add fontFamily property
                    color: 'white',
                    paddingHorizontal: 60,
                    paddingVertical: 15,
                    backgroundColor: '#76005f',
                    borderRadius:20,
                    textAlign:'center',
                    width:Dimensions.get('screen').width*0.75
                }}>
                  البدء
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: 'row', alignItems:'center' , justifyContent:'space-between', marginHorizontal:30}}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={skip}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: '#A9A9A9',
                    fontFamily: 'Droid',
                    paddingHorizontal: Dimensions.get('screen').width*0.14,
                    paddingVertical: Dimensions.get('screen').width*0.04,
                    // backgroundColor:'#A9A9A9',
                    // borderRadius:20,
                    // borderColor:'#76005f',
                    // borderWidth:1.5
                  }}
                >
                  تخطي
                </Text>
              </TouchableOpacity>
              <View style={{ width: 15 }} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    fontFamily: 'Droid', // Add fontFamily property
                    color: 'white',
                    paddingHorizontal: Dimensions.get('screen').width*0.14,
                    paddingVertical: Dimensions.get('screen').width*0.04,
                    backgroundColor: '#76005f',
                    borderRadius:20,
                  }}
                >
                  التالي
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  const [fontsLoaded] = useFonts({
    'Droid': require('../assets/fonts/Droid.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Render a loading state or fallback UI here
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar backgroundColor={COLORS.white} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: height * 0.7 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
      />
      <View>
        <Footer />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: '#A9A9A9',
    fontSize: 14,
    marginTop: 8,
    maxWidth: '81%',
    textAlign: 'center',
    lineHeight: 23,
    fontFamily: 'Droid',
  },
  title: {
    color: '#3A3A3A',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Droid',
  },
  indicator: {
    height: 6,
    width: 8,
    backgroundColor: '#cf96c4',
    marginHorizontal: 3,
    borderRadius: 20,
  },
});

export default OnboardingScreen;