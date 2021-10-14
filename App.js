import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import store from './redux/store';
import {Provider} from 'react-redux';
import MainNav from './src/navigation/MainNav';
import {colors} from './src/components/utilities/globalStyles';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <MainNav />
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryBG,
  },
});

export default App;
