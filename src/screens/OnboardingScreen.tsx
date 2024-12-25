import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const OnboardingScreen: React.FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 20,
      }}>
      <View>
        <Text style={{fontSize: 30, fontWeight: 'bold', color: '#20315f'}}>
          TEST PASSKEY
        </Text>
      </View>
      <View>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#20315f'}}>
          TEST IT BY YOURSELF
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{
          backgroundColor: '#AD40AF',
          padding: 20,
          width: '90%',
          borderRadius: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 20,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            color: '#fff',
          }}>
          Let`s Begin
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 21,
            color: '#fff',
          }}>
          &#62;
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
