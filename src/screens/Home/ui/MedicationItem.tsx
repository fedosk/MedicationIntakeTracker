import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import UniversalButton from '../../../components/UniversalButton';
import { THEME_COLORS } from '../../../constants/appConstants';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { updateMedicationCount } from '../../../store/medication/slice/medicationsSlice';
import { IMedication } from '../../../store/medication/types/medicationSchema';
import { convertTimeToDateTimeString } from '../../../utils/timeHandler';

const MedicationItem = React.memo(({ item }: { item: IMedication }) => {
  const { id, name, updated_at, created_at, destination_count, current_count } =
    item;
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const pressHandler = (type: 'increase' | 'decrease') => {
    dispatch(
      updateMedicationCount({
        id: id,
        type,
      }),
    );
  };

  const isButtonDisabled = current_count >= destination_count;

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate('MedicationDetails', { id })}>
      <View style={styles.wrapper}>
        <View style={styles.contentWrapper}>
          <View style={styles.titleWrapper}>
            <Text style={styles.titleText}>{name}</Text>
          </View>
          <View style={styles.timeWrapper}>
            <Text style={styles.timeText}>
              {convertTimeToDateTimeString(updated_at || created_at)}
            </Text>
          </View>
          <View style={styles.countContainer}>
            <Text style={styles.countLabel}>Destination Count:</Text>
            <Text style={styles.countValue}>{destination_count}</Text>
          </View>
          <View style={styles.countContainer}>
            <Text style={styles.countLabel}>Current Count:</Text>
            <Text style={styles.countValue}>{current_count}</Text>
          </View>

          <View style={styles.buttonsContainer}>
            <UniversalButton
              label="Decrease"
              style={styles.decreaseButton}
              onPress={() => pressHandler('decrease')}
            />
            <UniversalButton
              label="Increase"
              onPress={() => pressHandler('increase')}
              disabled={isButtonDisabled}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  buttonsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  decreaseButton: {
    backgroundColor: THEME_COLORS.ERROR,
  },
  cardContainer: {
    width: 350,
    borderRadius: 16,
    marginBottom: 20,
    justifyContent: 'space-between',
    backgroundColor: THEME_COLORS.WHITE,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: THEME_COLORS.DARK,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  contentWrapper: {
    flex: 1,
  },
  titleWrapper: {
    marginBottom: 8,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 28,
  },
  timeWrapper: {
    height: 24,
    marginBottom: 14,
  },
  timeText: {
    fontWeight: 400,
    fontSize: 14,
    color: THEME_COLORS.DARK30,
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

export default memo(MedicationItem);
