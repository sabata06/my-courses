import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Input from './Input';

export default function CourseForm() {
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Kurs Bilgileri</Text>
      <View style={styles.priceAndDate}>
        <Input
          style={styles.flexAll}
          label="Price"
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: () => {},
          }}
        />
        <Input
          style={styles.flexAll}
          label="Date"
          textInputConfig={{
            placeHolder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: () => {},
          }}
        />
      </View>

      <Input
        label="Title"
        textInputConfig={{
          multiline: true,
          onChangeText: () => {},
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'blue',
    marginVertical: 20,
  },
  priceAndDate: {
    flexDirection: 'row',
  },
  flexAll: {
    flex: 1,
  },
});
