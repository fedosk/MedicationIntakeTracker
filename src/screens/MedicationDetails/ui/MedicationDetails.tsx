import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { THEME_COLORS } from '../../../constants/appConstants';
import { RootState } from '../../../store';
import { IMedication } from '../../../store/medication/types/medicationSchema';

interface MedicationDetailsProps {
  route: {
    params: {
      id: number;
    };
  };
}

const MedicationDetails: React.FC<MedicationDetailsProps> = ({ route }) => {
  const navigation = useNavigation();
  const { id } = route.params;
  const medication = useSelector((state: RootState) =>
    state.medications.medications.find(med => med.id === id),
  ) as IMedication;

  if (!medication) {
    return (
      <View style={styles.container}>
        <Text>Medication not found</Text>
      </View>
    );
  }

  const handleEditMedication = () => {
    navigation.navigate('EditMedication', { id: medication.id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{medication.name}</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleEditMedication}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{medication.description}</Text>
      <View style={styles.countContainer}>
        <Text style={styles.countLabel}>Initial Count:</Text>
        <Text style={styles.countValue}>{medication.initial_count}</Text>
      </View>
      <View style={styles.countContainer}>
        <Text style={styles.countLabel}>Destination Count:</Text>
        <Text style={styles.countValue}>{medication.destination_count}</Text>
      </View>
      <View style={styles.countContainer}>
        <Text style={styles.countLabel}>Current Count:</Text>
        <Text style={styles.countValue}>{medication.current_count}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: THEME_COLORS.WHITE,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME_COLORS.DARK,
  },
  editButton: {
    backgroundColor: THEME_COLORS.PRIMARY,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  editButtonText: {
    color: THEME_COLORS.WHITE,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    color: THEME_COLORS.DARK,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  countLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    color: THEME_COLORS.DARK,
  },
  countValue: {
    fontSize: 16,
    color: THEME_COLORS.DARK,
  },
});

export default MedicationDetails;
