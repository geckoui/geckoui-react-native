import type { DateRange } from '@geckoui/nativewind';
import {
  Button,
  Calendar,
  Checkbox,
  ConfirmDialog,
  CounterInput,
  DateInput,
  DateRangeInput,
  Dialog,
  Drawer,
  Alert as GeckoAlert,
  Input,
  InputError,
  Label,
  LoadingButton,
  Menu,
  MenuItem,
  MenuTrigger,
  OTPInput,
  Pagination,
  Radio,
  Select,
  SelectEmpty,
  SelectOption,
  SelectTrigger,
  Spinner,
  Switch,
  Textarea,
  Toast,
  Tooltip,
} from '@geckoui/nativewind';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

const press = () => Alert.alert('Pressed!');

export default function ComponentsScreen() {
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [partial, setPartial] = useState(true);
  const [plan, setPlan] = useState<'free' | 'pro'>('free');
  const [notifications, setNotifications] = useState(true);
  const [count, setCount] = useState(0);
  const [otp, setOtp] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectValue, setSelectValue] = useState<string>('');
  const [multiValue, setMultiValue] = useState<string[]>([] as string[]);
  const handleMultiChange = (v: string[]) => setMultiValue(v);
  const [drawerPlacement, setDrawerPlacement] = useState<
    'right' | 'left' | 'bottom' | 'top'
  >('right');
  const [page, setPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    from: null,
    to: null,
  });
  const [submitting, setSubmitting] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Button */}
      <Text style={styles.section}>Button</Text>
      <View style={styles.row}>
        <Button onPress={press}>filled</Button>
        <Button variant="outlined" onPress={press}>
          outlined
        </Button>
        <Button variant="ghost" onPress={press}>
          ghost
        </Button>
      </View>
      <View style={styles.row}>
        <Button size="xs" onPress={press}>
          xs
        </Button>
        <Button size="sm" onPress={press}>
          sm
        </Button>
        <Button size="md" onPress={press}>
          md
        </Button>
        <Button size="lg" onPress={press}>
          lg
        </Button>
        <Button size="xl" onPress={press}>
          xl
        </Button>
      </View>
      <View style={styles.row}>
        <Button disabled onPress={press}>
          disabled
        </Button>
        <Button
          className="border-purple-500"
          variant="outlined"
          labelClassName="text-purple-500"
          onPress={press}
        >
          custom
        </Button>
      </View>

      {/* LoadingButton */}
      <Text style={styles.section}>LoadingButton</Text>
      <View style={styles.row}>
        <LoadingButton
          spinnerPosition="start"
          loading={submitting}
          loadingText="Saving…"
          onPress={() => {
            setSubmitting(true);
            setTimeout(() => setSubmitting(false), 1500);
          }}
        >
          Save changes
        </LoadingButton>
        <LoadingButton loading spinnerPosition="end" variant="outlined">
          Loading end
        </LoadingButton>
      </View>

      {/* Spinner */}
      <Text style={styles.section}>Spinner</Text>
      <View style={styles.row}>
        <Spinner />
        <Spinner size="large" />
        <Spinner className="text-blue-500" />
      </View>

      {/* Label + Input + InputError */}
      <Text style={styles.section}>Input + Label + InputError</Text>
      <View style={styles.field}>
        <Label
          required
          tooltip="We'll never share your email with anyone else."
        >
          Email address
        </Label>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {email.length > 0 && !email.includes('@') ? (
          <InputError>Please enter a valid email</InputError>
        ) : null}
      </View>
      <View style={styles.field}>
        <Label>With prefix & suffix</Label>
        <Input
          placeholder="amount"
          keyboardType="numeric"
          prefix={<Text style={styles.affix}>$</Text>}
          suffix={<Text style={styles.affix}>.00</Text>}
        />
      </View>
      <View style={styles.field}>
        <Label>Disabled</Label>
        <Input editable={false} value="read only value" />
      </View>

      {/* Textarea */}
      <Text style={styles.section}>Textarea</Text>
      <View style={styles.field}>
        <Label>Bio</Label>
        <Textarea
          value={bio}
          onChangeText={setBio}
          placeholder="Tell us about yourself…"
        />
      </View>

      {/* Checkbox */}
      <Text style={styles.section}>Checkbox</Text>
      <View style={styles.row}>
        <Checkbox checked={agreed} onChange={setAgreed} />
        <Text style={styles.inline}>I agree to the terms</Text>
      </View>
      <View style={styles.row}>
        <Checkbox
          checked={partial ? 'indeterminate' : false}
          onChange={() => setPartial((p) => !p)}
        />
        <Text style={styles.inline}>Partial (toggle indeterminate)</Text>
      </View>
      <View style={styles.row}>
        <Checkbox checked disabled />
        <Text style={styles.inline}>Disabled checked</Text>
      </View>

      {/* Radio */}
      <Text style={styles.section}>Radio</Text>
      <View style={styles.row}>
        <Radio checked={plan === 'free'} onChange={() => setPlan('free')} />
        <Text style={styles.inline}>Free</Text>
      </View>
      <View style={styles.row}>
        <Radio checked={plan === 'pro'} onChange={() => setPlan('pro')} />
        <Text style={styles.inline}>Pro</Text>
      </View>

      {/* Switch */}
      <Text style={styles.section}>Switch</Text>
      <View style={styles.row}>
        <Switch size="sm" checked={notifications} onChange={setNotifications} />
        <Switch checked={notifications} onChange={setNotifications} />
        <Switch checked={notifications} onChange={setNotifications} disabled />
        <Text style={styles.inline}>
          Notifications: {notifications ? 'on' : 'off'}
        </Text>
      </View>

      {/* CounterInput */}
      <Text style={styles.section}>CounterInput</Text>
      <View style={styles.row}>
        <CounterInput size="sm" value={count} onChange={setCount} />
        <CounterInput size="md" value={count} onChange={setCount} />
        <CounterInput size="lg" value={count} onChange={setCount} />
      </View>
      <View style={styles.row}>
        <CounterInput value={count} onChange={setCount} min={0} max={10} />
        <Text style={styles.inline}>min=0 max=10</Text>
      </View>
      <View style={styles.row}>
        <CounterInput value={count} onChange={setCount} editable />
        <Text style={styles.inline}>editable</Text>
      </View>
      <View style={styles.row}>
        <CounterInput value={5} onChange={() => {}} readOnly />
        <Text style={styles.inline}>readOnly</Text>
      </View>
      <View style={styles.row}>
        <CounterInput value={5} onChange={() => {}} disabled />
        <Text style={styles.inline}>disabled</Text>
      </View>

      {/* OTPInput */}
      <Text style={styles.section}>OTPInput</Text>
      <OTPInput
        value={otp}
        onChange={setOtp}
        onOTPComplete={(v) => Alert.alert('OTP complete', v)}
      />
      <OTPInput value={otp} onChange={setOtp} length={4} />
      <OTPInput value={otp} onChange={setOtp} disabled />

      {/* Pagination */}
      <Text style={styles.section}>Pagination</Text>
      <Pagination currentPage={page} totalPages={20} onChange={setPage} />
      <Pagination currentPage={1} totalPages={5} onChange={setPage} />

      {/* Calendar */}
      <Text style={styles.section}>Calendar — single</Text>
      <Calendar
        className="w-full"
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
      <Text style={styles.section}>Calendar — range</Text>
      <Calendar
        className="w-full"
        mode="range"
        selectedRange={selectedRange}
        onSelectRange={(r) => setSelectedRange(r ?? { from: null, to: null })}
      />

      {/* DateInput */}
      <Text style={styles.section}>DateInput</Text>
      <View style={styles.field}>
        <Label>Birth date</Label>
        <DateInput
          value={selectedDate ?? null}
          onChange={setSelectedDate}
          placeholder="Pick a date"
        />
      </View>
      <View style={styles.field}>
        <Label>US format</Label>
        <DateInput
          value={selectedDate ?? null}
          onChange={setSelectedDate}
          format="MM/DD/YYYY"
          placeholder="MM/DD/YYYY"
        />
      </View>
      <View style={styles.field}>
        <Label>Disabled</Label>
        <DateInput value="2026-04-15" onChange={() => {}} disabled />
      </View>

      {/* DateRangeInput */}
      <Text style={styles.section}>DateRangeInput</Text>
      <View style={styles.field}>
        <Label>Booking dates</Label>
        <DateRangeInput
          value={selectedRange}
          onChange={(r) => setSelectedRange(r ?? { from: null, to: null })}
          placeholder="Pick a range"
        />
      </View>
      <View style={styles.field}>
        <Label>Disabled</Label>
        <DateRangeInput
          value={{ from: '2026-04-10', to: '2026-04-20' }}
          onChange={() => {}}
          disabled
        />
      </View>

      {/* Toast */}
      <Text style={styles.section}>Toast</Text>
      <View style={styles.row}>
        <Button size="sm" onPress={() => Toast.success('Saved')}>
          success
        </Button>
        <Button
          size="sm"
          variant="outlined"
          onPress={() =>
            Toast.error('Something went wrong', {
              description: 'Tap retry below to try again.',
              action: {
                label: 'Retry',
                onPress: () => Toast.info('Retrying…'),
              },
            })
          }
        >
          error + action
        </Button>
      </View>
      <View style={styles.row}>
        <Button
          size="sm"
          variant="outlined"
          onPress={() => Toast.warning('Battery low')}
        >
          warning
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onPress={() =>
            Toast.show({
              title: 'Sticky toast',
              description: 'No auto-dismiss. Swipe up or tap ✕.',
              duration: 0,
            })
          }
        >
          sticky
        </Button>
        <Button size="sm" variant="ghost" onPress={() => Toast.dismiss()}>
          dismiss all
        </Button>
      </View>

      {/* Tooltip */}
      <Text style={styles.section}>Tooltip</Text>
      <View style={styles.row}>
        <Tooltip
          hitSlop={12}
          content="Tap me again to close. Tap outside to dismiss."
        >
          <Text style={{ fontSize: 18 }}>ⓘ</Text>
        </Tooltip>
        <Tooltip
          content="This one is forced to render below the trigger."
          placement="bottom"
          triggerAsChild
        >
          <Button size="sm" variant="outlined">
            Bottom placement
          </Button>
        </Tooltip>
        <Tooltip
          content="Auto-dismiss after 2s."
          duration={2000}
          triggerAsChild
        >
          <Button size="sm" variant="ghost">
            2s auto-dismiss
          </Button>
        </Tooltip>
        <Tooltip content="Long-press to open." longPress triggerAsChild>
          <Button size="sm" variant="outlined">
            Long-press
          </Button>
        </Tooltip>
      </View>
      <View style={styles.row}>
        <Tooltip
          triggerAsChild
          content={
            <View style={{ gap: 4 }}>
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 13 }}>
                Did you know?
              </Text>
              <Text style={{ color: '#d4d4d4', fontSize: 12 }}>
                You can swipe between tabs at the bottom.
              </Text>
            </View>
          }
        >
          <Button size="sm" variant="outlined">
            Rich content
          </Button>
        </Tooltip>
        <Tooltip
          triggerAsChild
          contentClassName="bg-primary-700 px-4 py-3 rounded-xl"
          content={
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
            >
              <Text style={{ fontSize: 16 }}>✨</Text>
              <Text style={{ color: '#fff', fontSize: 13, fontWeight: '500' }}>
                Custom-styled tooltip
              </Text>
            </View>
          }
        >
          <Button size="sm" variant="ghost">
            Themed
          </Button>
        </Tooltip>
      </View>

      {/* Alert */}
      <Text style={styles.section}>Alert</Text>
      <GeckoAlert title="Default alert" description="A neutral message." />
      <GeckoAlert variant="error" title="Something went wrong" />
      <GeckoAlert variant="warning" title="Heads up" />
      <GeckoAlert
        variant="info"
        title="Did you know?"
        description="Info message."
      />
      <GeckoAlert
        variant="success"
        title="Saved!"
        onRemove={() => Alert.alert('dismissed')}
      />

      {/* Dialog */}
      <Text style={styles.section}>Dialog</Text>
      <View style={styles.row}>
        <Button
          onPress={() =>
            Dialog.show({
              content: ({ dismiss }) => (
                <View style={{ gap: 12 }}>
                  <Text style={{ fontWeight: '700', fontSize: 16 }}>
                    Hello from Dialog
                  </Text>
                  <Text style={{ color: '#525252' }}>
                    This is a custom dialog with any content.
                  </Text>
                  <Button onPress={dismiss}>Close</Button>
                </View>
              ),
            })
          }
        >
          Open Dialog
        </Button>
        <Button
          variant="outlined"
          onPress={() =>
            Dialog.show({
              content: ({ dismiss }) => (
                <View style={{ gap: 12 }}>
                  <Text style={{ fontWeight: '700', fontSize: 16 }}>
                    No outside dismiss
                  </Text>
                  <Button onPress={dismiss}>Close manually</Button>
                </View>
              ),
              dismissOnOutsideClick: false,
            })
          }
        >
          No outside dismiss
        </Button>
      </View>

      {/* ConfirmDialog */}
      <Text style={styles.section}>ConfirmDialog</Text>
      <View style={styles.row}>
        <Button
          onPress={() =>
            ConfirmDialog.show({
              title: 'Delete item',
              content:
                'Are you sure you want to delete this item? This cannot be undone.',
              confirmButtonLabel: 'Delete',
              cancelButtonLabel: 'Cancel',
              onConfirm: ({ dismiss }) => {
                Alert.alert('Confirmed');
                dismiss();
              },
            })
          }
        >
          Confirm Dialog
        </Button>
        <Button
          variant="outlined"
          onPress={() =>
            ConfirmDialog.show({
              title: 'Save changes',
              content: 'Would you like to save your changes?',
              confirmButtonLabel: 'Save',
              onConfirm: async ({ dismiss }) => {
                await new Promise((r) => setTimeout(r, 1500));
                dismiss();
              },
            })
          }
        >
          Async confirm
        </Button>
      </View>

      {/* Drawer */}
      <Text style={styles.section}>Drawer</Text>
      <View style={styles.row}>
        {(['right', 'left', 'bottom', 'top'] as const).map((p) => (
          <Button
            key={p}
            size="sm"
            variant="outlined"
            onPress={() => {
              setDrawerPlacement(p);
              setDrawerOpen(true);
            }}
          >
            {p}
          </Button>
        ))}
      </View>
      <Drawer
        open={drawerOpen}
        placement={drawerPlacement}
        handleClose={() => setDrawerOpen(false)}
        dismissOnBackdropPress
      >
        <View style={{ padding: 24, gap: 16 }}>
          <Text style={{ fontWeight: '700', fontSize: 16 }}>
            Drawer — {drawerPlacement}
          </Text>
          <Text style={{ color: '#525252' }}>
            Tap outside or press the button to close.
          </Text>
          <Button onPress={() => setDrawerOpen(false)}>Close</Button>
        </View>
      </Drawer>

      {/* Menu */}
      <Text style={styles.section}>Menu</Text>
      <View style={styles.row}>
        <Menu label="Actions">
          <MenuItem onClick={() => Alert.alert('Edit')}>Edit</MenuItem>
          <MenuItem onClick={() => Alert.alert('Duplicate')}>
            Duplicate
          </MenuItem>
          <View className="h-[0.5px] w-full bg-gray-500" />
          <MenuItem disabled>Archive</MenuItem>
          <MenuItem onClick={() => Alert.alert('Delete')}>Delete</MenuItem>
        </Menu>
        <Menu label="Disabled" disabled>
          <MenuItem>Item 1</MenuItem>
        </Menu>
        <Menu>
          <MenuTrigger>
            {({ toggleMenu, open }) => (
              <Button size="xl" variant="outlined" onPress={toggleMenu}>
                {open ? 'Close ▲' : 'Open ▼'}
              </Button>
            )}
          </MenuTrigger>
          <MenuItem onClick={() => Alert.alert('Option A')}>Option A</MenuItem>
          <View className="h-[0.5px] w-full bg-gray-500" />
          <MenuItem onClick={() => Alert.alert('Option B')}>Option B</MenuItem>
        </Menu>
      </View>

      {/* Select */}
      <Text style={styles.section}>Select</Text>
      <View style={styles.field}>
        <Label>Single select</Label>
        <Select
          value={selectValue}
          onChange={setSelectValue}
          placeholder="Choose a fruit"
          clearable
        >
          <Text style={{ padding: 8, color: '#737373' }}>Fruits</Text>
          <SelectOption value="apple" label="Apple" />
          <SelectOption value="banana" label="Banana" />
          <SelectOption value="cherry" label="Cherry" />
          <SelectOption value="mango" label="Mango" />
          <SelectOption value="orange" label="Orange" />
        </Select>
      </View>
      <View style={styles.field}>
        <Label>With search</Label>
        <Select
          value={selectValue}
          onChange={setSelectValue}
          placeholder="Search fruits"
          filterable
          clearable
        >
          <SelectOption value="apple" label="Apple" />
          <SelectOption value="banana" label="Banana" />
          <SelectOption value="cherry" label="Cherry" />
          <SelectOption value="mango" label="Mango" />
          <SelectOption value="orange" label="Orange" />
          {Array.from({ length: 10 }, (_, i) => (
            <SelectOption key={i} value={`fruit${i}`} label={`Fruit ${i}`} />
          ))}
          <SelectEmpty>No fruits found</SelectEmpty>
        </Select>
      </View>
      <View style={styles.field}>
        <Label>Multi select</Label>
        <Select
          multiple
          value={multiValue}
          onChange={handleMultiChange}
          placeholder="Select tags"
          clearable
        >
          <SelectOption value="react" label="React" />
          <SelectOption value="vue" label="Vue" />
          <SelectOption value="angular" label="Angular" />
          <SelectOption value="svelte" label="Svelte" />
        </Select>
      </View>
      <View style={styles.field}>
        <Label>Multi select with custom SelectTrigger</Label>
        <Select
          multiple
          value={multiValue}
          onChange={handleMultiChange}
          placeholder="Pick tags"
        >
          <SelectTrigger multiple>
            {({ selectedOptions, toggleMenu, open, hasValue }) => (
              <Button
                variant={hasValue ? 'filled' : 'outlined'}
                onPress={toggleMenu}
              >
                {hasValue
                  ? `${selectedOptions.length} tag${selectedOptions.length === 1 ? '' : 's'}: ${selectedOptions.map((o) => o.label).join(', ')}`
                  : open
                    ? 'Close picker ▴'
                    : 'Open picker ▾'}
              </Button>
            )}
          </SelectTrigger>
          <SelectOption value="react" label="React" />
          <SelectOption value="vue" label="Vue" />
          <View className="h-1 w-full bg-black" />
          <SelectOption value="angular" label="Angular" />
          <SelectOption value="svelte" label="Svelte" />
        </Select>
      </View>
      <View style={styles.field}>
        <Label>Disabled</Label>
        <Select value="apple" onChange={() => {}} disabled>
          <SelectOption value="apple" label="Apple" />
        </Select>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 12,
  },
  section: {
    fontSize: 11,
    fontWeight: '700',
    color: '#737373',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 12,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  field: {
    gap: 6,
  },
  inline: {
    fontSize: 14,
    color: '#262626',
  },
  affix: {
    fontSize: 14,
    color: '#737373',
  },
});
