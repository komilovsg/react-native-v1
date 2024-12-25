import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DatePicker from 'react-native-date-picker';

type RootStackParamList = {
  Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const RegisterScreen: React.FC<Props> = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dobLabel, setDobLabel] = useState('Date of Birth');

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: '#20315f',
            textAlign: 'center',
          }}>
          TEST PASSKEY
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{gap: 5, width: '90%'}}>
          <TextInput
            placeholder="Full Name"
            style={{borderWidth: 1, width: '100%', padding: 5, borderRadius: 7}}
          />
          <TextInput
            placeholder="Email"
            style={{borderWidth: 1, width: '100%', padding: 5, borderRadius: 7}}
          />
          <TextInput
            placeholder="Password"
            style={{borderWidth: 1, width: '100%', padding: 5, borderRadius: 7}}
          />
          <TextInput
            placeholder="Confirm Password"
            style={{borderWidth: 1, width: '100%', padding: 5, borderRadius: 7}}
          />
          <TouchableOpacity
            style={{borderWidth: 1, width: '100%', padding: 5, borderRadius: 7}}
            onPress={() => setOpen(true)}>
            <Text style={{color: 'gray'}}>{dobLabel}</Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={open}
            date={date}
            mode={'date'}
            maximumDate={new Date('2005-01-01')}
            minimumDate={new Date('1970-01-01')}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
              setDobLabel(date.toDateString());
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={{
              backgroundColor: '#AD40AF',
              padding: 5,
              width: '100%',
              borderRadius: 5,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                color: '#fff',
                textAlign: 'center',
              }}>
              Registration
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
