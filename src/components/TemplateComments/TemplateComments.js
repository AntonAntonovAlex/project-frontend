import { Typography, Box, Button, TextField, Paper } from "@mui/material";
import { FormattedMessage, useIntl } from 'react-intl';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsAction, addCommentAction } from "../../store/api-actions";
import { getComments } from "../../store/template-process/selectors";
import { WEB_SOCKEK_URL } from "../../const";

const TemplateComments = ({ templateId, isAuthenticated }) => {
    const { formatMessage } = useIntl();
    const dispatch = useDispatch();
    const comments = useSelector(getComments);
    const [comment, setComment] = useState("");
    const [ws, setWs] = useState(null);

    useEffect(() => {
        dispatch(getCommentsAction(templateId));
        const socket = new WebSocket(WEB_SOCKEK_URL);
        setWs(socket);

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'new_comment') {
                dispatch(getCommentsAction(templateId));
            }
        };
        return () => {
            socket.close();
        };
    }, [dispatch, templateId]);

    const handleAddComment = () => {
        dispatch(addCommentAction({ templateId, text: comment }));
        setComment("");
    };

    return (
        <Box mt={3}>
            {isAuthenticated ? (
                <Box display="flex" flexDirection="column" gap={2} mb={3}>
                    <TextField
                        fullWidth
                        required
                        variant="outlined"
                        multiline
                        rows={3}
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        placeholder={formatMessage({ id: 'write_your_comment' })}
                        helperText={!comment.trim() && <FormattedMessage id='required_comment' />}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddComment}
                        disabled={!comment.trim()}
                    >
                        <FormattedMessage id='add_comments' />
                    </Button>
                </Box>
            ) : (
                <Typography variant="body2" color="textSecondary">
                    <FormattedMessage id='login_to_comment' />
                </Typography>
            )}
            <Box>
                <Typography variant="h6" gutterBottom>
                    <FormattedMessage id="comments" />
                </Typography>
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <Paper key={index} elevation={1} sx={{ padding: 2, marginBottom: 2 }}>
                            <Box display="flex" justifyContent="space-between" mb={1}>
                                <Typography variant="subtitle2">{comment.author.name}</Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {new Date(comment.createdAt).toLocaleString()}
                                </Typography>
                            </Box>
                            <Typography variant="body1">{comment.text}</Typography>
                        </Paper>
                    ))
                ) : (
                    <Typography variant="body2" color="textSecondary">
                        <FormattedMessage id="no_comments_yet" />
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default TemplateComments;
