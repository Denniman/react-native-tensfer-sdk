# react-native-tensfer-sdk

react native Tensfer sdk

## Installation

```sh
npm install react-native-tensfer-sdk
```

## Usage

```js
import Tensfer from 'Tensfer';

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

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'red' }]}
          onPress={() =>
            Tensfer.linkWithShortURL({
              onClose,
              onError,
              onSuccess,
              shortUrl: '9e007f6b0a297c71a547270ee9e9bd08',
            })
          }
        >
          <Text>Test with shortURL</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ...
export default function App() {
  return (
    <RootSiblingParent>
      <Example />
    </RootSiblingParent>
  );
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
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
