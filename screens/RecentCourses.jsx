import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Courses from "../components/Courses";

export default function RecentCourses() {
  return <Courses coursesPeriod="Last 1 Week" />;
}

const styles = StyleSheet.create({});
