import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {colors} from '../utilities/globalStyles';

const SearchInput = props => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        autoComplete="off"
        autoCorrect={false}
        placeholderTextColor="#bebad4"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    justifyContent: 'center',
    backgroundColor: 'rgba(42, 41, 46, 0.7)',
  },
  input: {
    paddingHorizontal: 10,
    fontSize: 20,
    fontWeight: '500',
    color: colors.secondaryTextColor,
  },
});

export default SearchInput;
