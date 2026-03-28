// app/subscriptions.js
import { useState } from 'react';
import {
  View, Text, FlatList, StyleSheet,
  Modal, TouchableOpacity, Alert
} from 'react-native';
import { useSubscriptions } from '../hooks/useSubscriptions';
import SubscriptionCard from '../components/SubscriptionCard';
import SavingsBanner from '../components/SavingsBanner';
import { colors, spacing, radius, font } from '../constants/theme';

export default function SubscriptionsScreen() {
  const { subscriptions, totalMonthly, totalAnnual } = useSubscriptions();
  const [cancelled, setCancelled] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const active = subscriptions.filter(s => !cancelled.includes(s.label));
  const savedMonthly = cancelled.reduce((sum, label) => {
    const sub = subscriptions.find(s => s.label === label);
    return sum + (sub ? sub.amount : 0);
  }, 0);

  function handleCancel(subscription) {
    setSelected(subscription);
    setModalVisible(true);
  }

  function confirmCancel() {
    setCancelled(prev => [...prev, selected.label]);
    setModalVisible(false);
    Alert.alert(
      'Abonnement résilié',
      `Tu économises ${selected.amount.toFixed(2)} € / mois !`,
      [{ text: 'Super !', style: 'default' }]
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={active}
        keyExtractor={item => item.label}
        ListHeaderComponent={
          <View>
            <SavingsBanner
              totalMonthly={totalMonthly - savedMonthly}
              totalAnnual={(totalMonthly - savedMonthly) * 12}
            />
            {cancelled.length > 0 && (
              <View style={styles.savingsBadge}>
                <Text style={styles.savingsText}>
                  Économie réalisée : {savedMonthly.toFixed(2)} € / mois
                </Text>
              </View>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <SubscriptionCard subscription={item} onCancel={handleCancel} />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🎉</Text>
            <Text style={styles.emptyText}>
              Tu as résilié tous tes abonnements inutiles !
            </Text>
          </View>
        }
        contentContainerStyle={styles.list}
      />

      {/* Modal de confirmation */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Résilier cet abonnement ?</Text>
            <Text style={styles.modalSub}>
              {selected?.label} — {selected?.amount.toFixed(2)} € / mois
            </Text>
            <Text style={styles.modalSaving}>
              Tu économiseras {((selected?.amount || 0) * 12).toFixed(2)} € / an
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.btnSecondary}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.btnSecondaryText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnPrimary} onPress={confirmCancel}>
                <Text style={styles.btnPrimaryText}>Confirmer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.md },
  savingsBadge: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  savingsText: {
    color: colors.primaryDark,
    fontWeight: '600',
    fontSize: font.sizeMD,
    textAlign: 'center',
  },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyIcon: { fontSize: 48, marginBottom: spacing.md },
  emptyText: {
    fontSize: font.sizeMD,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: colors.card,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.xl,
  },
  modalTitle: {
    fontSize: font.sizeXL,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  modalSub: {
    fontSize: font.sizeMD,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  modalSaving: {
    fontSize: font.sizeMD,
    fontWeight: '600',
    color: colors.success,
    marginBottom: spacing.lg,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  btnSecondary: {
    flex: 1, padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border,
    alignItems: 'center',
  },
  btnSecondaryText: { color: colors.textSecondary, fontWeight: '600' },
  btnPrimary: {
    flex: 1, padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  btnPrimaryText: { color: '#FFFFFF', fontWeight: '600' },
});