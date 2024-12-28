import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Card, CardContent, Typography, Box, Button, Tabs, Tab } from "@mui/material";
import { useState, useEffect } from "react";
import { getTemplateByIdAction, getLikesForTemplateAction, toggleLikeAction } from "../../store/api-actions";
import { getTemplate, getLikesCount, getIsUserLiked } from "../../store/template-process/selectors";
import { getAuthorizationStatus } from "../../store/user-process/selectors";
import { AuthorizationStatus } from "../../const";
import { FormattedMessage } from 'react-intl';
import TemplateComments from "../TemplateComments/TemplateComments";
import TemplateQuestions from "../TemplateQuestions/TemplateQuestions";

const TemplateDetail = () => {
    const params = useParams();
    const templateId = params.id;
    const dispatch = useDispatch();
    const template = useSelector(getTemplate);
    const likesCount = useSelector(getLikesCount);
    const isUserLiked = useSelector(getIsUserLiked);
    const authorizationStatus = useSelector(getAuthorizationStatus);
    const isAuthenticated = authorizationStatus === AuthorizationStatus.Auth;
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        dispatch(getTemplateByIdAction(templateId));
        dispatch(getLikesForTemplateAction(templateId));
    }, [dispatch, templateId]);

    if (!template) return <Typography><FormattedMessage id='loading' /></Typography>;

    const handleLike = () => {
        console.log("Liked template:", template.id);
        dispatch(toggleLikeAction(template.id));
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Card>
                <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                        {template.imageUrl && (
                            <Box mr={2}>
                                <img
                                    src={template.imageUrl}
                                    alt={template.title}
                                    style={{ width: 80, height: 80, borderRadius: "8px" }}
                                />
                            </Box>
                        )}
                        <Box>
                            <Typography variant="h5" fontWeight="bold">
                                {template.title}
                            </Typography>
                            <Typography variant="subtitle2" color="textSecondary">
                                <FormattedMessage id='by' /> {template.authorName}
                            </Typography>
                        </Box>
                    </Box>
                    <Box mb={3}>
                        <Typography variant="body1">{template.description}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mb={3}>
                        <Typography variant="body2" color="textSecondary" mr={2}>
                            <FormattedMessage id='likes' />: {likesCount}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleLike}
                            disabled={!isAuthenticated}
                        >
                            {isAuthenticated
                                ? isUserLiked 
                                    ? <FormattedMessage id='unlike' /> 
                                    : <FormattedMessage id='like' />
                                : <FormattedMessage id='login_to_likes'/>
                            }
                        </Button>
                    </Box>

                    <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                        <Tab label={<FormattedMessage id='questions' />} />
                        <Tab label={<FormattedMessage id='comments' />} />
                    </Tabs>
                    {activeTab === 0 && <TemplateQuestions template={template} isAuthenticated={isAuthenticated} />}
                    {activeTab === 1 && <TemplateComments templateId={template.id} isAuthenticated={isAuthenticated} />}
                </CardContent>
            </Card>
        </Container>
    );
};

export default TemplateDetail;
