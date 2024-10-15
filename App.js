import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Provider } from 'react-redux';
import Store from './src/store/Store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DrawerNavigator from './src/navigation/DrawerNavigation';



const App = () => {
  return (
    <Provider store={Store}>
      <GestureHandlerRootView>

        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
