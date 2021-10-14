import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {colors} from '../utilities/globalStyles';

const UText = ({children, style}) => <Text style={[styles.textStyle, style]}>{children}</Text>;

const styles = StyleSheet.create({
  textStyle: {
    color: colors.mainTextColor,
  },
});
export default UText;
