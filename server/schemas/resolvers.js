const { AuthenticationError } = require("apollo-server-express");
const { User, Comment, Recipe} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async() => {
            return User.find().populate('recipes')
        }
    },

    Mutation: {
        addUser: async (parent,{ username, email, password }) => {
            const user = await User. create({ username, email, password});
            const token = signToken(user);
            return{ token, user }
        },

        login: async (parent, {email, password}) => {
            const user = await User. create({ username, email, password });

            if (!user) {
                throw new AuthenticationError ('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user}
        },

        addRecipe: async(parent, {recipeName, recipeDescription}, context) => {
            if (context.user) {
                const recipe = await Recipe.create({
                    recipeName,
                    recipeDescription,
                    recipeUser: context.user.username
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id},
                    { $addToSet: { recipes: recipe._id }}
                )
            }
        },

        addComment: async (parent, { recipeId, commentText}, context) => {
            if (context.user) {
                const comment = await Comment.create({
                    commentText,
                    commentAuthor: context.user.username
                });

                await recipeId.findOneAndUpdate(
                    { _id: recipeId},
                    { $addToSet: {comments: comment._id}}
                )
            }
        }
    }
}

