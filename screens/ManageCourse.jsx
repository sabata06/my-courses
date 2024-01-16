import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { CoursesContext } from "../context/coursesContext";
import CourseForm from "../components/CourseForm";

export default function ManageCourse({ route, navigation }) {
  const coursesContext = useContext(CoursesContext);

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
    coursesContext.deleteCourse(courseId);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }

  function addOrUpdateHandler() {
    if (isEditing) {
      coursesContext.updateCourse(courseId, {
        description: "güncellenen kurs",
        amount: 169,
        date: new Date(),
      });
    } else {
      coursesContext.addCourse({
        description: "eklenen kurs",
        amount: 169,
        date: new Date(),
      });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <CourseForm />

      <View style={styles.buttons}>
        <Pressable onPress={cancelHandler}>
          <View style={styles.cancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </View>
        </Pressable>
        <Pressable onPress={addOrUpdateHandler}>
          <View style={styles.update}>
            <Text style={styles.updateText}>
              {isEditing ? "Update" : "Add"}
            </Text>
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
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  cancel: {
    backgroundColor: "red",
    minWidth: 120,
    marginRight: 10,
    padding: 8,
    alignItems: "center",
  },
  cancelText: {
    color: "white",
  },
  update: {
    backgroundColor: "blue",
    minWidth: 120,
    marginRight: 10,
    padding: 8,
    alignItems: "center",
  },
  updateText: {
    color: "white",
  },
});
