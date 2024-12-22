import { useState } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useIntl, FormattedMessage } from 'react-intl';
import { Box, Button, Container, TextField, Typography, Checkbox, FormControlLabel, MenuItem, Select, InputLabel, CircularProgress, Alert } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useDispatch } from 'react-redux';
import { postTemplateAction } from '../../store/api-actions';

const CUSTOM_FIELD_TYPES = ['string', 'textarea', 'int', 'checkbox'];
const CLOUD_NAME = 'dbl5j7vpo';

const initialValues = {
  title: '',
  description: '',
  topic: '',
  imageUrl: '',
  isPublic: false,
  questions: CUSTOM_FIELD_TYPES.reduce((acc, type) => {
    acc[type] = Array(4).fill({ question: '', isActive: false });
    return acc;
  }, {}),
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required').max(100, 'Title must be at most 100 characters'),
  description: Yup.string().required('Description is required').max(500, 'Description must be at most 500 characters'),
  topic: Yup.string().required('Please select a topic'),
  imageUrl: Yup.string().url('Must be a valid URL').notRequired('Image is required'),
  questions: Yup.object().shape(
    CUSTOM_FIELD_TYPES.reduce((acc, type) => {
      acc[type] = Yup.array().of(
        Yup.object().shape({
            question: Yup.string().when('isActive', {
              is: true,
              then: (schema) => schema.required('Question is required'),
              otherwise: (schema) => schema.notRequired(),
            }),
            isActive: Yup.boolean().required('Activation status is required'),
        })
      );
      return acc;
    }, {})
  ),
});

const CreateTemplate = () => {
  const [imageUploading, setImageUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const handleImageUpload = async (file, setFieldValue) => {
    setImageUploading(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ml_default');
      const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData);
      setFieldValue('imageUrl', response.data.secure_url);
    } catch (error) {
      setUploadError('Failed to upload image. Please try again.');
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = (values) => {
    const formattedData = {
      title: values.title,
      description: values.description,
      imageUrl: values.imageUrl,
      topic: values.topic,
      isPublic: values.isPublic,
    };

    CUSTOM_FIELD_TYPES.forEach((type) => {
      values.questions[type].forEach((question, index) => {
        const questionKey = `custom_${type}${index + 1}_question`;
        const stateKey = `custom_${type}${index + 1}_state`;

        formattedData[stateKey] = question.isActive || false;
        formattedData[questionKey] = question.isActive ? question.question : null;
      });
    });
    dispatch(postTemplateAction(formattedData));
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
      <FormattedMessage id='create_new_template' />
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={true}
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
            <Form>
                <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    label="Template Title"
                    name="title"
                    onChange={(e) => {
                    handleChange(e);
                    }}
                    onBlur={handleBlur}
                    value={values.title}
                    variant="outlined"
                    margin="dense"
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                />
                <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    onChange={(e) => {
                    handleChange(e);
                    }}
                    onBlur={handleBlur}
                    value={values.description}
                    variant="outlined"
                    margin="dense"
                    multiline
                    rows={4}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                />
                <Box sx={{ mb: 2 }}>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files[0], setFieldValue)}
                    style={{ marginBottom: '10px' }}
                    />
                    {imageUploading && <CircularProgress size={24} />}
                    {uploadError && <Alert severity="error">{uploadError}</Alert>}
                    {values.imageUrl && (
                    <Typography variant="body2" color="success.main">
                        <FormattedMessage id='image_uploaded' />
                    </Typography>
                    )}
                </Box>
                <InputLabel id="topic-label">
                    <FormattedMessage id='topic' />
                </InputLabel>
                <Select
                    fullWidth
                    labelId="topic-label"
                    id="topic"
                    name="topic"
                    value={values.topic}
                    onChange={(e) => {
                    handleChange(e);
                    }}
                    variant="outlined"
                    margin="dense"
                    error={touched.topic && Boolean(errors.topic)}
                >
                    <MenuItem value="Education">Education</MenuItem>
                    <MenuItem value="Test">Test</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </Select>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="isPublic"
                        onChange={(e) => {
                        handleChange(e);
                        }}
                        checked={values.isPublic}
                    />
                    }
                    label="Make Template Public"
                />
                </Box>
                <Typography variant="h5" gutterBottom>
                    <FormattedMessage id='questions' />
                </Typography>
                {CUSTOM_FIELD_TYPES.map((type) => (
                <Box key={type} sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                    {type.charAt(0).toUpperCase() + type.slice(1)} <FormattedMessage id='questions' />
                    </Typography>
                    <FieldArray name={`questions.${type}`}>
                    {() => (
                        <Grid container spacing={2}>
                        {values.questions[type].map((question, index) => (
                            <Grid size={{ xs: 12, sm: 6 }} key={index}>
                            <TextField
                                fullWidth
                                label={`Question ${index + 1}`}
                                name={`questions.${type}[${index}].question`}
                                value={question.question}
                                onChange={(e) => {
                                handleChange(e);
                                }}
                                onBlur={handleBlur}
                                variant="outlined"
                                margin="dense"
                                error={
                                touched.questions?.[type]?.[index]?.question &&
                                Boolean(errors.questions?.[type]?.[index]?.question)
                                }
                                helperText={
                                touched.questions?.[type]?.[index]?.question &&
                                errors.questions?.[type]?.[index]?.question
                                }
                            />
                            <FormControlLabel
                                control={
                                <Checkbox
                                    name={`questions.${type}[${index}].isActive`}
                                    checked={question.isActive}
                                    onChange={(e) => {
                                    setFieldValue(
                                        `questions.${type}[${index}].isActive`,
                                        e.target.checked
                                    );
                                    }}
                                />
                                }
                                label={formatMessage({ id: 'activate_question' })}
                            />
                            </Grid>
                        ))}
                        </Grid>
                    )}
                    </FieldArray>
                </Box>
                ))}
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" color="primary" type="submit">
                    <FormattedMessage id='submit' />
                </Button>
                </Box>
            </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CreateTemplate;
