import React, { useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useSelector } from 'react-redux';

import MedicationItem from './MedicationItem';
import { HomeProps } from '../../../app/navigationConfig/types/MainStackTypes';
import FAB from '../../../components/FAB';
import CreateMedicationModal from '../../../components/Modal';
import { THEME_COLORS } from '../../../constants/appConstants';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { RootState } from '../../../store';
import { getSortedMedications } from '../../../store/medication/selectors/getMedications/getMedications';
import { fetchMedications } from '../../../store/medication/slice/medicationsSlice';
import { logoutUser } from '../../../store/user/slice/userSlice';

const Home: React.FC<HomeProps> = () => {
  const dispatch = useAppDispatch();

  const { loading, error } = useSelector(
    (state: RootState) => state.medications,
  );
  const medications = useSelector(getSortedMedications);

  const handleGetMedications = useCallback((): void => {
    dispatch(fetchMedications());
    return;
  }, [dispatch]);

  const handleLogOut = useCallback((): void => {
    dispatch(logoutUser());
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
            renderItem={({ item }) => <MedicationItem item={item} />}
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
      <FAB
        title="Logout"
        style={styles.logout}
        textStyle={styles.logoutText}
        onPress={handleLogOut}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  error: {
    color: THEME_COLORS.ALARM,
    fontSize: 18,
  },
  logout: {
    backgroundColor: THEME_COLORS.ALARM,
    fontSize: 10,
    bottom: Platform.OS === 'ios' ? 60 : 30,
    left: 40,
    position: 'absolute',
  },
  logoutText: {
    backgroundColor: THEME_COLORS.ALARM,
    fontSize: 10,
  },
});

export default Home;
