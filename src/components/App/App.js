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

function App() {
  const [currentLocale, setCurrentLocale] = useState(getInitialLocale());
  const handleLocaleChange = (value) => {
    setCurrentLocale(value);
    localStorage.setItem('locale', value);
  };

  function getInitialLocale() {
    const savedLocale = localStorage.getItem('locale')
    return savedLocale || LOCALES.ENGLISH
  };

  return (
    <IntlProvider messages={messages[currentLocale]} locale={currentLocale} defaultLocale={LOCALES.ENGLISH}>
      <>
        <Header handleLocaleChange={handleLocaleChange} />
        <Routes>
          <Route path={AppRoute.Main} element={<Main />}/>
          <Route path={AppRoute.CreateTemplates} element={<CreateTemplate />}/>
          <Route path={AppRoute.Login} element={<Login />}/>
          <Route path={AppRoute.Register} element={<Register />}/>
          <Route path={AppRoute.Users} element={<UsersTable />}/>
        </Routes>
      </>
    </IntlProvider>
  );
}

export default App;
