import axios from "axios";

const URL = "https://react-native-9ba02-default-rtdb.firebaseio.com";

export function storeCourse(courseData) {
  axios.post(URL + "/courses.json", courseData);
}
export async function getCourses() {
  const response = await axios.post(URL + "/courses.json");
  const courses = [];

  for (const key in response.data) {
    const courseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    courses.push(courseObj);
  }
  return courses
}
