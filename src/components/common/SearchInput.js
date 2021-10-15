import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {colors} from '../utilities/globalStyles';

const SearchInput = props => (
  <TextInput
    style={styles.input}
    autoComplete="off"
    autoCorrect={false}
    placeholderTextColor={colors.secondaryTextColor}
    {...props}
  />
);

const styles = StyleSheet.create({
  input: {
    height: 60,
    backgroundColor: 'rgba(42, 41, 46, 0.6)',
    padding: 10,
    fontSize: 20,
    fontWeight: '500',
    color: colors.mainTextColor,
  },
});

export default SearchInput;
