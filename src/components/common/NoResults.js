import React from 'react';
import {View, StyleSheet} from 'react-native';
import UText from './UText';
const NoResults = ({style}) => {
  return (
    <View style={style}>
      <UText style={styles.title}>Oops... No Results.</UText>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 22,
  },
});

export default NoResults;
