import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDropdown, setIsDropdown] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  const handleUsername = (text) => {
    setNewUsername(text);
  };
  const handleEmail = (text) => {
    setNewEmail(text);
  };
  const handlePassword = (text) => {
    setPassword(text);
  };
  const handleBio = (text) => {
    setBio(text);
  };

  const _storeData = () => {
    const user = {
      username: newUsername,
      email: newEmail,
      bio,
      password,
      imageUri,
    };
    try {
      const result = AsyncStorage.setItem("user", JSON.stringify(user));
      console.log(result);
      setUsername("");
      setEmail("");
      setPassword("");
      setBio("");
      setFormSubmitted(true);
    } catch (error) {
      // Error saving data
      console.log("Something went wrong");
    }
  };

  const form = () => {
    _storeData();
    setUsername("");
    setEmail("");
    setPassword("");
    setBio("");
    setFormSubmitted(true);
  };

  const retrieve = async () => {
    const value = await AsyncStorage.getItem("user");
    if (value !== null) {
      // We have data!!
      console.log(value);
    }
    console.log("multi user", value);
    setUsername(JSON.parse(value).username);
    setEmail(JSON.parse(value).email);
    setImageUri(JSON.parse(value).image);
  };

  const pick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result.uri);
      setImageUri(result.uri);
    }
  };

  useEffect(() => {
    retrieve();
  }, [formSubmitted]);
  return (
    <ScrollView>
      <View className="w-screen flex-col items-center px-5">
        <View className="flex-row w-full gap-4" style={styles.container}>
          <Image
            source={imageUri ? imageUri : require("./assets/default.png")}
            className="w-16 h-16 rounded-full"
          />
          <View className="flex w-full justify-center">
            <Text className="text-lg">{username}</Text>
            <Text className="text-sm text-gray-400">{email}</Text>
          </View>
        </View>
        <View className="flex-row w-full gap-3 items-center mt-5">
          <Text className="text-sm text-gray-900">update Image</Text>
          <TouchableOpacity
            className="flex-row w-full max-w-[80px] mt-6 items-center bg-sky-500 h-10 rounded-md justify-center"
            onPress={pick}
          >
            <Text className="text-white text-sm">choose</Text>
          </TouchableOpacity>
        </View>

        <View className="w-full flex-col gap-3 justify-center mt-2">
          <Text className="text-sm font-semibold text-gray-900">username:</Text>
          <TextInput
            className="h-10 rounded-md px-3 border border-solid border-gray-900"
            placeholder="username"
            placeholderTextColor="black"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            value={newUsername}
            onChangeText={(text) => handleUsername(text)}
          />
        </View>
        <View className="w-full flex-col gap-3 justify-center mt-2">
          <Text className="text-sm font-semibold text-gray-900">Email:</Text>
          <TextInput
            className="h-10 rounded-md px-3 border border-solid border-gray-900"
            placeholder="Email"
            placeholderTextColor="black"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            value={newEmail}
            onChangeText={(text) => handleEmail(text)}
          />
        </View>
        <View className="w-full flex-col gap-3 justify-center mt-2">
          <Text className="text-sm font-semibold text-gray-900">Password:</Text>
          <TextInput
            className="h-10 rounded-md px-3 border border-solid border-gray-900"
            placeholder="Password"
            placeholderTextColor="black"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            onChangeText={(text) => handlePassword(text)}
          />
        </View>
        <View className="w-full flex-col gap-3 justify-center mt-2">
          <Text className="text-sm font-semibold text-gray-900">Bio:</Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            className="h-24 rounded-md px-3 border border-solid border-gray-900"
            onChangeText={(text) => handleBio(text)}
          ></TextInput>
        </View>

        <View className="w-full">
          <Text
            className="text-sm text-gray-900 my-5"
            onPress={() => setIsDropdown(!isDropdown)}
          >
            click to Dropdown
          </Text>

          {isDropdown && (
            <View className="flex-col gap-3 justify-start">
              <Text className="text-sm text-gray-900">Dropdown</Text>
              <Text className="text-sm text-gray-900">Dropdown</Text>
              <Text className="text-sm text-gray-900">Dropdown</Text>
              <Text className="text-sm text-gray-900">Dropdown</Text>
              <Text className="text-sm text-gray-900">Dropdown</Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          className="flex-row w-full mt-6 items-center bg-sky-500 h-10 rounded-md justify-center"
          onPress={form}
        >
          <Text className="text-sm text-white">Update</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
});
