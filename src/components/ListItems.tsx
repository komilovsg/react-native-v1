import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {windowWidth} from '../utils/Dimensions';

type ListItemProps = {
  item: {
    image: any;
    artist: string;
    song: string;
  };
};

const ListItems: React.FC<ListItemProps> = ({item}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
        <Image
          source={item.image}
          style={{
            width: 55,
            height: 55,
            borderRadius: 10,
            marginRight: 8,
            borderWidth: 0.5,
          }}
        />
        <View style={{width: windowWidth - 220}}>
          <Text style={{color: '#333', fontSize: 14}}>{item.artist}</Text>
          <Text
            numberOfLines={1}
            style={{color: '#333', fontSize: 13, textTransform: 'uppercase'}}>
            {item.song}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#0aada8',
          padding: 10,
          width: 100,
          borderRadius: 10,
        }}>
        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
            fontSize: 14,
          }}>
          Play
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default ListItems;
