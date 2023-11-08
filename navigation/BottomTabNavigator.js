import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home, Browse, Build, Favorites, Setup } from '../screens'
import {MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, DARK, SIZES, FONTS } from '../constants/index';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: COLORS.background,
          borderTopColor: COLORS.transparent,
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options = {{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="home"
              size={26}
              color={focused ? COLORS.primary : '#748c94'}
            />
          )
        }}
      />
      <Tab.Screen
        name="Browse"
        component={Browse}
        options = {{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
            name="apple-safari"
            size={26}
            color={focused ? COLORS.primary : '#748c94'}
            />
          )
        }}
        />
      <Tab.Screen
        name="Build"
        component={Build}
        options = {{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="silverware-clean"
              size={26}
              color={focused ? COLORS.primary : '#748c94'}
            />
          )
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options = {{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="bookmark-box-multiple"
              size={26}
              color={focused ? COLORS.primary : '#748c94'}
            />
          )
        }}
        />
      <Tab.Screen
        name="Setup"
        component={Setup}
        options = {{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={26}
              color={focused ? COLORS.primary : '#748c94'}
            />
          )
        }}
        />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator