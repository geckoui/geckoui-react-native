import type { DateRange } from '@geckoui/nativewind';
import {
  Button,
  CounterInput,
  DateRangeInput,
  Dialog,
  Label,
  Select,
  SelectOption,
  Textarea,
  Toast,
} from '@geckoui/nativewind';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

interface Destination {
  value: string;
  label: string;
  pricePerNight: number;
}

const DESTINATIONS: Destination[] = [
  { value: 'tokyo', label: 'Tokyo, Japan', pricePerNight: 220 },
  { value: 'paris', label: 'Paris, France', pricePerNight: 180 },
  { value: 'nyc', label: 'New York, USA', pricePerNight: 250 },
  { value: 'bali', label: 'Bali, Indonesia', pricePerNight: 90 },
  { value: 'reykjavik', label: 'Reykjavik, Iceland', pricePerNight: 200 },
];

const nightsBetween = (range: DateRange | null): number => {
  if (!range?.from || !range?.to) return 0;
  const ms = new Date(range.to).getTime() - new Date(range.from).getTime();
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
};

export default function BookingScreen() {
  const [destination, setDestination] = useState<string>('');
  const [range, setRange] = useState<DateRange | null>(null);
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [notes, setNotes] = useState('');

  const selectedDestination = useMemo(
    () => DESTINATIONS.find((d) => d.value === destination),
    [destination],
  );
  const nights = nightsBetween(range);
  const subtotal = (selectedDestination?.pricePerNight ?? 0) * nights * rooms;
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes;

  const canConfirm =
    destination !== '' && nights > 0 && guests > 0 && rooms > 0;

  const handleConfirm = () => {
    Dialog.show({
      content: ({ dismiss }) => (
        <View style={{ gap: 16 }}>
          <Text style={dialogStyles.title}>Confirm booking</Text>
          <View style={{ gap: 6 }}>
            <SummaryRow
              label="Destination"
              value={selectedDestination?.label ?? '—'}
            />
            <SummaryRow
              label="Dates"
              value={
                range?.from && range?.to
                  ? `${range.from} → ${range.to} (${nights} night${nights === 1 ? '' : 's'})`
                  : '—'
              }
            />
            <SummaryRow
              label="Guests"
              value={`${guests} guest${guests === 1 ? '' : 's'}, ${rooms} room${rooms === 1 ? '' : 's'}`}
            />
            <View style={dialogStyles.divider} />
            <SummaryRow label="Subtotal" value={`$${subtotal}`} />
            <SummaryRow label="Taxes & fees" value={`$${taxes}`} />
            <SummaryRow label="Total" value={`$${total}`} bold />
          </View>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <View style={{ flex: 1 }}>
              <Button variant="outlined" onPress={dismiss}>
                Cancel
              </Button>
            </View>
            <View style={{ flex: 1 }}>
              <Button
                onPress={() => {
                  dismiss();
                  Toast.success('Booking confirmed!', {
                    description: `${selectedDestination?.label}, ${nights} night${nights === 1 ? '' : 's'}`,
                  });
                  setDestination('');
                  setRange(null);
                  setGuests(2);
                  setRooms(1);
                  setNotes('');
                }}
              >
                Book now
              </Button>
            </View>
          </View>
        </View>
      ),
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Find your stay</Text>
        <Text style={styles.heroSubtitle}>
          Discover unique places to stay around the world.
        </Text>
      </View>

      <View style={styles.field}>
        <Label required>Destination</Label>
        <Select
          value={destination}
          onChange={setDestination}
          placeholder="Where do you want to go?"
          filterable
          clearable
        >
          {DESTINATIONS.map((d) => (
            <SelectOption
              key={d.value}
              value={d.value}
              label={`${d.label}  ·  $${d.pricePerNight}/night`}
            />
          ))}
        </Select>
      </View>

      <View style={styles.field}>
        <Label required>Check-in / check-out</Label>
        <DateRangeInput
          value={range}
          onChange={setRange}
          placeholder="Pick your dates"
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.field, { flex: 1 }]}>
          <Label>Guests</Label>
          <CounterInput value={guests} onChange={setGuests} min={1} max={10} />
        </View>
        <View style={[styles.field, { flex: 1 }]}>
          <Label>Rooms</Label>
          <CounterInput value={rooms} onChange={setRooms} min={1} max={5} />
        </View>
      </View>

      <View style={styles.field}>
        <Label>Special requests</Label>
        <Textarea
          value={notes}
          onChangeText={setNotes}
          placeholder="Anything we should know?"
        />
      </View>

      {canConfirm && (
        <View style={styles.summary}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>
              {selectedDestination?.label}
            </Text>
            <Text style={styles.summaryNights}>
              {nights} night{nights === 1 ? '' : 's'}
            </Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              ${selectedDestination?.pricePerNight} × {nights} × {rooms} room
              {rooms === 1 ? '' : 's'}
            </Text>
            <Text style={styles.summaryValue}>${subtotal}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Taxes & fees</Text>
            <Text style={styles.summaryValue}>${taxes}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryTotalLabel}>Total</Text>
            <Text style={styles.summaryTotalValue}>${total}</Text>
          </View>
        </View>
      )}

      <Button disabled={!canConfirm} onPress={handleConfirm}>
        {canConfirm ? `Reserve · $${total}` : 'Reserve'}
      </Button>
    </ScrollView>
  );
}

const SummaryRow = ({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) => (
  <View style={dialogStyles.summaryRow}>
    <Text style={[dialogStyles.summaryLabel, bold && dialogStyles.bold]}>
      {label}
    </Text>
    <Text style={[dialogStyles.summaryValue, bold && dialogStyles.bold]}>
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 24,
    paddingBottom: 64,
    gap: 16,
  },
  hero: {
    gap: 4,
    marginBottom: 4,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#737373',
  },
  field: {
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  summary: {
    backgroundColor: '#fafafa',
    borderRadius: 12,
    padding: 16,
    gap: 8,
    marginTop: 8,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  summaryNights: {
    fontSize: 12,
    color: '#737373',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontSize: 13,
    color: '#525252',
  },
  summaryValue: {
    fontSize: 13,
    color: '#1a1a1a',
  },
  summaryTotalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  summaryTotalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
});

const dialogStyles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#525252',
  },
  summaryValue: {
    fontSize: 13,
    color: '#1a1a1a',
  },
  bold: {
    fontWeight: '700',
    color: '#1a1a1a',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 4,
  },
});
