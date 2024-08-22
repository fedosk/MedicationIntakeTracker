import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import {
  MainStackParamList,
  MedicationDetailsProps,
} from '../../../app/navigationConfig/types/MainStackTypes';
import UniversalButton from '../../../components/UniversalButton';
import { THEME_COLORS } from '../../../constants/appConstants';
import { RootState } from '../../../store';
import { IMedication } from '../../../store/medication/types/medicationSchema';

const MedicationDetails: React.FC<MedicationDetailsProps> = ({ route }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const { id } = route.params;
  const medication = useSelector((state: RootState) =>
    state.medications.medications.find(med => med.id === id),
  ) as IMedication;

  if (!medication) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Medication not found</Text>
      </View>
    );
  }

  const handleEditMedication = () => {
    navigation.navigate('EditMedication', { id: medication.id });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>{medication.name}</Text>
        </View>
        <View style={styles.headerRight}>
          <UniversalButton
            style={styles.editButton}
            label="Edit"
            onPress={handleEditMedication}
          />
        </View>
      </View>
      {medication.description ? (
        <Text style={styles.description}>{medication.description}</Text>
      ) : null}
      <View style={styles.card}>
        <Text style={styles.heading}>Counts</Text>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: THEME_COLORS.WHITE,
    alignItems: 'stretch',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: THEME_COLORS.WHITE,
  },
  errorText: {
    fontSize: 18,
    color: THEME_COLORS.ALARM,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    width: '80%',
  },
  headerRight: {
    width: '20%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: THEME_COLORS.DARK,
  },
  editButton: {
    marginBottom: 0,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    color: THEME_COLORS.DARK,
  },
  card: {
    backgroundColor: THEME_COLORS.WHITE,
    padding: 16,
    borderRadius: 8,
    shadowColor: THEME_COLORS.DARK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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
