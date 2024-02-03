import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Courses from "../components/Courses";
import { CoursesContext } from "../context/coursesContext";
import { getLastWeek } from "../helper/date";
import { getCourses } from "../helper/http";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorText from "../components/ErrorText";

export default function RecentCourses() {
  const coursesContext = useContext(CoursesContext);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function takeCourses() {
      setError(null);
      setIsFetching(true);
      try {
        const courses = await getCourses();
        coursesContext.setCourse(courses);
      } catch (error) {
        setError('Courses are not fetching!');
      }

      setIsFetching(false);
      // setFetchedCourses(courses);
    }

    takeCourses();
  }, []);

  if (error && !isFetching) {
    return <ErrorText message={error} />;
  }

  if (isFetching) {
    return <LoadingSpinner />;
  }

  const recentCourses = coursesContext?.courses.filter((course) => {
    const today = new Date();
    const dateLastWeek = getLastWeek(today, 7);
    console.log(recentCourses);
    return course.date >= dateLastWeek && course.date <= today;
  });

  return (
    <Courses
      courses={recentCourses}
      coursesPeriod="Last 1 Week"
      nullText="You have not enrolled in any courses recently"
    />
  );
}

const styles = StyleSheet.create({});
