import type { DateRange } from '@geckoui/nativewind';
import {
  Button,
  ConfirmDialog,
  DateInput,
  DateRangeInput,
  Dialog,
  Drawer,
  Label,
  Menu,
  MenuItem,
  MenuTrigger,
  Select,
  SelectButton,
  SelectMenu,
  SelectOption,
  Toast,
  Tooltip,
} from '@geckoui/nativewind';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

function DrawerFormContent() {
  const [date, setDate] = useState<string | null>(null);
  const [range, setRange] = useState<DateRange | null>(null);
  const [country, setCountry] = useState<string | null>(null);

  return (
    <ScrollView contentContainerStyle={styles.drawerContent}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerTitle}>Inside Drawer</Text>
        <Button size="sm" variant="ghost" onPress={() => Drawer.dismiss()}>
          ✕
        </Button>
      </View>

      <View style={styles.field}>
        <Label>DateInput</Label>
        <DateInput value={date} onChange={setDate} placeholder="Select date" />
      </View>

      <View style={styles.field}>
        <Label>DateRangeInput</Label>
        <DateRangeInput value={range} onChange={setRange} />
      </View>

      <View style={styles.field}>
        <Label>Select</Label>
        <Select
          value={country}
          onChange={setCountry}
          placeholder="Choose country"
        >
          <SelectButton />
          <SelectMenu>
            <SelectOption value="us" label="United States" />
            <SelectOption value="uk" label="United Kingdom" />
            <SelectOption value="jp" label="Japan" />
            <SelectOption value="au" label="Australia" />
            <SelectOption value="sg" label="Singapore" />
          </SelectMenu>
        </Select>
      </View>

      <View style={styles.field}>
        <Label>Menu</Label>
        <Menu>
          <MenuTrigger>
            {({ toggleMenu, open }) => (
              <Button variant="outlined" onPress={toggleMenu}>
                Actions {open ? '▲' : '▼'}
              </Button>
            )}
          </MenuTrigger>
          <MenuItem
            onClick={() => Toast.show({ title: 'Saved', variant: 'success' })}
          >
            Save
          </MenuItem>
          <MenuItem
            onClick={() => Toast.show({ title: 'Duplicated', variant: 'info' })}
          >
            Duplicate
          </MenuItem>
          <MenuItem
            onClick={() =>
              ConfirmDialog.show({
                title: 'Delete Item',
                content: 'This cannot be undone.',
                onConfirm: async () => {
                  await new Promise((r) => setTimeout(r, 600));
                },
              })
            }
          >
            Delete
          </MenuItem>
        </Menu>
      </View>

      <View style={styles.field}>
        <Label>ConfirmDialog</Label>
        <Button
          variant="outlined"
          onPress={() =>
            ConfirmDialog.show({
              title: 'Confirm Action',
              content: 'Are you sure you want to proceed?',
              onConfirm: async () => {
                await new Promise((r) => setTimeout(r, 800));
                Drawer.dismiss();
              },
            })
          }
        >
          Open ConfirmDialog
        </Button>
      </View>

      <View style={styles.field}>
        <Label>Tooltip</Label>
        <Tooltip content="Tooltip inside a Drawer!" placement="top">
          <View style={styles.tooltipTarget}>
            <Text style={styles.hint}>Long press for tooltip</Text>
          </View>
        </Tooltip>
      </View>
    </ScrollView>
  );
}

function DialogFormContent({ dismiss }: { dismiss: () => void }) {
  const [date, setDate] = useState<string | null>(null);
  const [range, setRange] = useState<DateRange | null>(null);
  const [country, setCountry] = useState<string | null>(null);

  return (
    <ScrollView
      style={styles.dialogScroll}
      contentContainerStyle={styles.dialogContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.dialogTitle}>Inside Dialog</Text>

      <View style={styles.field}>
        <Label>DateInput</Label>
        <DateInput value={date} onChange={setDate} placeholder="Select date" />
      </View>

      <View style={styles.field}>
        <Label>DateRangeInput</Label>
        <DateRangeInput value={range} onChange={setRange} />
      </View>

      <View style={styles.field}>
        <Label>Select</Label>
        <Select
          value={country}
          onChange={setCountry}
          placeholder="Choose country"
        >
          <SelectButton />
          <SelectMenu>
            <SelectOption value="us" label="United States" />
            <SelectOption value="uk" label="United Kingdom" />
            <SelectOption value="jp" label="Japan" />
            <SelectOption value="au" label="Australia" />
            <SelectOption value="sg" label="Singapore" />
          </SelectMenu>
        </Select>
      </View>

      <View style={styles.field}>
        <Label>Menu</Label>
        <Menu>
          <MenuTrigger>
            {({ toggleMenu, open }) => (
              <Button variant="outlined" onPress={toggleMenu}>
                Actions {open ? '▲' : '▼'}
              </Button>
            )}
          </MenuTrigger>
          <MenuItem
            onClick={() => Toast.show({ title: 'Saved', variant: 'success' })}
          >
            Save
          </MenuItem>
          <MenuItem
            onClick={() => Toast.show({ title: 'Duplicated', variant: 'info' })}
          >
            Duplicate
          </MenuItem>
        </Menu>
      </View>

      <View style={styles.field}>
        <Label>Tooltip</Label>
        <Tooltip content="Tooltip inside a Dialog!" placement="top">
          <View style={styles.tooltipTarget}>
            <Text style={styles.hint}>Long press for tooltip</Text>
          </View>
        </Tooltip>
      </View>

      <Button onPress={dismiss}>Close</Button>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

export default function OverlayScreen() {
  const openDrawer = (placement: 'right' | 'left' | 'top' | 'bottom') => {
    Drawer.show(<DrawerFormContent />, { placement });
  };

  const openDialog = () => {
    Dialog.show({
      content: ({ dismiss }) => <DialogFormContent dismiss={dismiss} />,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Section title="Inside Drawer">
        <Text style={styles.description}>
          DateInput, DateRangeInput, Select, Menu, ConfirmDialog and Tooltip
          inside a Drawer.
        </Text>
        <View style={styles.row}>
          <Button onPress={() => openDrawer('right')}>→ Right</Button>
          <Button onPress={() => openDrawer('left')}>← Left</Button>
          <Button onPress={() => openDrawer('bottom')}>↑ Bottom</Button>
          <Button onPress={() => openDrawer('top')}>↓ Top</Button>
        </View>
      </Section>

      <Section title="Inside Dialog">
        <Text style={styles.description}>
          DateInput, DateRangeInput, Select, Menu and Tooltip inside a Dialog.
        </Text>
        <Button onPress={openDialog}>Open Dialog with Form</Button>
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 28,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    color: '#737373',
    lineHeight: 19,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  drawerContent: {
    padding: 20,
    gap: 16,
    paddingBottom: 40,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  field: {
    gap: 6,
  },
  tooltipTarget: {
    padding: 12,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  hint: {
    fontSize: 13,
    color: '#737373',
  },
  dialogScroll: {
    maxHeight: 480,
  },
  dialogContent: {
    gap: 16,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
});
