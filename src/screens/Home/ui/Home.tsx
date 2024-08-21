import React, { useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useSelector } from 'react-redux';

import { HomeProps } from '../../../app/navigationConfig/types/MainStackTypes';
import CreateMedicationModal from '../../../components/Modal';
import UniversalButton from '../../../components/UniversalButton';
import { THEME_COLORS } from '../../../constants/appConstants';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { RootState } from '../../../store';
import {
  fetchMedications,
  updateMedicationCount,
} from '../../../store/medication/slice/medicationsSlice';
import { IMedication } from '../../../store/medication/types/medicationSchema';
import { convertTimeToDateTimeString } from '../../../utils/timeHandler';

const MedicationItem = React.memo(
  ({ item, navigation }: { item: IMedication; navigation }) => {
    const dispatch = useAppDispatch();

    const pressHandler = (type: 'increase' | 'decrease') => {
      dispatch(
        updateMedicationCount({
          id: item.id,
          type,
        }),
      );
    };

    const isButtonDisabled = () => {
      return item.current_count >= item.destination_count;
    };

    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() =>
          navigation.navigate('MedicationDetails', { id: item.id })
        }>
        <View style={styles.wrapper}>
          <View style={styles.contentWrapper}>
            <View style={styles.titleWrapper}>
              <Text style={styles.titleText}>{item.name}</Text>
            </View>
            <View style={styles.timeWrapper}>
              <Text style={styles.timeText}>
                {convertTimeToDateTimeString(
                  item.updated_at || item.created_at,
                )}
              </Text>
            </View>
            <View style={styles.countContainer}>
              <Text style={styles.countLabel}>Destination Count:</Text>
              <Text style={styles.countValue}>{item.destination_count}</Text>
            </View>
            <View style={styles.countContainer}>
              <Text style={styles.countLabel}>Current Count:</Text>
              <Text style={styles.countValue}>{item.current_count}</Text>
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
                disabled={isButtonDisabled()}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const { medications, loading, error } = useSelector(
    (state: RootState) => state.medications,
  );

  const handleGetMedications = useCallback((): void => {
    dispatch(fetchMedications());
    return;
  }, [dispatch]);

  useEffect(() => {
    handleGetMedications();
  }, [dispatch, handleGetMedications]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={THEME_COLORS.PRIMARY} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.centered}>
      <View style={styles.centered}>
        {medications?.length && !error ? (
          <FlatList
            refreshing={loading}
            data={medications}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <MedicationItem item={item} navigation={navigation} />
            )}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={10}
            onRefresh={handleGetMedications}
            contentContainerStyle={styles.contentContainer}
          />
        ) : null}
        {!medications?.length ? (
          <View style={styles.centered}>
            <Text style={styles.error}>No medications found</Text>
          </View>
        ) : null}
      </View>
      <CreateMedicationModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: THEME_COLORS.ALARM,
    fontSize: 18,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: THEME_COLORS.WHITE,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: THEME_COLORS.LIGHT30,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
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
  descriptionWrapper: {
    marginBottom: 10,
  },
  counterWrapper: {},
  buttonsWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    height: 10,
    width: 120,
    borderColor: THEME_COLORS.ERROR,
    borderWidth: 1,
  },
  photoWrapper: {
    height: 140,
    borderRadius: 12,
    marginBottom: 10,
    borderColor: THEME_COLORS.ERROR,
    borderWidth: 1,
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

export default Home;
