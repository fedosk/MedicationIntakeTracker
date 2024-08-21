import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import UniversalButton from '../../../components/UniversalButton';
import UniversalInput from '../../../components/UniversalInput';
import { THEME_COLORS } from '../../../constants/appConstants';
import { RootState } from '../../../store';
import {
  deleteMedication,
  updateMedication,
} from '../../../store/medication/slice/medicationsSlice';
import {
  IMedication,
  IMedicationWithoutTracking,
} from '../../../store/medication/types/medicationSchema';

interface EditMedicationProps {
  route: {
    params: {
      id: number;
    };
  };
}

const EditMedication: React.FC<EditMedicationProps> = ({
  navigation,
  route,
}) => {
  const { id } = route.params;

  const dispatch = useDispatch();
  const medication = useSelector((state: RootState) =>
    state.medications.medications.find(med => med.id === id),
  ) as IMedication;

  const [name, setName] = useState<string>(medication?.name || '');
  const [description, setDescription] = useState<string>(
    medication?.description || '',
  );
  const [initialCount, setInitialCount] = useState<string>(
    medication?.initial_count?.toString() || '',
  );
  const [destinationCount, setDestinationCount] = useState<string>(
    medication?.destination_count?.toString() || '',
  );
  const [currentCount, setCurrentCount] = useState<string>(
    medication?.current_count?.toString() || '',
  );

  const handleSave = () => {
    const parsedInitialCount = parseInt(initialCount, 10);
    const parsedDestinationCount = parseInt(destinationCount, 10);
    const parsedCurrentCount = parseInt(currentCount, 10);

    if (
      isNaN(parsedInitialCount) ||
      isNaN(parsedDestinationCount) ||
      isNaN(parsedCurrentCount)
    ) {
      Alert.alert('Invalid input', 'Please enter valid numbers for counts.');
      return;
    }

    const updatedMedication: IMedicationWithoutTracking = {
      name,
      description,
      initial_count: parsedInitialCount,
      destination_count: parsedDestinationCount,
      current_count: parsedCurrentCount,
      is_active: medication.is_active,
    };

    dispatch(updateMedication({ id, medication: updatedMedication })).then(() =>
      navigation.goBack(),
    );
  };

  const handleDelete = () => {
    dispatch(deleteMedication(id)).then(() => navigation.push('Home'));
  };

  return (
    <View style={styles.container}>
      <UniversalInput label="Name" value={name} onChangeText={setName} />
      <UniversalInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      <UniversalInput
        label="Initial Count"
        value={initialCount}
        onChangeText={text => setInitialCount(text)}
        keyboardType="numeric"
      />
      <UniversalInput
        label="Destination Count"
        value={destinationCount}
        onChangeText={text => setDestinationCount(text)}
        keyboardType="numeric"
      />
      <UniversalInput
        label="Current Count"
        value={currentCount}
        onChangeText={text => setCurrentCount(text)}
        keyboardType="numeric"
      />
      <UniversalButton label="Save" onPress={handleSave} />
      <UniversalButton
        label="Delete"
        onPress={handleDelete}
        style={styles.deleteBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: THEME_COLORS.WHITE,
  },
  deleteBtn: {
    backgroundColor: THEME_COLORS.ERROR,
  },
});

export default EditMedication;
