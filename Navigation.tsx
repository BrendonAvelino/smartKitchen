// Navigation.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ColorMix from './pages/ColorMix';
import PcBuilder from './pages/PcBuilder';
import SmartFashion from './pages/smartFashion';
import { MaterialIcons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="ColorMix"
          component={ColorMix}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="palette" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="PcBuilder"
          component={PcBuilder}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="build" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="SmartFashion"
          component={SmartFashion}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="style" size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
