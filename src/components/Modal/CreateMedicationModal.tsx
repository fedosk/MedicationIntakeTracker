import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, View } from 'react-native';

import { THEME_COLORS } from '../../constants/appConstants';
import { useAppDispatch } from '../../store';
import { createMedication } from '../../store/medication/slice/medicationsSlice';
import { IMedicationWithoutTracking } from '../../store/medication/types/medicationSchema';
import FAB from '../FAB';
import UniversalButton from '../UniversalButton';
import UniversalInput from '../UniversalInput';

const CreateMedicationModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [formState, setFormState] = useState<{
    name: string;
    description: string;
    initialCount: number;
    destinationCount: number;
  }>({
    name: '',
    description: '',
    initialCount: 0,
    destinationCount: 0,
  });

  const handleCreateMedication = () => {
    if (isNaN(formState.initialCount) || isNaN(formState.destinationCount)) {
      Alert.alert('Invalid input', 'Please enter valid numbers for counts.');
      return;
    }

    const newMedication: IMedicationWithoutTracking = {
      name: formState.name,
      description: formState.description,
      initial_count: formState.initialCount,
      destination_count: formState.destinationCount,
      current_count: formState.initialCount,
      is_active: true,
    };

    dispatch(createMedication(newMedication))
      .unwrap()
      .then(() => {
        setModalVisible(false);
        resetForm();
      })
      .catch(error => {
        console.error('Failed to create medication:', error);
        Alert.alert('Error', 'Failed to create medication. Please try again.');
      });
  };

  const resetForm = () => {
    setFormState({
      name: '',
      description: '',
      initialCount: 0,
      destinationCount: 0,
    });
  };

  const handleInputChange = (field: keyof typeof formState, value: string) => {
    setFormState(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <View>
      <FAB title="+" onPress={() => setModalVisible(true)} />
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <UniversalInput
              label="Name"
              placeholder="Name"
              value={formState.name}
              onChangeText={text => handleInputChange('name', text)}
            />
            <UniversalInput
              label="Description"
              placeholder="Description"
              value={formState.description}
              onChangeText={text => handleInputChange('description', text)}
            />
            <UniversalInput
              label="Initial Count"
              placeholder="Initial Count"
              value={formState.initialCount}
              onChangeText={text => handleInputChange('initialCount', text)}
              keyboardType="numeric"
            />
            <UniversalInput
              label="Destination Count"
              placeholder="Destination Count"
              value={formState.destinationCount}
              onChangeText={text => handleInputChange('destinationCount', text)}
              keyboardType="numeric"
            />
            <View style={styles.buttonContainer}>
              <UniversalButton
                style={styles.cancelBtn}
                textStyle={styles.cancelBtnText}
                label="Cancel"
                onPress={() => setModalVisible(false)}
              />
              <UniversalButton
                label="Create"
                onPress={handleCreateMedication}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME_COLORS.DARK10,
  },
  modalView: {
    margin: 20,
    backgroundColor: THEME_COLORS.WHITE,
    borderRadius: 20,
    padding: 35,
    shadowColor: THEME_COLORS.DARK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: THEME_COLORS.DARK30,
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  cancelBtn: {
    backgroundColor: THEME_COLORS.LIGHT30,
    borderColor: THEME_COLORS.DARK10,
    borderWidth: 1,
    width: '40%',
  },
  cancelBtnText: {
    color: THEME_COLORS.DARK50,
  },
});

export default CreateMedicationModal;
