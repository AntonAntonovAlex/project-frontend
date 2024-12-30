import Header from '../Header/Header';
import { IntlProvider } from 'react-intl'
import { LOCALES } from '../../i18n/locales'
import { messages } from '../../i18n/messages'
import { useState } from 'react';
import Login from '../Login/Login';
import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import Register from '../Register/Register';
import UsersTable from '../UsersTable/UsersTable';
import Main from '../Main/Main';
import CreateTemplate from '../CreateTemplate/CreateTemplate';
import PrivateRoute from '../private-route/private-route';
import { useSelector } from 'react-redux';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import TemplateDetail from '../TemplateDetail/TemplateDetail';
import { getTheme } from '../../store/user-process/selectors';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const [currentLocale, setCurrentLocale] = useState(getInitialLocale());
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const theme = useSelector(getTheme);
  const muiTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  const handleLocaleChange = (value) => {
    setCurrentLocale(value);
    localStorage.setItem('locale', value);
  };

  function getInitialLocale() {
    const savedLocale = localStorage.getItem('locale')
    return savedLocale || LOCALES.ENGLISH
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <IntlProvider messages={messages[currentLocale]} locale={currentLocale} defaultLocale={LOCALES.ENGLISH}>
        <Header handleLocaleChange={handleLocaleChange} />
        <Routes>
          <Route path={AppRoute.Main} element={<Main />}/>
          <Route
            path={AppRoute.CreateTemplates}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <CreateTemplate />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Template} element={<TemplateDetail />}/>
          <Route path={AppRoute.Login} element={<Login />}/>
          <Route path={AppRoute.Register} element={<Register />}/>
          <Route path={AppRoute.Users} element={<UsersTable />}/>
        </Routes>
      </IntlProvider>
    </ThemeProvider>
  );
}

export default App;
