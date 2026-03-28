// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import HomeScreen from './app/index';
import SubscriptionsScreen from './app/subscriptions';
import MissionsScreen from './app/missions';
import { colors } from './constants/theme';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarStyle: {
            backgroundColor: colors.card,
            borderTopColor: colors.border,
            paddingBottom: 8,
            height: 60,
          },
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '600' },
        }}
      >
        <Tab.Screen
          name="Accueil"
          component={HomeScreen}
          options={{ tabBarIcon: () => <Text>🏠</Text> }}
        />
        <Tab.Screen
          name="Abonnements"
          component={SubscriptionsScreen}
          options={{
            tabBarIcon: () => <Text>🔍</Text>,
            title: 'Mes abonnements',
          }}
        />
        <Tab.Screen
          name="Missions"
          component={MissionsScreen}
          options={{ tabBarIcon: () => <Text>🎯</Text> }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}