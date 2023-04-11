import React, {FC} from 'react';
import {SafeAreaView} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

interface ProvidersProps {
  children: React.ReactNode;
}
export const Providers: FC<ProvidersProps> = ({children}) => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, position: 'relative'}}>
        {children}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
