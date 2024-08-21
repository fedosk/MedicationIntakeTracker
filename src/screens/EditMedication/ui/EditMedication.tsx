import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import UniversalButton from '../../../components/UniversalButton';
import { THEME_COLORS } from '../../../constants/appConstants';
import { RootState } from '../../../store';
import { updateMedication } from '../../../store/medication/slice/medicationsSlice';
import { IMedication } from '../../../store/medication/types/medicationSchema';

interface EditMedicationProps {
  route: {
    params: {
      id: number;
    };
  };
}

const EditMedication: React.FC<EditMedicationProps> = ({ route }) => {
  const { id } = route.params;
  const dispatch = useDispatch();
  const medication = useSelector((state: RootState) =>
    state.medications.medications.find(med => med.id === id),
  ) as IMedication;

  const [name, setName] = useState<string>(medication.name || '');
  const [description, setDescription] = useState<string>(
    medication.description || '',
  );
  const [initialCount, setInitialCount] = useState<number>(
    medication.initial_count,
  );
  const [destinationCount, setDestinationCount] = useState<number>(
    medication.destination_count,
  );
  const [currentCount, setCurrentCount] = useState(medication.current_count);

  const handleSave = () => {
    const updatedMedication: IMedication = {
      ...medication,
      name,
      description,
      initial_count: initialCount,
      destination_count: destinationCount,
      current_count: currentCount,
    };
    dispatch(updateMedication({ id, updatedMedication }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Initial Count</Text>
      <TextInput
        style={styles.input}
        value={initialCount.toString()}
        onChangeText={value => setInitialCount(parseInt(value, 10))}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Destination Count</Text>
      <TextInput
        style={styles.input}
        value={destinationCount.toString()}
        onChangeText={value => setDestinationCount(parseInt(value, 10))}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Current Count</Text>
      <TextInput
        style={styles.input}
        value={currentCount.toString()}
        onChangeText={value => setCurrentCount(parseInt(value, 10))}
        keyboardType="numeric"
      />

      <UniversalButton label="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
  },
  input: {
    height: 40,
    borderColor: THEME_COLORS.LIGHT30,
    borderWidth: 1,
    marginTop: 8,
    paddingHorizontal: 8,
  },
});

export default EditMedication;
