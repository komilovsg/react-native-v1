import React, {useContext} from 'react';
import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {windowWidth} from '../utils/Dimensions';
import CustomSwitch from '../components/CustomSwitch';
import {useState} from 'react';
import ListItems from '../components/ListItems';
import {freeSongs, premiumSongs} from '../model/data';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthContext} from '../context/AuthContext';

type RootStackParamList = {
  Home: undefined;
  Onboarding: undefined;
};

type CardItem = {
  id: string;
  name: string;
  quote: string;
};

const dataOfSingers = [
  {
    id: '1',
    name: 'Freddie Mercury',
    quote: 'I won’t be a rock star. I will be a legend.',
  },
  {
    id: '2',
    name: 'Adele',
    quote:
      'I’d like people to think of me as a passionate, emotional, honest singer and songwriter.',
  },
  {
    id: '3',
    name: 'Bob Marley',
    quote: 'One good thing about music, when it hits you, you feel no pain.',
  },
  {
    id: '4',
    name: 'John Lennon',
    quote: 'Life is what happens when you’re busy making other plans.',
  },
  {
    id: '5',
    name: 'Beyoncé',
    quote: 'Power is not given to you. You have to take it.',
  },
  {
    id: '6',
    name: 'Elvis Presley',
    quote:
      'The image is one thing and the human being is another. It’s very hard to live up to an image.',
  },
  {
    id: '7',
    name: 'Lady Gaga',
    quote:
      'I believe in the spirit of the music and the art of self-expression.',
  },
  {
    id: '8',
    name: 'Whitney Houston',
    quote:
      'I decided long ago never to walk in anyone’s shadow, if I fail, if I succeed, at least I lived as I believed.',
  },
];

export default function HomeScreen() {
  const [posts, setPosts] = useState(1);
  const {logout} = useContext(AuthContext);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderItem = ({item}: {item: CardItem}) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.quote}>{item.quote}</Text>
    </View>
  );

  const onSelectSwitch = (value: number) => {
    setPosts(value);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{padding: 20}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <Text>Hello KSG</Text>
          <TouchableOpacity
            onPress={() => {
              logout();
            }}>
            <ImageBackground
              source={require('../assets/images/logout.png')}
              style={{width: 25, height: 25}}
              imageStyle={{borderRadius: 5}}
            />
            {/* <Text>Exit</Text> */}
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderWidth: 1,
            padding: 8,
            borderRadius: 7,
            borderColor: '#C6C6C6',
            flexDirection: 'row',
          }}>
          <ImageBackground
            source={require('../assets/images/serach-icon.png')}
            style={{width: 22, height: 22}}
            imageStyle={{borderRadius: 25}}
          />
          <TextInput placeholder="Search" />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 15,
          }}>
          <Text style={{fontSize: 16, fontWeight: '600'}}>
            Upcoming Content
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={{color: '#0aada8'}}>See all</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={dataOfSingers}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          contentContainerStyle={{paddingVertical: 20}}
        />
        <View style={{marginVertical: 20}}>
          <CustomSwitch
            selectionMode={1}
            option1="Free"
            option2="Paid"
            onSelectSwitch={onSelectSwitch}
          />
        </View>
        {posts === 1 &&
          freeSongs.map(item => <ListItems key={item.id} item={item} />)}
        {posts == 2 &&
          premiumSongs.map(item => <ListItems key={item.id} item={item} />)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: windowWidth * 0.8,
    marginHorizontal: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  quote: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#555',
  },
});
