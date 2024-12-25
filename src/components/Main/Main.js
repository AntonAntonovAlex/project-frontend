import { Container, Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTemplatesAction } from '../../store/api-actions';
import { getTemplates } from '../../store/template-process/selectors';
import { FormattedMessage } from 'react-intl';
import { redirectToRoute } from '../../store/action';
import { AppRoute } from '../../const';

const Main = () => {
    const dispatch = useDispatch();
    const templates = useSelector(getTemplates);

    useEffect(() => {
        dispatch(getTemplatesAction());
    }, [dispatch]);

    return (
        <Container>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                <FormattedMessage id='templates_gallery' />
            </Typography>
            <Grid container spacing={3}>
                <Grid size={{xs:12, sm:6, md:3}}>
                    <Card
                        sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: 3,
                        maxWidth: 245,
                        margin: '0 auto',
                        backgroundColor: '#f5f5f5',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}
                    >
                        <CardContent
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}
                        >
                        <Typography gutterBottom variant="h6" component="div">
                            <FormattedMessage id='create_new_template' />
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <FormattedMessage id='start_designing' />
                        </Typography>
                        </CardContent>
                        <CardActions sx={{ marginTop: 'auto' }}>
                        <Button
                            size="medium"
                            variant="contained"
                            color="primary"
                            onClick={() => dispatch(redirectToRoute(AppRoute.CreateTemplates))}
                        >
                            <FormattedMessage id='create_template' />
                        </Button>
                        </CardActions>
                    </Card>
                </Grid>
                {templates.map((template) => (
                <Grid size={{xs:12, sm:6, md:3}} key={template.id}>
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
                            <FormattedMessage id='author' />: <strong>{template.authorName}</strong>
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ marginTop: 'auto' }}>
                        <Button
                            size="small"
                            color="primary"
                            onClick={() => dispatch(redirectToRoute(`/template/${template.id}`))}
                        >
                            <FormattedMessage id='view_details' />
                        </Button>
                    </CardActions>
                    </Card>
                </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Main;
