import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {colors} from '../utilities/globalStyles';

const SearchInput = props => (
  <TextInput
    style={styles.input}
    autoComplete="off"
    autoCorrect={false}
    placeholderTextColor="#bebad4"
    {...props}
  />
);

const styles = StyleSheet.create({
  input: {
    height: 60,
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    backgroundColor: 'rgba(42, 41, 46, 0.7)',
    padding: 10,
    fontSize: 20,
    fontWeight: '500',
    color: colors.secondaryTextColor,
  },
});

export default SearchInput;
