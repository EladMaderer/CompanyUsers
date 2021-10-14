import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import UsersScreen from '../components/UsersScreen/UsersScreen';
import SingleUserScreen from '../components/SingleUserScreen/SingleUserScreen';
import {colors} from '../components/utilities/globalStyles';

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: {
    backgroundColor: colors.secondaryBG,
  },
  headerTitleStyle: {
    fontSize: 23,
    color: colors.secondaryTextColor,
  },
  headerTintColor: colors.secondaryTextColor,
  headerTitleAlign: 'center',
};

const MainNav = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={globalScreenOptions}>
      <Stack.Screen
        name="UsersScreen"
        component={UsersScreen}
        options={{
          title: 'Users',
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name={'SingleUserScreen'}
        component={SingleUserScreen}
        options={({route}) => {
          const {first_name, last_name} = route.params.item;
          return {
            title: `${first_name} ${last_name}`,
          };
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
export default MainNav;
