// components/SavingsBanner.js
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, font } from '../constants/theme';

export default function SavingsBanner({ totalMonthly, totalAnnual }) {
  return (
    <View style={styles.banner}>
      <Text style={styles.title}>Abonnements détectés</Text>
      <Text style={styles.subtitle}>
        Ces dépenses récurrentes ont été trouvées dans tes transactions
      </Text>
      <View style={styles.row}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{totalMonthly.toFixed(2)} €</Text>
          <Text style={styles.statLabel}>par mois</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={[styles.statValue, { color: colors.danger }]}>
            {totalAnnual.toFixed(2)} €
          </Text>
          <Text style={styles.statLabel}>par an</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: font.sizeXL,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: font.sizeSM,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: { flex: 1, alignItems: 'center' },
  statValue: {
    fontSize: font.sizeXXL,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: font.sizeSM,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
});