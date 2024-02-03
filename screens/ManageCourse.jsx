import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { CoursesContext } from "../context/coursesContext";
import CourseForm from "../components/CourseForm";
import { storeCourse } from "../helper/http";

export default function ManageCourse({ route, navigation }) {
  const coursesContext = useContext(CoursesContext);

  const courseId = route.params?.courseId;
  let isEditing = false;

  const selectedCourse = coursesContext.courses.find(
    (course) => course.id === courseId
  );

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

  function addOrUpdateHandler(courseData) {
    if (isEditing) {
      coursesContext.updateCourse(courseId, courseData);
    } else {
      storeCourse(courseData);
      coursesContext.addCourse(courseData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <CourseForm
        onSubmit={addOrUpdateHandler}
        cancelHandler={cancelHandler}
        buttonLabel={isEditing ? "Update" : "Add"}
        defaultValues={selectedCourse}
      />

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
});
