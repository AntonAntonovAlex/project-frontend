import { useIntl, FormattedMessage } from 'react-intl'; 
import { LANGUAGES } from "../../i18n/languages";
import { useSelector, useDispatch } from "react-redux";
import { getUserName } from "../../store/user-process/selectors";
import { dropToken } from "../../services/token";
import { logoutAction } from "../../store/user-process/user-process";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from "../../const";
import HomeIcon from '@mui/icons-material/Home';

const Header = ({ handleLocaleChange }) => {
  const userName = useSelector(getUserName);
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const location = useLocation();
  const navigate = useNavigate();
  const isUsersPage = location.pathname === AppRoute.Users;

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      `${userName}, ${formatMessage({ id: 'confirm_logout' })}`
    );
    if (confirmLogout) {
      dispatch(logoutAction());
      dropToken();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="languageDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FormattedMessage id='language' />
          </button>
          <ul className="dropdown-menu" aria-labelledby="languageDropdown">
            {LANGUAGES.map(({ name, code }) => (
                <li key={code}>
                <button
                    className="dropdown-item"
                    onClick={() => handleLocaleChange(code)}
                >
                    {name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="btn btn-outline-primary ms-3"
          onClick={() => navigate(AppRoute.Main)}
          title={formatMessage({ id: 'back_to_main' })}
        >
          <HomeIcon />
        </button>

        <div className="d-flex align-items-center ms-auto gap-3">
          {userName && (
            <Link
              to={isUsersPage ? AppRoute.Main : AppRoute.Users}
              className="btn btn-outline-primary me-3"
            >
              {isUsersPage ? (
                <FormattedMessage id="templates_gallery" />
              ) : (
                <FormattedMessage id="user" />
              )}
            </Link>
          )}
          {userName ? (
            <div className="d-flex align-items-center gap-3">
              <span className="fw-bold">{userName}</span>
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                <FormattedMessage id="logout" />
              </button>
            </div>
          ) : (
            <Link to={AppRoute.Login} className="btn btn-primary">
              <FormattedMessage id="non_authorized" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
