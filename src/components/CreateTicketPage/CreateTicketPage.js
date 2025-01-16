import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, MenuItem, Typography } from '@mui/material';
import { getUserName, getLocation, getUserEmail } from "../../store/user-process/selectors";
import { createTicket } from '../../store/api-actions';
import { toast } from 'react-toastify';

const TicketSchema = Yup.object().shape({
  summary: Yup.string()
    .required('Summary is required'),
  priority: Yup.string()
    .oneOf(['High', 'Medium', 'Low'], 'Invalid priority')
    .required('Priority is required'),
});

const CreateTicketPage = () => {
  const userName = useSelector(getUserName);
  const currentPageUrl = useSelector(getLocation);
  const userEmail = useSelector(getUserEmail);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const ticketData = {
        summary: values.summary,
        priority: values.priority,
        description: `Reported by: ${userName}`,
        pageUrl: currentPageUrl,
        userEmail,
        userName,
      };

    try {
        const response = await createTicket(ticketData);
        toast.success(response.message);
        toast.success(`https://antonmogilev.atlassian.net/browse/${response.data.key}`);
        resetForm();
      } catch (error) {
        toast.warn(error.message);
      } finally {
        setSubmitting(false);
      };    
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: '0 auto',
        padding: 3,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" component="h2" mb={2}>
        Create Support Ticket
      </Typography>
      <Formik
        initialValues={{
          summary: '',
          priority: '',
        }}
        validationSchema={TicketSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Field
              name="summary"
              as={TextField}
              label="Summary"
              fullWidth
              margin="normal"
              error={touched.summary && !!errors.summary}
              helperText={touched.summary && errors.summary}
            />
            <Field
              name="priority"
              as={TextField}
              select
              label="Priority"
              fullWidth
              margin="normal"
              error={touched.priority && !!errors.priority}
              helperText={touched.priority && errors.priority}
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Field>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
              sx={{ mt: 2 }}
            >
              {isSubmitting ? 'Creating Ticket...' : 'Create Ticket'}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateTicketPage;
