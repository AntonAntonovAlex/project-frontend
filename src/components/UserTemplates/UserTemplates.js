import { Container, Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material'; 
import Grid from '@mui/material/Grid2';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserTemplatesAction } from '../../store/api-actions';
import { getUserTemplates } from '../../store/template-process/selectors';
import { FormattedMessage } from 'react-intl';
import { redirectToRoute } from '../../store/action';
import { AppRoute } from '../../const';
import { useNavigate } from 'react-router-dom';


const UserTemplates = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userTemplates = useSelector(getUserTemplates);

    useEffect(() => {
        dispatch(getUserTemplatesAction());
    }, [dispatch]);

    return (
        <Container>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                <FormattedMessage id="my_templates" />
            </Typography>
            <Grid container spacing={3}>
                {userTemplates.map((template) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={template.id}>
                        <Card sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: 3,
                            maxWidth: 245,
                            margin: '0 auto',
                        }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={template.imageUrl || 'https://via.placeholder.com/345x140'}
                                alt={template.title}
                            />
                            <CardContent sx={{ flexGrow: 1, wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                                <Typography gutterBottom variant="h6" component="div" sx={{ wordWrap: 'break-word' }}>
                                    {template.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ wordWrap: 'break-word' }}>
                                    {template.description}
                                </Typography>
                                <Typography variant="body2" color="text.primary" marginTop={1} sx={{ wordWrap: 'break-word' }}>
                                    <FormattedMessage id="author" />: <strong>{template.authorName}</strong>
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ marginTop: 'auto' }}>
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => dispatch(redirectToRoute(`/template/${template.id}`))}
                                >
                                    <FormattedMessage id="view_details" />
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ marginTop: 4 }}
                onClick={() => navigate(AppRoute.SalesforceForm)}
            >
                <FormattedMessage id="create_salesforce_account" />
            </Button>
        </Container>
    );
};

export default UserTemplates;
