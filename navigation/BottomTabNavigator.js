import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home, Browse, Build, Favorites, Setup } from '../screens'
import {MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: '#18181b',
          borderTopColor: 'transparent',
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
              size={24}
              color={focused ? '#fbbf24' : '#748c94'}
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
            size={24}
            color={focused ? '#fbbf24' : '#748c94'}
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
              size={24}
              color={focused ? '#fbbf24' : '#748c94'}
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
              size={24}
              color={focused ? '#fbbf24' : '#748c94'}
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
              size={24}
              color={focused ? '#fbbf24' : '#748c94'}
            />
          )
        }}
        />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator