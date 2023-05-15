import React from 'react';
import { Card } from 'antd';




const CommentList = ({ comments }) => {

    console.log(comments)
    return (
        <div className='comment-container'>
            <div className='comment-card'>
                <label className='comment-label'>comments</label>
                    {comments.map((comment) => (
                        <Card key={comment._id} >
                            <div className='comment-text'>{comment.commentText}</div>
                        </Card>
                    ))}
            </div>

        </div>

    );
};

export default CommentList;