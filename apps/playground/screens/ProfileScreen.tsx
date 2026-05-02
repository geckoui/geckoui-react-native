import {
  Button,
  ConfirmDialog,
  Input,
  Label,
  Select,
  SelectOption,
  Switch,
  Toast,
} from '@geckoui/nativewind';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  const [name, setName] = useState('Jane Doe');
  const [email] = useState('jane@example.com');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [language, setLanguage] = useState('en');
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [biometric, setBiometric] = useState(true);

  const handleSave = () => {
    Toast.success('Settings saved');
  };

  const handleLogout = () => {
    ConfirmDialog.show({
      title: 'Log out',
      content: 'You will need to sign in again to access your account.',
      confirmButtonLabel: 'Log out',
      cancelButtonLabel: 'Cancel',
      onConfirm: ({ dismiss }) => {
        dismiss();
        Toast.info('Logged out');
      },
    });
  };

  const handleDelete = () => {
    ConfirmDialog.show({
      title: 'Delete account',
      content:
        'This will permanently delete your account and all associated data. This action cannot be undone.',
      confirmButtonLabel: 'Delete account',
      cancelButtonLabel: 'Keep account',
      onConfirm: ({ dismiss }) => {
        dismiss();
        Toast.error('Account deletion is disabled in demo');
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>

      <Section title="Account">
        <Row label="Name">
          <Input value={name} onChangeText={setName} />
        </Row>
        <Row label="Email">
          <Input value={email} editable={false} />
        </Row>
        <Row label="Language">
          <Select
            value={language}
            onChange={setLanguage}
            placeholder="Choose a language"
          >
            <SelectOption value="en" label="English" />
            <SelectOption value="es" label="Español" />
            <SelectOption value="fr" label="Français" />
            <SelectOption value="de" label="Deutsch" />
            <SelectOption value="ja" label="日本語" />
            <SelectOption value="zh" label="中文" />
          </Select>
        </Row>
      </Section>

      <Section title="Appearance">
        <Row label="Theme">
          <Select value={theme} onChange={(v) => setTheme(v as typeof theme)}>
            <SelectOption value="light" label="Light" />
            <SelectOption value="dark" label="Dark" />
            <SelectOption value="system" label="Match system" />
          </Select>
        </Row>
      </Section>

      <Section title="Notifications">
        <ToggleRow
          label="Push notifications"
          description="Get notified about activity on your account"
          value={pushNotifications}
          onChange={setPushNotifications}
        />
        <ToggleRow
          label="Email notifications"
          description="Weekly summary of your activity"
          value={emailNotifications}
          onChange={setEmailNotifications}
        />
        <ToggleRow
          label="Marketing emails"
          description="Tips, product updates and offers"
          value={marketing}
          onChange={setMarketing}
        />
      </Section>

      <Section title="Security">
        <ToggleRow
          label="Face ID / Touch ID"
          description="Unlock the app with biometrics"
          value={biometric}
          onChange={setBiometric}
        />
      </Section>

      <View style={styles.footer}>
        <Button onPress={handleSave}>Save changes</Button>
        <Button variant="outlined" onPress={handleLogout}>
          Log out
        </Button>
        <Pressable onPress={handleDelete} style={styles.dangerLink}>
          <Text style={styles.dangerText}>Delete account</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionBody}>{children}</View>
  </View>
);

const Row = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <View style={styles.row}>
    <Label>{label}</Label>
    {children}
  </View>
);

const ToggleRow = ({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description?: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) => (
  <View style={styles.toggleRow}>
    <View style={{ flex: 1 }}>
      <Text style={styles.toggleLabel}>{label}</Text>
      {description ? (
        <Text style={styles.toggleDesc}>{description}</Text>
      ) : null}
    </View>
    <Switch checked={value} onChange={onChange} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 24,
    paddingBottom: 64,
    gap: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 8,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#5b5bd6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  email: {
    fontSize: 13,
    color: '#737373',
    marginTop: 2,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#737373',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionBody: {
    gap: 12,
  },
  row: {
    gap: 6,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  toggleDesc: {
    fontSize: 12,
    color: '#737373',
    marginTop: 2,
  },
  footer: {
    gap: 12,
    marginTop: 8,
  },
  dangerLink: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  dangerText: {
    color: '#ef4444',
    fontSize: 14,
    fontWeight: '500',
  },
});
