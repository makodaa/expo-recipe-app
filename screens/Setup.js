import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, Modal, Pressable, Image, FlatList, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTS, SIZES, icons, images } from "../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";


const Setup = ({ navigation }) => {
  const [profile, setProfile] = useState('0');
  const [user, setUser] = useState('User');
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [pictureModalVisible, setPictureModalVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const profilePictures = [
    require("../assets/images/profiles/1.png"),
    require("../assets/images/profiles/2.png"),
    require("../assets/images/profiles/3.png"),
    require("../assets/images/profiles/4.png"),
  ];

  const getUserProfile = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        setUser(value);
      }
    } catch (error) {
      setUser("User");
      console.error(error);
    }
    try {
      const value = await AsyncStorage.getItem("profile");
      if (value !== null) {
        setProfile(value);
      }
    } catch (error) {
      setProfile("0");
      console.error(error);
    }
  }

  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={nameModalVisible}
        onRequestClose={() => {
          setNameModalVisible(false);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.transparent,
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.surfacevariant,
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: COLORS.onbackground,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text
              style={{
                color: COLORS.onbackground,
                ...FONTS.h2,
              }}
            >
              Change Username
            </Text>
            <TextInput
              style={{
                height: 40,
                width: 200,
                margin: 12,
                borderWidth: 1,
                padding: 10,
                color: COLORS.surface,
                ...FONTS.body,
              }}
              onChangeText={(text) => setUser(text)}
              value={user}
              placeholder={user}
            />
            <Pressable
              style={{
                elevation: 8,
                backgroundColor: COLORS.primary,
                borderRadius: 4,
                paddingVertical: 10,
                paddingHorizontal: 12,
                marginVertical: 10,
              }}
              onPress={() => {
                setNameModalVisible(!nameModalVisible);
                setUser(user);
                AsyncStorage.setItem("user", user);
              }}
            >
              <Text
                style={{
                  color: COLORS.surface,
                  ...FONTS.body,
                }}
              >
                Submit
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={pictureModalVisible}
        onRequestClose={() => {
          setPictureModalVisible(false);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.transparent,
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.surfacevariant,
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: COLORS.onbackground,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text
              style={{
                color: COLORS.onbackground,
                ...FONTS.h2,
              }}
            >
              Change Profile Picture
            </Text>
            <FlatList
              data={profilePictures}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                return (
                  <Pressable
                    style={{
                      alignItems: "center",
                      elevation: 8,
                      backgroundColor: COLORS.primary,
                      marginRight: 10,
                      marginVertical: 2,
                      borderRadius: 40,
                      paddingVertical: 10,
                      paddingHorizontal: 14,
                    }}
                    onPress={() => {
                      setPictureModalVisible(!pictureModalVisible);
                      setProfile(index.toString());
                      AsyncStorage.setItem("profile", index.toString());
                    }}
                  >
                    <Image
                      source={item}
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 40,
                      }}
                    />
                  </Pressable>
                );
              }}
            />
          </View>
        </View>
      </Modal>   
      {/* Setup Title */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding / 2,
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={COLORS.white}
          />
        </Pressable>
        <Text style={{ ...FONTS.h2, color: COLORS.white }}>RECIPE ATLAS</Text>
        <View style={{ width: 24 }}></View>
      </View>

      {/* Profile Icon, Large, Centered */}
      {/* User Name */}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: SIZES.padding,
        }}
      >
        <Image
          source={profilePictures[profile]}
          resizeMode="cover"
          style={{
            width: 180,
            height: 180,
            padding: 40,
            borderRadius: 100,
            borderWidth: 3,
            borderColor: COLORS.white,
            borderStyle: "dashed",
          }}
        />
        <Text
          style={{
            marginTop: 4,
            color: COLORS.white,
            ...FONTS.h1,
          }}
        >
          {user}
          </Text>
      </View>

      {/* Settings Title */}

      {/* Settings Options: Change Profile Icon, Change User Name, Clear Preferences */}
      {/* Use Pressables */}
      <Text
          style={{
            color: COLORS.white,
            ...FONTS.h1,
            fontSize: 20,
            marginHorizontal: 20,
          }}
        >
          Settings
          </Text>
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding / 2,
        }}
        onPress = {() => {
          setNameModalVisible(true);
        }}
      >
        <Text style={{ ...FONTS.body, color: COLORS.white }}>Change User Name</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.white} />
      </Pressable>

      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding / 2,
        }}
        onPress = {() => {
          setPictureModalVisible(true);
        }}
      >
        <Text style={{ ...FONTS.body, color: COLORS.white }}>Change Profile Icon</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.white} />
      </Pressable>

      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding / 2,
        }}
        onPress = {() => {
          AsyncStorage.clear();
          navigation.navigate("Setup");
        }}
      >
        <Text style={{ ...FONTS.body, color: COLORS.white }}>Clear Application Data</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.white} />
      </Pressable>
      <Text
          style={{
            color: COLORS.white,
            ...FONTS.h1,
            fontSize: 20,
            marginHorizontal: 20,
          }}
        >
          About
          </Text>
          <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding / 2,
        }}
        onPress = {() => {
          Linking.openURL("https://github.com/makodaa/expo-recipe-app");
        }}
      >
        <Text style={{ ...FONTS.body, color: COLORS.white }}>View Github Repository</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.white} />
      </Pressable>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingVertical: SIZES.padding / 2,
        }}
      >
        <Text style={{ ...FONTS.body, color: COLORS.white }}> Developers: Cerenio, Garcia, Siggayo</Text>
      </View>
    </SafeAreaView>
  );
};

export default Setup;
