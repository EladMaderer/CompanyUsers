import React, {useEffect} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {colors} from '../utilities/globalStyles';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
} from 'react-native-reanimated';

const SearchInput = props => {
  const opacity = useSharedValue(0.3);
  const height = useSharedValue(0);
  const reAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      height: height.value,
    };
  }, []);

  useEffect(() => {
    opacity.value = withDelay(2000, withTiming(0.7, {duration: 1000}));
    height.value = withDelay(
      100,
      withTiming(60, {
        duration: 1900,
        easing: Easing.in(Easing.ease),
      }),
    );
  }, []);

  return (
    <Animated.View style={[styles.container, reAnimatedStyle]}>
      <TextInput
        style={styles.input}
        autoComplete="off"
        autoCorrect={false}
        placeholderTextColor="#bebad4"
        {...props}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    justifyContent: 'center',
    backgroundColor: '#2a292e',
  },
  input: {
    paddingHorizontal: 10,
    fontSize: 20,
    fontWeight: '500',
    color: colors.secondaryTextColor,
  },
});

export default SearchInput;
