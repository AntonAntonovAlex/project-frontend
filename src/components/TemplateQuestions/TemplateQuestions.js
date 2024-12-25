import { Typography, Box, Button, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { FormattedMessage } from 'react-intl';
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const TemplateQuestions = ({ template, isAuthenticated }) => {

    const handleSubmitAnswers = (values) => {
        console.log("Submitted answers:", values);
    };

    const renderQuestionFields = (type, maxCount, errors, touched, values) => {
        return Array.from({ length: maxCount }, (_, index) => {
            const questionKey = `custom_${type}${index + 1}_question`;
            const question = template[questionKey];
            if (!question) return null;

            return (
                <Box key={questionKey} mb={2}>
                    <Typography variant="subtitle1">{question}</Typography>
                    {isAuthenticated ? (
                        type === "string" || type === "textarea" ? (
                            <Field
                                as={TextField}
                                fullWidth
                                name={`answers.${questionKey}`}
                                value={values.answers?.[questionKey] || ""}
                                variant="outlined"
                                multiline={type === "textarea"}
                                rows={type === "textarea" ? 4 : 1}
                                error={Boolean(errors.answers?.[questionKey] && touched.answers?.[questionKey])}
                                helperText={touched.answers?.[questionKey] && errors.answers?.[questionKey] ? errors.answers[questionKey] : null}
                            />
                        ) : type === "int" ? (
                            <Field
                                as={TextField}
                                fullWidth
                                name={`answers.${questionKey}`}
                                type="number"
                                variant="outlined"
                                value={values.answers?.[questionKey] || ""}
                                inputProps={{ min: 0 }}
                                error={Boolean(errors.answers?.[questionKey] && touched.answers?.[questionKey])}
                                helperText={touched.answers?.[questionKey] && errors.answers?.[questionKey] ? errors.answers[questionKey] : null}
                            />
                        ) : type === "checkbox" ? (
                            <FormControlLabel
                                control={
                                    <Field
                                        type="checkbox"
                                        as={Checkbox}
                                        name={`answers.${questionKey}`}
                                        checked={!!values.answers?.[questionKey]}
                                    />
                                }
                                label="Answer"
                            />
                        ) : null
                    ) : (
                        <Typography variant="body2" color="textSecondary">
                            <FormattedMessage id='login_to_answer' />
                        </Typography>
                    )}
                </Box>
            );
        });
    };

    const initialValues = {
        answers: Object.keys(template)
            .filter(key => key.startsWith("custom_") && template[key])
            .reduce((acc, key) => {
                if (key.includes("checkbox")) {
                    acc[key] = false;
                } else {
                    acc[key] = "";
                }
                return acc;
            }, {})
    };

    const validationSchema = Yup.object().shape({
        answers: Yup.object().shape(
            Object.keys(template)
                .filter(key => key.startsWith("custom_") && template[key])
                .reduce((acc, key) => {
                    if (key.includes("checkbox")) {
                        acc[key] = Yup.boolean();
                    } else if (key.includes("int")) {
                        acc[key] = Yup.string()
                            .required(<FormattedMessage id="required" />)
                            .matches(/^\d+$/, <FormattedMessage id="required" />);
                    } else {
                        acc[key] = Yup.string().required(<FormattedMessage id="required" />);
                    }
                    return acc;
                }, {})
        )
    });

    return (
        <Box mb={3}>
            <Typography variant="h6" gutterBottom>
                <FormattedMessage id='questions' />
            </Typography>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmitAnswers}
                enableReinitialize
                validateOnChange={false}
                validateOnBlur={true}
            >
                {({ errors, touched, values }) => (
                    <Form>
                        {["string", "textarea", "int", "checkbox"].map((type) => (
                            <Box key={type}>{renderQuestionFields(type, 4, errors, touched, values)}</Box>
                        ))}
                        {isAuthenticated && (
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                            >
                                <FormattedMessage id='submit_answers' />
                            </Button>
                        )}
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default TemplateQuestions;
