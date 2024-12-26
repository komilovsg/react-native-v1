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

  const [username, setUsername] = useState('admin');

  const handleLogin = async () => {
    try {
      //получаем challeng с сервера
      const response = await fetch('http://localhost:5005/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username}),
      });

      const authenticationOptions = await response.json();

      //выполняем аутентификацию с помощью passkey
      const result = await Passkey.get(authenticationOptions);

      //оправляем реузльтут на сервер для проверки
      const verifyResponse = await fetch('http://localhost:5005/login/verify', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, response: result}),
      });

      const verifyResult = await verifyResponse.json();

      if (verifyResult.success) {
        Alert.alert('Success', 'Login is done!');
      } else {
        Alert.alert('Error', 'Not Logined');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Something was wrong');
    }
  };

  const handleRegister = async () => {
    try {
      //шаг первый получаем challenge с сервера
      const response = await fetch('http://localhost:5005/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username}),
      });

      const registrationOptions = await response.json();

      //выполняем регистрацию с помощью passkey
      const result = await Passkey.create(registrationOptions);

      //отправляем результат на сервер для проверки
      const verifyResponse = await fetch(
        'http://localhost:5005/register/verify',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({username, response: result}),
        },
      );
      const verifyResult = await verifyResponse.json();

      if (verifyResult.success) {
        Alert.alert('Success', 'Registarion is done!');
      } else {
        Alert.alert('Error', 'Registration error');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Somthing going wrong');
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
            onPress={handleLogin}
            // onPress={handlePasskeyLogin}
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
            onPress={handleRegister}
            // onPress={handlePasskeyRegister}
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
