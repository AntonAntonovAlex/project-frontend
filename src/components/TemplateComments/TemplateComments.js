import { Typography, Box, Button, TextField } from "@mui/material";
import { FormattedMessage, useIntl } from 'react-intl';
import { useState } from "react";

const TemplateComments = ({ isAuthenticated }) => {
    const { formatMessage } = useIntl();
    const [comment, setComment] = useState("");

    const handleAddComment = () => {
        console.log("Add comment:", comment);
        setComment("");
    };

    return (
        <Box mt={3}>
            {isAuthenticated ? (
                <Box display="flex" flexDirection="column" gap={2}>
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
        </Box>
    );
};

export default TemplateComments;
