import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {clearUsers, searchUsers} from '../../../redux/actions/usersActions';
import {useApi} from '../../../api/api';
import {FETCH_USERS_LIMIT} from '../../../api/apiProperties';
import SearchInput from '../common/SearchInput';
import NoResults from '../common/NoResults';
import {colors} from '../utilities/globalStyles';

const UsersScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const users = useSelector(({usersReducer}) => usersReducer.users);
  const searchTerm = useSelector(({usersReducer}) => usersReducer.searchTerm);
  const [fetchFromIndex, setFetchFromIndex] = useState(0);
  const indexIncrement = fetchFromIndex + FETCH_USERS_LIMIT;

  const {loading, fetchUsersLimit} = useApi();

  useEffect(() => {
    if (searchTerm.length !== 1) {
      setFetchFromIndex(FETCH_USERS_LIMIT);
      dispatch(clearUsers());
      fetchUsersLimit(0, FETCH_USERS_LIMIT, searchTerm);
    }
  }, [searchTerm]);

  const onEndScroll = () => {
    setFetchFromIndex(indexIncrement);
    if (users.length === fetchFromIndex) {
      fetchUsersLimit(fetchFromIndex, indexIncrement, searchTerm);
    }
  };

  const UserButton = ({item}) => {
    const {first_name, last_name} = item;
    return (
      <TouchableOpacity
        style={styles.userButton}
        onPress={() => {
          navigation.navigate('SingleUserScreen', {item});
        }}>
        <Text
          style={styles.userButtonText}>{`${first_name} ${last_name}`}</Text>
      </TouchableOpacity>
    );
  };

  /* onEndReached - Loading new data faster (before the bounce effect is done),
     But sometimes fire twice instead of once, when the user scroll very fast - known bug in iOS. */
  return (
    <View style={{flex: 1}}>
      <SearchInput
        onChangeText={text => dispatch(searchUsers(text))}
        value={searchTerm}
        placeholder="Search User"
        autoCapitalize="none"
      />
      <FlatList
        keyExtractor={({id}) => id}
        data={users}
        renderItem={UserButton}
        onEndReached={() => Platform.OS !== 'ios' && onEndScroll()}
        onMomentumScrollEnd={() => Platform.OS === 'ios' && onEndScroll()}
        ListFooterComponent={loading && <ActivityIndicator size={'large'} />}
        ListFooterComponentStyle={{padding: 30}}
        ListEmptyComponent={<NoResults style={{marginTop: 20}} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  userButton: {
    flex: 1,
    alignItems: 'center',
    padding: 40,
    marginTop: 25,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 6,
  },
  userButtonText: {
    color: colors.mainTextColor,
    fontSize: 18,
    fontWeight: '700',
  },
});

export default UsersScreen;
