import React from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import Tensfer from './Tensfer';

function Example() {
  const onClose = () => Alert.alert('Modal Closed');

  const onSuccess = (data: any) => {
    Alert.alert('Successful!!!');
    console.log('', data);
  };

  const onError = (error: any) => {
    Alert.alert('An Error occured');
    console.log(error);
  };

  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            Tensfer.linkWithOptions({
              onClose,
              onError,
              onSuccess,
              publicKey: 'test_pk_29ed7fc34563d819b91f',
            })
          }
        >
          <Text>Test with options</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return <Example />;
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    borderRadius: 16,
    marginVertical: 16,
    alignItems: 'center',
    backgroundColor: 'green',
    justifyContent: 'center',
  },
});
