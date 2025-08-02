import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { ProfileIcon, ScanIcon, ShipmentIcon, WalletIcon } from '@/components/atom/Icons';
import { Colors } from '@/theme';
import ShipmentHeader from '@/features/shipments/components/ShipmentHeader';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          paddingHorizontal: 10,
          height: 90,
        },
        tabBarHideOnKeyboard: true,
        tabBarItemStyle: {
          paddingVertical: 15,
        },
        tabBarLabelStyle: {
          fontFamily: 'SFPro-Regular',
          fontSize: 13,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Shipments',
          header: () => <ShipmentHeader />,
          tabBarIcon: ({ focused }) => <ShipmentIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          header: () => <ShipmentHeader />,
          tabBarIcon: ({ focused }) => <ScanIcon focused={focused} />,

        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          header: () => <ShipmentHeader />,
          tabBarIcon: ({ focused }) => <WalletIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          header: () => <ShipmentHeader />,
          tabBarIcon: ({ focused }) => <ProfileIcon focused={focused} />,
        }}
      />
    </Tabs>
  );
}
