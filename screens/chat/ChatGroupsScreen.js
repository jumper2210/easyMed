import React, { useEffect } from "react";
import GroupsItem from "../../components/ChatComponents/GroupsItem";
import { useSelector, useDispatch } from "react-redux";
import * as chatGroupActions from "../../store/actions/chat";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { View, StyleSheet, Platform, ActivityIndicator } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Colors from "../../constants/Colors";
import CustomHeaderButton from "../../UI/CustomHeaderButton";

const ChatGroupsScreen = ({ navigation }) => {
  const chatGroups = useSelector((state) => state.chatState.chatGroups);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(chatGroupActions.loadGroupsChat());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <FlatList
        data={chatGroups}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => (
          <TouchableOpacity
            activeOpacity={0.9}
            style={{ paddingVertical: 30 }}
            onPress={() => {
              navigation.navigate("Conversation", {
                groupName: itemData.item.groupName,
                groupId: itemData.item._id,
              });
            }}
          >
            <GroupsItem groupName={itemData.item.groupName} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
export const screenOptions = (navData) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondary,
  },
  text: {
    color: "#101010",
    fontSize: 24,
    fontWeight: "bold",
  },
});
export default ChatGroupsScreen;
