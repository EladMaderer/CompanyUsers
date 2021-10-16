import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import UText from './UText';
const NoResults = ({style}) => {
  return (
    <View style={[styles.container, style]}>
      <UText style={styles.title}>Oops... No Results.</UText>
      <Image source={require('../../../assets/images/man-shrugging.png')} style={styles.image}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 22,
  },
  image: {
    width: 192,
    height: 192,
    marginTop: 20,
  },
});

export default NoResults;
