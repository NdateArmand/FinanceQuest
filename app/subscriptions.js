import { View, Text, StyleSheet } from 'react-native';
import { colors, font, spacing } from '../constants/theme';

export default function SubscriptionsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Abonnements détectés</Text>
      <Text style={styles.subtitle}>En cours de construction...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background,
    alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', color: colors.primary },
  subtitle: { fontSize: 15, color: colors.textSecondary, marginTop: 8 },
});