import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import { dateFormatter } from "../helper/date";

export default function CourseForm({
  cancelHandler,
  onSubmit,
  buttonLabel,
  defaultValues,
}) {
  const [inputs, setInputs] = useState({
    amount: defaultValues ? defaultValues.amount.toString() : "",
    date: defaultValues ? dateFormatter(defaultValues.date) : "",
    description: defaultValues ? defaultValues.description : "",
  });

  const inputChange = (inputIdentifier, enteredValue) => {
    setInputs((currentInput) => {
      return {
        ...currentInput,
        [inputIdentifier]: enteredValue,
      };
    });
  };

  function addOrUpdateHandler() {
    const courseData = {
      amount: Number(inputs.amount),
      date: new Date(inputs.date),
      description: inputs.description,
    };
    onSubmit(courseData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Kurs Bilgileri</Text>
      <View style={styles.priceAndDate}>
        <Input
          style={styles.flexAll}
          label="Price"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChange.bind(this, "amount"),
            value: inputs.amount,
          }}
        />
        <Input
          style={styles.flexAll}
          label="Date"
          textInputConfig={{
            placeHolder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChange.bind(this, "date"),
            value: inputs.date,
          }}
        />
      </View>

      <Input
        label="Title"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChange.bind(this, "description"),
          value: inputs.description,
        }}
      />
      <View style={styles.buttons}>
        <Pressable onPress={cancelHandler}>
          <View style={styles.cancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </View>
        </Pressable>
        <Pressable onPress={addOrUpdateHandler}>
          <View style={styles.update}>
            <Text style={styles.updateText}>{buttonLabel}</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginVertical: 20,
  },
  priceAndDate: {
    flexDirection: "row",
  },
  flexAll: {
    flex: 1,
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
