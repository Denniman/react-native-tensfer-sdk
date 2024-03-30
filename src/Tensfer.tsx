import * as React from 'react';
import RootSiblings from 'react-native-root-siblings';

import { TensferContainer } from './TensferContainer';

type TensferOptions = {
  publicKey: string; //Your public key from the Tensfer dashboard,
  onClose: () => void;
  activityIndicatorColor?: string;
  onSuccess: (data: any) => void;
  onError: (error: Error) => void;
};

type TensferWithShortURLOptions = Omit<TensferOptions, 'publicKey'> & {
  shortUrl: string;
};

export default class Tensfer extends React.Component {
  static displayName = 'Tensfer';

  static linkWithOptions = (options: TensferOptions) =>
    new RootSiblings(<TensferContainer {...options} />);

  static linkWithShortURL = (options: TensferWithShortURLOptions) => {
    // do your logic to show shortUrl here
    // also consider your HTML FILE [TensferContent] to change
    console.log(options);
  };

  render() {
    return null;
  }
}
