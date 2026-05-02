import { Button, SelectOption, Toast } from '@geckoui/nativewind';
import {
  RHFCheckbox,
  RHFCounterInput,
  RHFCurrencyInput,
  RHFDateInput,
  RHFDateRangeInput,
  RHFInput,
  RHFInputGroup,
  RHFNumberInput,
  RHFOTPInput,
  RHFRadio,
  RHFSelect,
  RHFSwitch,
  RHFTextarea,
} from '@geckoui/nativewind-rhf';
import { FormProvider, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

interface FormValues {
  fullName: string;
  email: string;
  bio: string;
  country: string;
  languages: string[];
  dateOfBirth: string | null;
  tripDates: { from?: string; to?: string } | null;
  travelers: number;
  budget: string;
  dailyRate: string;
  smsCode: string;
  frequency: 'daily' | 'weekly' | 'never' | '';
  marketing: boolean;
  pushNotifications: boolean;
}

const DEFAULTS: FormValues = {
  fullName: '',
  email: '',
  bio: '',
  country: '',
  languages: [],
  dateOfBirth: null,
  tripDates: null,
  travelers: 0,
  budget: '',
  dailyRate: '',
  smsCode: '',
  frequency: '',
  marketing: false,
  pushNotifications: false,
};

export default function RHFFormScreen() {
  const methods = useForm<FormValues>({ defaultValues: DEFAULTS });

  const onSubmit = methods.handleSubmit(
    (values) => {
      Toast.success('Profile saved', {
        description: `${values.fullName || 'Anonymous'} • ${values.languages.length} language${values.languages.length === 1 ? '' : 's'}`,
      });
    },
    () => {
      Toast.error('Please fix the highlighted fields');
    },
  );

  return (
    <FormProvider {...methods}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile setup</Text>
          <Text style={styles.subtitle}>
            Comprehensive RHF demo — every wrapper in @geckoui/nativewind-rhf
          </Text>
        </View>

        <Section title="Personal">
          <RHFInputGroup label="Full name" required>
            <RHFInput
              name="fullName"
              placeholder="Jane Doe"
              rules={{ required: 'Name is required' }}
            />
          </RHFInputGroup>

          <RHFInputGroup
            label="Email"
            required
            tooltip="We'll send a confirmation link"
          >
            <RHFInput
              name="email"
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email',
                },
              }}
            />
          </RHFInputGroup>

          <RHFInputGroup label="Bio" required>
            <RHFTextarea
              name="bio"
              placeholder="Tell us about yourself"
              rows={3}
              rules={{
                required: 'Bio is required',
                minLength: { value: 10, message: 'At least 10 characters' },
              }}
            />
          </RHFInputGroup>
        </Section>

        <Section title="Preferences">
          <RHFInputGroup label="Country" required>
            <RHFSelect
              name="country"
              placeholder="Pick a country"
              filterable
              rules={{ required: 'Choose a country' }}
            >
              <SelectOption value="us" label="United States" />
              <SelectOption value="uk" label="United Kingdom" />
              <SelectOption value="de" label="Germany" />
              <SelectOption value="jp" label="Japan" />
              <SelectOption value="sg" label="Singapore" />
              <SelectOption value="mm" label="Myanmar" />
            </RHFSelect>
          </RHFInputGroup>

          <RHFInputGroup label="Languages" required>
            <RHFSelect
              name="languages"
              placeholder="Select one or more"
              multiple
              rules={{
                validate: (v) =>
                  (Array.isArray(v) && v.length > 0) || 'Pick at least one',
              }}
            >
              <SelectOption value="en" label="English" />
              <SelectOption value="es" label="Spanish" />
              <SelectOption value="fr" label="French" />
              <SelectOption value="de" label="German" />
              <SelectOption value="ja" label="Japanese" />
              <SelectOption value="zh" label="Chinese" />
            </RHFSelect>
          </RHFInputGroup>

          <RHFInputGroup label="Date of birth" required>
            <RHFDateInput
              name="dateOfBirth"
              placeholder="DD/MM/YYYY"
              rules={{ required: 'Date of birth is required' }}
            />
          </RHFInputGroup>
        </Section>

        <Section title="Trip">
          <RHFInputGroup label="Travel dates" required>
            <RHFDateRangeInput
              name="tripDates"
              placeholder="Pick a range"
              rules={{
                validate: (v) =>
                  Boolean(
                    v &&
                      (v as { from?: string }).from &&
                      (v as { to?: string }).to,
                  ) || 'Pick a start and end date',
              }}
            />
          </RHFInputGroup>

          <RHFInputGroup label="Travelers" required>
            <RHFCounterInput
              name="travelers"
              min={0}
              max={9}
              rules={{
                min: { value: 1, message: 'At least 1 traveler' },
              }}
            />
          </RHFInputGroup>
        </Section>

        <Section title="Budget">
          <RHFInputGroup label="Total budget" required>
            <RHFCurrencyInput
              name="budget"
              currency={{ symbol: '$', code: 'USD' }}
              maxFractionDigits={2}
              rules={{ required: 'Budget is required' }}
            />
          </RHFInputGroup>

          <RHFInputGroup
            label="Daily rate"
            tooltip="Up to 2 decimal places, no currency formatting"
          >
            <RHFNumberInput
              name="dailyRate"
              placeholder="0.00"
              maxFractionDigits={2}
              maxWholeDigitPlaces={6}
              positiveOnly
            />
          </RHFInputGroup>
        </Section>

        <Section title="Verification">
          <RHFInputGroup
            label="SMS code"
            required
            tooltip="6-digit code from text message"
          >
            <RHFOTPInput
              name="smsCode"
              length={6}
              rules={{
                required: 'Code is required',
                minLength: { value: 6, message: 'Enter all 6 digits' },
              }}
            />
          </RHFInputGroup>
        </Section>

        <Section title="Notifications">
          <Text style={styles.sublabel}>Email frequency *</Text>
          <View style={styles.radioGroup}>
            <RadioRow
              name="frequency"
              value="daily"
              label="Daily digest"
              rules={{ required: 'Pick one' }}
            />
            <RadioRow
              name="frequency"
              value="weekly"
              label="Weekly summary"
              rules={{ required: 'Pick one' }}
            />
            <RadioRow
              name="frequency"
              value="never"
              label="Never"
              rules={{ required: 'Pick one' }}
            />
          </View>

          <ToggleRow>
            <View style={styles.toggleLabelWrap}>
              <Text style={styles.toggleLabel}>I accept marketing terms *</Text>
              <Text style={styles.toggleDesc}>
                Required to demo Checkbox error state
              </Text>
            </View>
            <RHFCheckbox
              name="marketing"
              rules={{ validate: (v) => v === true || 'You must accept' }}
            />
          </ToggleRow>

          <ToggleRow>
            <View style={styles.toggleLabelWrap}>
              <Text style={styles.toggleLabel}>Enable push *</Text>
              <Text style={styles.toggleDesc}>
                Required to demo Switch error state
              </Text>
            </View>
            <RHFSwitch
              name="pushNotifications"
              rules={{ validate: (v) => v === true || 'Must be enabled' }}
            />
          </ToggleRow>
        </Section>

        <View style={styles.footer}>
          <Button onPress={onSubmit}>Save profile</Button>
          <Button variant="ghost" onPress={() => methods.reset()}>
            Reset form
          </Button>
        </View>
      </ScrollView>
    </FormProvider>
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

const RadioRow = ({
  name,
  value,
  label,
  rules,
}: {
  name: keyof FormValues;
  value: string;
  label: string;
  rules?: Parameters<typeof RHFRadio>[0]['rules'];
}) => (
  <View style={styles.radioRow}>
    <RHFRadio name={name as string} value={value} rules={rules} />
    <Text style={styles.radioLabel}>{label}</Text>
  </View>
);

const ToggleRow = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.toggleRow}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 64,
    gap: 24,
  },
  header: {
    gap: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 13,
    color: '#737373',
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
    gap: 14,
  },
  sublabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#737373',
    marginTop: 4,
  },
  radioGroup: {
    gap: 10,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  radioLabel: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  toggleLabelWrap: {
    flex: 1,
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
});
