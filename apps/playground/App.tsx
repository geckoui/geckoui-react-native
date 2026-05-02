import './global.css';

import { GeckoUIPortal } from '@geckoui/nativewind';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import type { TabId } from './components/TabBar';
import { TabBar } from './components/TabBar';
import BookingScreen from './screens/BookingScreen';
import ComponentsScreen from './screens/ComponentsScreen';
import ProfileScreen from './screens/ProfileScreen';
import RHFFormScreen from './screens/RHFFormScreen';
import SignUpScreen from './screens/SignUpScreen';

export default function App() {
  const [tab, setTab] = useState<TabId>('components');

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']} className="darkx" style={styles.root}>
        <StatusBar style="auto" />
        <View style={styles.content}>
          {tab === 'components' && <ComponentsScreen />}
          {tab === 'signup' && <SignUpScreen />}
          {tab === 'profile' && <ProfileScreen />}
          {tab === 'booking' && <BookingScreen />}
          {tab === 'rhf' && <RHFFormScreen />}
        </View>
        <TabBar active={tab} onChange={setTab} />
        <GeckoUIPortal />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
  },
});
