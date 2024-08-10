import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { counterActions } from '../model/slice/counterSlice';

interface CounterProps {}

const Counter = (props: CounterProps) => {
  const {} = props;

  const dispatch = useDispatch();
  const counterValue = useSelector(getCounterValue);

  const increment = () => {
    dispatch(counterActions.increment());
  };

  const decrenemt = () => {
    dispatch(counterActions.decrement());
  };

  return (
    <View style={styles.container}>
      <Text>{counterValue}</Text>
      <TouchableOpacity onPress={increment}>
        <Text>+</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={decrenemt}>
        <Text>-</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {},
});
