// hooks/useSubscriptions.js
import { useMemo } from 'react';
import transactions from '../data/transactions.json';

export function useSubscriptions() {

  const subscriptions = useMemo(() => {
    // Compter combien de fois chaque label revient
    const counts = {};
    transactions.forEach(t => {
      if (t.amount < 0) {
        const key = t.label;
        if (!counts[key]) {
          counts[key] = { label: t.label, amount: Math.abs(t.amount),
            category: t.category, occurrences: 0 };
        }
        counts[key].occurrences += 1;
      }
    });

    // Garder uniquement ceux qui reviennent 2+ fois = abonnements
    return Object.values(counts)
      .filter(t => t.occurrences >= 2)
      .sort((a, b) => b.amount - a.amount);
  }, []);

  const totalMonthly = useMemo(() =>
    subscriptions.reduce((sum, s) => sum + s.amount, 0), [subscriptions]);

  const totalAnnual = useMemo(() =>
    totalMonthly * 12, [totalMonthly]);

  return { subscriptions, totalMonthly, totalAnnual };
}