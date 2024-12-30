import { useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../i18n/languages";
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { getUserName, getTheme } from "../../store/user-process/selectors";
import { dropToken } from "../../services/token";
import { logoutAction } from "../../store/user-process/user-process";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from "../../const";
import HomeIcon from '@mui/icons-material/Home';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { toggleTheme } from '../../store/user-process/user-process';

const Header = ({ handleLocaleChange }) => {
  const userName = useSelector(getUserName);
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const location = useLocation();
  const navigate = useNavigate();
  const isUsersPage = location.pathname === AppRoute.Users;
  const theme = useSelector(getTheme);

  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const handleLogout = () => {
    dispatch(logoutAction());
    dropToken();
    setOpenLogoutModal(false);
  };

  return (
    <Box 
      sx={{
        backgroundColor: theme === 'light' ? 'white' : 'grey.900',
        color: theme === 'light' ? 'black' : 'white',
      }}
    >
      <nav
        className="navbar navbar-expand-lg"
        style={{
          backgroundColor: theme === 'light' ? 'white' : '#212121',
          color: theme === 'light' ? 'black' : 'white'
        }}
      >
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
          <IconButton
            color="inherit"
            onClick={() => dispatch(toggleTheme())}
            title={theme === 'light' ? formatMessage({ id: 'dark_mode' }) : formatMessage({ id: 'light_mode' })}
          >
            {theme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
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
                <button
                  className="btn btn-outline-danger"
                  onClick={() => setOpenLogoutModal(true)}
                >
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

        <Modal
          open={openLogoutModal}
          onClose={() => setOpenLogoutModal(false)}
          aria-labelledby="logout-modal-title"
          aria-describedby="logout-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography id="logout-modal-title" variant="h6" component="h2">
              {userName}, <FormattedMessage id="confirm_logout" />
            </Typography>
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenLogoutModal(false)}
              >
                <FormattedMessage id="cancel" />
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
              >
                <FormattedMessage id="logout" />
              </Button>
            </Box>
          </Box>
        </Modal>
      </nav>
    </Box>
  );
};

export default Header;
