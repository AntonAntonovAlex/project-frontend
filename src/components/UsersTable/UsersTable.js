import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsersAction } from '../../store/api-actions';
import { getUsers, getAuthorizationStatus } from '../../store/user-process/selectors';
import { FormattedMessage } from 'react-intl';
import { getTheme } from '../../store/user-process/selectors';

const UsersTable = () => {
  const dispatch = useDispatch();
  const users = useSelector(getUsers);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const theme = useSelector(getTheme);

  useEffect(() => {
    dispatch(getUsersAction());
  }, [dispatch, authorizationStatus]);

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4"><FormattedMessage id='user' /></h3>
      <div className="table-responsive">
        <table className={`table table-bordered table-hover ${theme === 'light' ? 'table-light' : 'table-dark'}`}>
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th><FormattedMessage id='name' /></th>
              <th>Email</th>
              <th><FormattedMessage id='role' /></th>
              <th><FormattedMessage id='updated_at' /></th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.updatedAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                    <FormattedMessage id='no_users_available' />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
