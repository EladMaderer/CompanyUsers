import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const SearchInput = props => (
  <TextInput
    style={styles.input}
    autoComplete="off"
    autoCorrect={false}
    {...props}
  />
);

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default SearchInput;
