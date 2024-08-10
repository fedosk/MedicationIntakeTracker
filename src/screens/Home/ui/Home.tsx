import React from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { HomeProps } from '../../../app/navigationConfig/types/MainStackTypes';
import { THEME_COLORS } from '../../../shared/constants/appConstants';
import FAB from '../../../shared/ui/FAB';
import UniversalButton from '../../../shared/ui/UniversalButton';

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const card = () => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() =>
          navigation.navigate('MedicationDetails', { id: '12345' })
        }>
        <View style={styles.wrapper}>
          <View style={styles.photoWrapper} />
          <View style={styles.contentWrapper}>
            <View style={styles.titleWrapper}>
              <Text style={{ fontWeight: 700, fontSize: 24 }}>Name</Text>
            </View>
            <View style={styles.timeWrapper}>
              <Text style={{ fontWeight: 400, fontSize: 14, color: 'gray' }}>
                Last update: Wed 7 Aug
              </Text>
            </View>
            <View style={styles.descriptionWrapper}>
              <Text>Take Aspirin 75mg daily in the morning.</Text>
            </View>
            <View style={styles.counterWrapper}>
              <Text>Take Aspirin 75mg daily in the morning.</Text>
            </View>
            <View style={styles.buttonsWrapper}>
              <UniversalButton
                label={'-'}
                onPress={() => {
                  console.log(111);
                }}
              />
              <UniversalButton
                label={'+'}
                onPress={() => {
                  console.log(111);
                }}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handlePress = () => {
    Alert.alert('FAB Pressed!');
  };

  return (
    <SafeAreaView style={styles.content}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {card()}
        {card()}
      </ScrollView>
      <FAB title="+" onPress={handlePress} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  cardContainer: {
    width: '100%',
    borderRadius: 16,
    marginBottom: 20,
    justifyContent: 'space-between',
    backgroundColor: THEME_COLORS.white,
    padding: 10,
    shadowColor: THEME_COLORS.black,
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
  titleWrapper: {},
  timeWrapper: {
    height: 24,
    marginBottom: 10,
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
    borderColor: 'red',
    borderWidth: 1,
  },
  photoWrapper: {
    height: 140,
    borderRadius: 12,
    marginBottom: 10,
    borderColor: 'red',
    borderWidth: 1,
  },
});
