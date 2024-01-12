import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CoursesSummary from "./CoursesSummary";
import CoursesList from "./CoursesList";

export default function Courses({ coursesPeriod }) {
  return (
    <View style={styles.container}>
      <CoursesSummary periodName={coursesPeriod} />
      <CoursesList />
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:25,
        paddingTop:25,
        
    }
});
