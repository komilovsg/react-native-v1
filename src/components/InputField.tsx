import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TextInputProps,
} from 'react-native';

type InputFieldProps = {
  label: string;
  icon?: React.ReactNode;
  inputType?: string;
  keyboardType?: TextInputProps['keyboardType'];
  fieldButtonLabel?: string;
  fieldButtonFunction?: () => void;
  value: any;
  onChangeText: any;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  icon,
  inputType,
  keyboardType = 'default',
  fieldButtonLabel,
  fieldButtonFunction,
  value,
  onChangeText,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}>
      {icon}
      {inputType == 'password' ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0}}
          secureTextEntry={true}
          value={value}
          onChangeText={onChangeText}
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0}}
          value={value}
          onChangeText={onChangeText}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{color: '#AD40AF', fontWeight: '700'}}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default InputField;
