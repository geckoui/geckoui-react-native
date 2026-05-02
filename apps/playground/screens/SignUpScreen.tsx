import {
  Checkbox,
  DateInput,
  Input,
  InputError,
  Label,
  LoadingButton,
  Toast,
} from '@geckoui/nativewind';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  birthDate?: string;
  agree?: string;
}

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState<string | null>(null);
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!email.includes('@')) e.email = 'Enter a valid email';
    if (password.length < 6) e.password = 'At least 6 characters';
    if (!birthDate) e.birthDate = 'Pick your date of birth';
    if (!agree) e.agree = 'You must accept the terms';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      Toast.error('Please fix the errors below');
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    Toast.success('Account created', {
      description: `Welcome, ${name}!`,
    });
    // reset
    setName('');
    setEmail('');
    setPassword('');
    setBirthDate(null);
    setAgree(false);
    setErrors({});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create your account</Text>
      <Text style={styles.subtitle}>
        Sign up in seconds. We'll send you a confirmation email.
      </Text>

      <View style={styles.field}>
        <Label required>Full name</Label>
        <Input
          value={name}
          onChangeText={setName}
          placeholder="Jane Doe"
          autoCapitalize="words"
        />
        {errors.name && <InputError>{errors.name}</InputError>}
      </View>

      <View style={styles.field}>
        <Label required>Email</Label>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <InputError>{errors.email}</InputError>}
      </View>

      <View style={styles.field}>
        <Label required>Password</Label>
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="Min. 6 characters"
          secureTextEntry
        />
        {errors.password && <InputError>{errors.password}</InputError>}
      </View>

      <View style={styles.field}>
        <Label required>Date of birth</Label>
        <DateInput
          value={birthDate}
          onChange={setBirthDate}
          placeholder="DD/MM/YYYY"
        />
        {errors.birthDate && <InputError>{errors.birthDate}</InputError>}
      </View>

      <View style={styles.checkboxRow}>
        <Checkbox checked={agree} onChange={setAgree} />
        <Text style={styles.terms}>
          I agree to the <Text style={styles.link}>Terms of Service</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View>
      {errors.agree && <InputError>{errors.agree}</InputError>}

      <View style={styles.spacer} />

      <LoadingButton
        loading={submitting}
        loadingText="Creating account…"
        onPress={handleSubmit}
      >
        Create account
      </LoadingButton>

      <Text style={styles.footer}>
        Already have an account? <Text style={styles.link}>Sign in</Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 32,
    paddingBottom: 64,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 14,
    color: '#737373',
    marginBottom: 8,
  },
  field: {
    gap: 6,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: 4,
  },
  terms: {
    flex: 1,
    fontSize: 13,
    color: '#525252',
    lineHeight: 19,
  },
  link: {
    color: '#5b5bd6',
    fontWeight: '500',
  },
  spacer: {
    height: 8,
  },
  footer: {
    textAlign: 'center',
    fontSize: 13,
    color: '#737373',
    marginTop: 12,
  },
});
