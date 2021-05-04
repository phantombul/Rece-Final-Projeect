import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Headline, TextInput } from 'react-native-paper';
import { useUser } from '../hooks/useUser';
import { AuthStackProps } from '../navigation/types';
import { AuthCredentials } from '../types';

export const SignIn: React.FC<AuthStackProps<'SignIn'>> = ({ navigation }) => {
  const { signIn } = useUser();

  const [credentials, setCredentials] = useState<AuthCredentials>({
    email: '',
    password: '',
  });

  const onChangeText = (field: keyof AuthCredentials) => (value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled">
      <View>
        <View style={styles.headlineWrapper}>
          <Headline>Sign in</Headline>
        </View>
        <TextInput
          mode="outlined"
          placeholder="Email"
          style={styles.input}
          value={credentials.email}
          onChangeText={onChangeText('email')}
          autoCapitalize="none"
          textContentType="emailAddress"
          autoCompleteType="email"
          keyboardType="email-address"
        />
        <TextInput
          mode="outlined"
          placeholder="Password"
          value={credentials.password}
          onChangeText={onChangeText('password')}
          style={styles.input}
          secureTextEntry
        />
        <Button
          mode="contained"
          onPress={() => signIn(credentials)}
          style={styles.button}>
          Submit
        </Button>
      </View>
      <Button onPress={() => navigation.navigate('SignUp')}>Sign Up</Button>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  headlineWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 32,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 24,
  },
});
