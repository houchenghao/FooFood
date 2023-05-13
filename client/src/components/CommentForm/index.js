// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useMutation } from '@apollo/client';

// import { ADD_COMMENT } from '../../utils/mutations';

// import Auth from '../../utils/auth';

// const CommentForm = ({ recipeId }) => {
//   const [commentText, setCommentText] = useState('');
//   const [characterCount, setCharacterCount] = useState(0);

//   const [addComment, { error }] = useMutation(ADD_COMMENT);

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();


//     console.log (commentText)

//     try {
//       const { data } = await addComment({
//         variables: {
//           recipeId,
//           commentText,
//           userId: Auth.getProfile().data._id,
//         },
//       });

//       setCommentText('');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     if (name === 'commentText' && value.length <= 280) {
//       setCommentText(value);
//       setCharacterCount(value.length);
//     }
//   };

//   return (
//     <div>
//       <h4>Leave your comment here</h4>

//       {Auth.loggedIn() ? (
//         <>
//           <p
//             className={`m-0 ${
//               characterCount === 280 || error ? 'text-danger' : ''
//             }`}
//           >
//             Character Count: {characterCount}/280
//             {error && <span className="ml-2">{error.message}</span>}
//           </p>
//           <form
//             className="flex-row justify-center justify-space-between-md align-center"
//             onSubmit={handleFormSubmit}
//           >
//             <div className="col-12 col-lg-9">
//               <textarea
//                 name="commentText"
//                 placeholder="Add your comment..."
//                 value={commentText}
//                 className="form-input w-100"
//                 style={{ lineHeight: '1.5', resize: 'vertical' }}
//                 onChange={handleChange}
//               ></textarea>
//             </div>

//             <div className="col-12 col-lg-3">
//               <button className="btn btn-primary btn-block py-3" type="submit">
//                 Add Comment
//               </button>
//             </div>
//           </form>
//         </>
//       ) : (
//         <p>
//           You need to be logged in to share your thoughts. Please{' '}
//           <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
//         </p>
//       )}
//     </div>
//   );
// };

// export default CommentForm;

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
    <div>
      <h4 style={{ marginBottom: '10px' }}>Leave your comment here</h4>

      {Auth.loggedIn() ? (
        <>
          <Text type={characterCount === 280 || error ? 'danger' : 'secondary'}>
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
