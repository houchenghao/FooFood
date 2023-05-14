const { AuthenticationError } = require("apollo-server-express");
const { User, Comment, Recipe, Order} = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

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
        },

        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const line_items = [];
              const product = await stripe.products.create({
                name: "charitable_donations",
                description: "charitable_donations",
                images: [`https://img2.baidu.com/it/u=2431494492,704089806&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500`]
              });

              const price = await stripe.prices.create({
                product: product.id,
                unit_amount: 500,
                currency: 'usd',
              });
      
              line_items.push({
                price: price.id,
                quantity: 1
              });
            const session = await stripe.checkout.sessions.create({
              payment_method_types: ['card'],
              line_items,
              mode: 'payment',
              success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
              cancel_url: `${url}/`
            });
            console.log("checkout server end")
            return { session: session.id };
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

        addRecipe: async(parent, {recipeName, recipeDescription, imageLink}, context) => {
            if (context.user) {
                const recipe = await Recipe.create({
                    recipeName,
                    recipeDescription,
                    userId: context.user._id,
                    imageLink
                });
                return recipe;
            }
        },

        updateRecipeDescription: async(parent, {recipeId, recipeDescription},context) => {
            if (context.user) {
                return Recipe.findOneAndUpdate(
                    { _id: recipeId },
                    {
                        $set: {
                            recipeDescription: recipeDescription
                        }
                    },
                    { new: true}
                )
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        removeRecipe: async(parent, {recipeId}, context) => {
            if (context.user) {
                const recipe = await Recipe.findOneAndDelete({
                    _id: recipeId,
                    userId: context.user._id
                })

                // const deletedComments = await Comment.deleteMany({ recipeId });
                return recipe
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }
}

module.exports = resolvers;