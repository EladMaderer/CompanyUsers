import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {setUsers} from '../redux/actions/usersActions';
import {BASE_URL} from './apTypes';

export const useApi = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const serverApi = async (params = '', method = 'GET') => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}?${params}`, {
        method,
      });
      const result = await response.json();
      dispatch(setUsers(result));
      setLoading(false);
      setError(false);
    } catch (e) {
      // TODO: Create an error handler... In the distant future :)
      setError(true);
      setLoading(false);
    }
  };

  const fetchUsersLimit = async (fromIndex, toIndex, searchTerm = '') => {
    await serverApi(
      `fromIndex=${fromIndex}&toIndex=${toIndex}&searchTerm=${searchTerm}`,
    );
  };

  return {error, loading, fetchUsersLimit, serverApi};
};
