import { Box, Button, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserName, getTheme } from "../../store/user-process/selectors";
import { AppRoute } from "../../const";
import { FormattedMessage } from 'react-intl';
import { saveLocation } from '../../store/user-process/user-process';

const Footer = () => {
  const userName = useSelector(getUserName);
  const theme = useSelector(getTheme);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = window.location.href;

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme === 'light' ? 'white' : 'grey.900',
        color: theme === 'light' ? 'black' : 'white',
        py: 2,
        textAlign: 'center',
        borderTop: `1px solid ${theme === 'light' ? '#ccc' : 'grey.800'}`,
        mt: 'auto',
      }}
    >
      <Typography variant="body2" sx={{ mb: 1 }}>
        © {new Date().getFullYear()} Course Project
      </Typography>
      {userName && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            dispatch(saveLocation(location));
            navigate(AppRoute.CreateTicketPage);
        }}
        >
            <FormattedMessage id='create_support_ticket' />
        </Button>
      )}
    </Box>
  );
};

export default Footer;
