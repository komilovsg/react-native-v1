import React, {useState, useContext} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import InputField from '../components/InputField';
import {AuthContext} from '../context/AuthContext';
import {Passkey} from 'react-native-passkey';

type RootStackParamList = {
  Home: undefined;
  Register: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home', 'Register'>;

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const {login} = useContext(AuthContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handlePasskeyRegister = async () => {
    try {
      const response = await fetch(
        'http://localhost:5005/webauthn/register/generate-options',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({username: email, displayName: email}),
        },
      );

      const options = await response.json();
      const registrationResponse = await Passkey.create(options);

      const verifyResponse = await fetch(
        'http://localhost:5005/webauthn/register/verify',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({...registrationResponse, username: email}),
        },
      );

      const verifyResult = await verifyResponse.json();

      if (verifyResult.verified) {
        Alert.alert('Success', 'Passkey registered successfully!');
      } else {
        Alert.alert('Error', 'Failed to register Passkey.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred during Passkey registration.');
    }
  };

  const handlePasskeyLogin = async () => {
    try {
      const response = await fetch(
        'http://localhost:5005/webauthn/authenticate/generate-options',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({username: email}),
        },
      );

      const options = await response.json();
      const authenticationResponse = await Passkey.get(options);

      const verifyResponse = await fetch(
        'http://localhost:5005/webauthn/register/verify',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({...authenticationResponse, username: email}),
        },
      );

      const verifyResult = await verifyResponse.json();

      if (verifyResult.verified) {
        Alert.alert('Success', 'Login successful!');
        login(email, verifyResult.token);
      } else {
        Alert.alert('Error', 'Failed to login with Passkey.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred during Passkey login.');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
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
          <Text style={{fontSize: 24, fontWeight: '600', marginVertical: 10}}>
            Login
          </Text>
          <InputField
            label={'Email'}
            inputType="email-address"
            value={email}
            onChangeText={(text: string) => setEmail(text)}
          />
          <InputField
            label={'Password'}
            inputType="password"
            value={password}
            onChangeText={(text: string) => setPassword(text)}
          />
          <TouchableOpacity
            onPress={handlePasskeyLogin}
            style={{
              backgroundColor: 'blue',
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
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlePasskeyRegister}
            style={{
              backgroundColor: 'green',
              padding: 5,
              width: '100%',
              borderRadius: 5,
              marginTop: 10,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                color: '#fff',
                textAlign: 'center',
              }}>
              Register
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={{
              marginTop: 10,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                color: '#20315f',
              }}>
              New here? Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
