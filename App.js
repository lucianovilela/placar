import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  NativeBaseProvider,
  Box,
  Pressable,
  VStack,
  Text,
  Center,
  HStack,
  Divider,
  Icon,
  StatusBar,
  IconButton,
} from 'native-base';

import * as ScreenOrientation from 'expo-screen-orientation';


import { MaterialIcons } from '@expo/vector-icons';

import { Context, useInfo } from './Context';
import Placar from "./Placar";

const Drawer = createDrawerNavigator();

function Component(props) {
  return (
    <Center>
      <Text mt="12" fontSize="18">
        This is {props.route.name} page.
      </Text>
    </Center>
  );
}

const getIcon = (screenName) => {
  switch (screenName) {
    case 'Inbox':
      return 'email';
    case 'Outbox':
      return 'send';
    case 'Favorites':
      return 'heart';
    case 'Search':
      return 'magnify';
    case 'Trash':
      return 'trash-can';
    case 'Spam':
      return 'alert-circle';
    case 'Home':
      return 'timer';  
    default:
      return undefined;
  }
};
function AppBar({ navigation, route }) {
  return (
    <View>
      <StatusBar />

      <Box />
      <HStack px="1" py="3" justifyContent="space-between" alignItems="center">
        <IconButton
          icon={<Icon size="sm" as={<MaterialCommunityIcons name="menu" />} />}
          onPress={() => navigation.toggleDrawer()}
        />
        <Text fontSize="20" fontWeight="bold">
          {route.name}
        </Text>
        <HStack space="2">
          {/*
          <IconButton
            icon={
              <Icon
                as={<MaterialCommunityIcons name="magnify" />}
                size="sm"
                onPress={() => navigation.navigate('Search')}
              />
            }
          />
          */}
          <IconButton
            icon={
              <Icon
                as={<MaterialCommunityIcons name="dots-vertical" />}
                size="sm"
              />
            }
          />
        </HStack>
      </HStack>
    </View>
  );
}
function CustomDrawerContent(props) {
  const [{ nome, idade }, actions] = useInfo();
  return (
    <DrawerContentScrollView {...props} safeArea>
      <VStack space="6" my="2" mx="1">
        <Box px="4">
          <Text bold color="gray.700">
            Mail
          </Text>
          <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
            {nome} idade {idade}
          </Text>
        </Box>
        <VStack divider={<Divider />} space="4">
          <VStack space="3">
            {props.state.routeNames.map((name, index) => (
              <Pressable
                px="5"
                py="3"
                rounded="md"
                bg={
                  index === props.state.index
                    ? 'rgba(6, 182, 212, 0.1)'
                    : 'transparent'
                }
                onPress={(event) => {
                  props.navigation.navigate(name);
                }}>
                <HStack space="7" alignItems="center">
                  <Icon
                    color={
                      index === props.state.index ? 'primary.500' : 'gray.500'
                    }
                    size="5"
                    as={<MaterialCommunityIcons name={getIcon(name)} />}
                  />
                  <Text
                    fontWeight="500"
                    color={
                      index === props.state.index ? 'primary.500' : 'gray.700'
                    }>
                    {name}
                  </Text>
                </HStack>
              </Pressable>
            ))}
          </VStack>

        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
}
function MyDrawer() {
  return (
    <Box safeArea flex={1}>
      <Drawer.Navigator
        screenOptions={(props) => ({
          title: '',
          header: () => <AppBar {...props} />,
        })}
        drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={Placar} />
        <Drawer.Screen name="Favorites" component={Component} />
      </Drawer.Navigator>
    </Box>
  );
}
export default function App() {
  return (
    <Context>
      <NavigationContainer>
        <NativeBaseProvider>
          <MyDrawer />
        </NativeBaseProvider>
      </NavigationContainer>
    </Context>
  );
}
