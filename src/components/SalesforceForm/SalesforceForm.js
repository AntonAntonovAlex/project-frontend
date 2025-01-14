import { Box, Button, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { sendSalesforceData } from "../../store/api-actions";
import { FormattedMessage } from 'react-intl';

const validationSchema = Yup.object({
  accountName: Yup.string().required("Account name is required"),
  phone: Yup.string().required("Phone is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const SalesforceForm = () => {
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await sendSalesforceData(values);
            toast.success(response.message);
            resetForm();
        } catch (error) {
            toast.warn(error.message);
        } finally {
            setSubmitting(false);
        }
      };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "0 auto",
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        <FormattedMessage id="salesforce_integration_form" />
      </Typography>
      <Formik
        initialValues={{
          accountName: "",
          phone: "",
          firstName: "",
          lastName: "",
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Field
                  name="accountName"
                  as={TextField}
                  label="Account Name"
                  fullWidth
                  error={touched.accountName && !!errors.accountName}
                  helperText={touched.accountName && errors.accountName}
                />
              </Grid>
              <Grid xs={12}>
                <Field
                  name="phone"
                  as={TextField}
                  label="Phone"
                  fullWidth
                  error={touched.phone && !!errors.phone}
                  helperText={touched.phone && errors.phone}
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <Field
                  name="firstName"
                  as={TextField}
                  label="First Name"
                  fullWidth
                  error={touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <Field
                  name="lastName"
                  as={TextField}
                  label="Last Name"
                  fullWidth
                  error={touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                />
              </Grid>
              <Grid xs={12}>
                <Field
                  name="email"
                  as={TextField}
                  label="Email"
                  fullWidth
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
              </Grid>
            </Grid>
            <Box sx={{ marginTop: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Create Account & Contact"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SalesforceForm;
