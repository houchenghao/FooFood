import React from 'react';

const CommentList = ({comments}) => {
    return (
        
        comments.map((comment) => {
            return (
                <textarea key = {comment._id} defaultValue={comment.commentText}></textarea>
            )
        })
        
    )
};
export default CommentList;