import React, { useEffect } from "react";
import GroupsItem from "../../components/ChatComponents/GroupsItem";
import { useSelector, useDispatch } from "react-redux";
import * as chatGroupActions from "../../store/actions/chat";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { View, StyleSheet } from "react-native";

const ChatGroupsScreen = ({ navigation }) => {
  const chatGroups = useSelector((state) => state.chatGroupsState.chatGroups);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(chatGroupActions.loadGroupsChat());
  }, [dispatch]);
  console.log(chatGroups);
  return (
    <View style={styles.container}>
      <FlatList
        data={chatGroups}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Conversation");
            }}
          >
            <GroupsItem groupName={itemData.item.groupName} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ebebeb",
  },
  text: {
    color: "#101010",
    fontSize: 24,
    fontWeight: "bold",
  },
});
export default ChatGroupsScreen;
