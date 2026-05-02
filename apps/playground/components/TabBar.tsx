import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type TabId = 'components' | 'signup' | 'profile' | 'booking' | 'rhf';

interface Tab {
  id: TabId;
  label: string;
  icon: string;
}

const TABS: Tab[] = [
  { id: 'components', label: 'Components', icon: '🧩' },
  { id: 'signup', label: 'Sign up', icon: '✨' },
  { id: 'profile', label: 'Profile', icon: '👤' },
  { id: 'booking', label: 'Booking', icon: '📅' },
  { id: 'rhf', label: 'RHF', icon: '📝' },
];

interface TabBarProps {
  active: TabId;
  onChange: (id: TabId) => void;
}

export const TabBar = ({ active, onChange }: TabBarProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 6) }]}>
      {TABS.map((tab) => {
        const isActive = tab.id === active;
        return (
          <Pressable
            key={tab.id}
            style={styles.tab}
            onPress={() => onChange(tab.id)}
          >
            <Text style={[styles.icon, isActive && styles.iconActive]}>
              {tab.icon}
            </Text>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e0e0e0',
    paddingTop: 6,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingVertical: 4,
  },
  icon: {
    fontSize: 20,
    opacity: 0.55,
  },
  iconActive: {
    opacity: 1,
  },
  label: {
    fontSize: 10,
    color: '#737373',
    fontWeight: '500',
  },
  labelActive: {
    color: '#5b5bd6',
    fontWeight: '600',
  },
});
