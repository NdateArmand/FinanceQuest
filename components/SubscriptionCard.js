// components/SubscriptionCard.js
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius, font } from '../constants/theme';

const CATEGORY_ICONS = {
  streaming: '📺',
  logiciel: '💻',
  musique: '🎵',
  jeux: '🎮',
  default: '📱',
};

export default function SubscriptionCard({ subscription, onCancel }) {
  const icon = CATEGORY_ICONS[subscription.category] || CATEGORY_ICONS.default;
  const annual = (subscription.amount * 12).toFixed(2);

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.icon}>{icon}</Text>
        <View>
          <Text style={styles.label}>{subscription.label}</Text>
          <Text style={styles.annual}>soit {annual} € / an</Text>
        </View>
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>{subscription.amount.toFixed(2)} €</Text>
        <Text style={styles.perMonth}>/mois</Text>
        <TouchableOpacity style={styles.cancelBtn} onPress={() => onCancel(subscription)}>
          <Text style={styles.cancelText}>Résilier</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  icon: { fontSize: 28 },
  label: {
    fontSize: font.sizeMD,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  annual: {
    fontSize: font.sizeSM,
    color: colors.textMuted,
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
    gap: 2,
  },
  amount: {
    fontSize: font.sizeLG,
    fontWeight: '700',
    color: colors.danger,
  },
  perMonth: {
    fontSize: font.sizeXS,
    color: colors.textMuted,
  },
  cancelBtn: {
    marginTop: spacing.xs,
    backgroundColor: colors.danger,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  cancelText: {
    color: '#FFFFFF',
    fontSize: font.sizeXS,
    fontWeight: '600',
  },
});