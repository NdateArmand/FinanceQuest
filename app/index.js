import { View, Text, StyleSheet } from 'react-native';
import { colors, font, spacing } from '../constants/theme';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finance Quest</Text>
      <Text style={styles.subtitle}>Ton apprentissage financier gamifié</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  title: {
    fontSize: font.sizeXXL,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: font.sizeMD,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});