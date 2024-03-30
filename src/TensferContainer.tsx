import * as React from 'react';
import { WebView } from 'react-native-webview';
import {
  Modal,
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

type TensferOptionProps = {
  publicKey: string;
  onClose: () => void;
  activityIndicatorColor?: string;
  onSuccess: (data: any) => void;
  onError: (error: Error) => void;
};

type TensferProps = TensferOptionProps;

type TensferState = {
  visible: boolean;
  isLoading: boolean;
};

const { width, height } = Dimensions.get('screen');

export class TensferContainer extends React.Component<
  TensferProps,
  TensferState
> {
  static displayName = 'TensferContainer';
  state: TensferState = { visible: true, isLoading: true };

  render() {
    const { isLoading, visible } = this.state;
    const {
      onClose,
      onError,
      onSuccess,
      publicKey,
      activityIndicatorColor = 'white',
    } = this.props;

    const TensferContent = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tensfer</title>
      </head>
      <body style="background-color:#fff;height:100vh">
        <script type="module" src="https://unpkg.com/@tensferhq/tensfer-js"></script>

        <script type="text/javascript">
          function openTensferWidget() {
            Tensfer.linkWithOptions({
              publicKey: '${publicKey}',
              onSuccess: function(data) {
                const response = { event: 'successful', data };
                window.ReactNativeWebView.postMessage(JSON.stringify(response));
              },
              onError: function(error) {
                const response = { event: 'error', error };
                window.ReactNativeWebView.postMessage(JSON.stringify(response));
              },
              onClose: function() {
                const response = { event: 'cancelled' };
                window.ReactNativeWebView.postMessage(JSON.stringify(response));
              },
            });
          };

          document.addEventListener("DOMContentLoaded", openTensferWidget);
        </script>
      </body>
    </html>`;

    const messageReceived = (data: string) => {
      const response = JSON.parse(data);
      this.setState({ ...this.state, visible: false });

      switch (response.event) {
        case 'cancelled':
          onClose?.();
          break;

        case 'successful':
          onSuccess?.(response.data);
          break;

        case 'error':
          onError?.(response.data);
          break;
      }
    };

    return (
      <Modal visible={visible} transparent={false} animationType="slide">
        <SafeAreaView style={{ width, height }}>
          <WebView
            cacheEnabled={false}
            cacheMode="LOAD_NO_CACHE"
            style={{ width, height }}
            source={{ html: TensferContent }}
            onMessage={(e: any) => messageReceived(e.nativeEvent?.data)}
            onLoadEnd={() => this.setState({ ...this.state, isLoading: false })}
          />

          {isLoading && (
            <View style={styles.loader}>
              <ActivityIndicator size="small" color={activityIndicatorColor} />
            </View>
          )}
        </SafeAreaView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  loader: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});
