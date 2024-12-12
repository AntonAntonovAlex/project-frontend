import React from "react";
import { useIntl, FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../i18n/languages";
import { useSelector, useDispatch } from "react-redux";
import { getUserName } from "../../store/user-process/selectors";
import { dropToken } from "../../services/token";
import { logoutAction } from "../../store/user-process/user-process";
import { Link } from 'react-router-dom';
import { AppRoute } from "../../const";

const Header = ({ handleLocaleChange }) => {
  const userName = useSelector(getUserName);
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

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
        <div className="d-flex align-items-center ms-auto">
          {userName ? (
            <>
              <span className="me-3">
                {userName}
              </span>
              <button
                className="btn btn-outline-danger"
                onClick={handleLogout}
              >
                <FormattedMessage id="logout" />
              </button>
            </>
          ) : (
            <Link to={AppRoute.Login} className="text-primary fw-bold">
              <FormattedMessage id='non_authorized' />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
