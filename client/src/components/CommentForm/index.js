import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { Form, Input, Button, Typography } from 'antd';

const { Text } = Typography;

const CommentForm = ({ recipeId }) => {
  const [form] = Form.useForm();
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const onFinish = async (values) => {
    try {
      const { data } = await addComment({
        variables: {
          recipeId,
          commentText: values.commentText,
          userId: Auth.getProfile().data._id,
        },
      });

      form.resetFields();
    } catch (err) {
      console.error(err);
    }
  };

  const onValuesChange = (changedValues, allValues) => {
    const { commentText } = allValues;
    setCharacterCount(commentText.length);
  };

  return (
    <div style={{ width:'80%'}}>
      <h4 style={{ marginBottom: '10px' }} className='comment-label'>Leave your comment here</h4>

      {Auth.loggedIn() ? (
        <>
          <Text type={characterCount === 280 || error ? 'danger' : 'secondary'} >
            Character Count: {characterCount}/280
            {error && <span className="ml-2">{error.message}</span>}
          </Text>
          <Form
            form={form}
            onFinish={onFinish}
            onValuesChange={onValuesChange}
            style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}
          >
            <Form.Item name="commentText">
              <Input.TextArea
                rows={3}
                placeholder="Add your comment..."
                style={{ lineHeight: '1.5', resize: 'vertical', border: 'none', boxShadow: 'none' }}
              />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Add Comment
            </Button>
          </Form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup</Link>.
        </p>
      )}
    </div>

  );
};

export default CommentForm;
