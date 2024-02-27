import {Spinner, View} from 'native-base';
import * as React from 'react';

const Splash = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Spinner />
    </View>
  );
};

export default Splash;
