import {BackHandler, Alert} from 'react-native';

const backActionHandler = () => {
  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to close the app?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'EXIT APP', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  return () => backHandler.remove();
};

export default backActionHandler;
