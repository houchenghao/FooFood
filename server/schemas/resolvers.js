const { AuthenticationError } = require("apollo-server-express");
const { User, Comment, Recipe} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async() => {
            const users = await User.find();
            return users;
        },
        recipes: async () => {
            return await Recipe.find().populate('userId');
        },
        recipe: async(parent, {recipeId}) => {
            const recipe = await Recipe.findOne({_id: recipeId}).populate('userId');
            return recipe;
        },
        comments: async () => {
            const comments = await Comment.find().populate('userId').populate('recipeId');
            return comments;
        },

        recipeComment: async(parent, {recipeId}) => {
            const comments = await Comment.find ({recipeId: recipeId}).populate('recipeId');
            return comments;
        },
        
        meRecipes: async(parent, args, context) => {
            if (context.user) {
                return await Recipe.find({ userId: context.user._id }).populate('userId')
            }
        },

        userRecipes: async(parent, {username}, context) => {
            if (context.user) {
                const user = await User.findOne({username});
                if (!user){
                    return null;
                }
                const userRecipes = await Recipe.find({ userId: user._id }).populate('userId');
                return userRecipes;
            }
        }

    },

    Mutation: {
        addUser: async (parent,{ username, email, password }) => {
            const user = await User. create({ username, email, password});
            const token = signToken(user);
            return{ token, user }
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },



        addComment: async (parent, { recipeId, commentText}, context) => {
            if (context.user) {
                const comment = await Comment.create({
                    recipeId,
                    commentText,
                    userId: context.user._id,
                });
                return comment;
            };
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


    }
}

module.exports = resolvers;