import * as React from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
  KeyboardAvoidingView,
} from 'native-base';
import {Platform} from 'react-native';

const LoginForm = () => {
  return (
    <Center>
      <VStack flex="1" justifyContent="flex-end" w="100%">
        <Button mb="10" width={300}>
          Proceed
        </Button>
      </VStack>
    </Center>
  );
};

export default LoginForm;
