import React from 'react';

const CommentList = ({comments}) => {
    return (
        <div>
            {comments.map((comment) => {

                return (

                    <textarea key = {comment._id} defaultValue={comment.commentText}></textarea>
                )
            })}

            
        </div>
        

        
    )
};
export default CommentList;