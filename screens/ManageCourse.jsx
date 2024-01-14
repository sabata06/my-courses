import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { EvilIcons } from "@expo/vector-icons";

export default function ManageCourse({ route, navigation }) {
  const courseId = route.params?.courseId;
  let isEditing = false;

  if (courseId) {
    isEditing = true;
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Course" : "Add Course",
    });
  }, [navigation, isEditing]);

  function deleteCourse() {
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }


  return (
    <View style={styles.container}>
      <View style={styles.buttons}  >
        <Pressable onPress={cancelHandler}>
          <View style={styles.cancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </View>
        </Pressable>
        <Pressable>
          <View  style={styles.update}>
            <Text  style={styles.updateText}>{isEditing ? "Update" : "Add"}</Text>
          </View>
        </Pressable>
      </View>

      {isEditing && (
        <View style={styles.deleteContainer}>
          <EvilIcons
            name="trash"
            size={36}
            color="black"
            onPress={deleteCourse}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  deleteContainer: {
    paddingTop: 10,
    marginTop: 16,
    alignItems: "center",
    borderTopWidth: 2,
    borderTopColor: "blue",
  },
  buttons:{
    flexDirection:"row",
    justifyContent:"center",

  },
  cancel:{
    backgroundColor:"red",
    minWidth:120,
    marginRight:10,
    padding:8,
    alignItems:"center"
  },
  cancelText:{
    color:"white"
  },
  update:{
    backgroundColor:"blue",
    minWidth:120,
    marginRight:10,
    padding:8,
    alignItems:"center"
  },
  updateText:{
    color:"white"
  }
});
