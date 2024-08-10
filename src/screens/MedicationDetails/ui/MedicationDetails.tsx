import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MedicationDetailsProps {}

const MedicationDetails = (props: MedicationDetailsProps) => {
  return (
    <View style={styles.container}>
      <Text>MedicationDetails</Text>
    </View>
  );
};

export default MedicationDetails;

const styles = StyleSheet.create({
  container: {},
});
