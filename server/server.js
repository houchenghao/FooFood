const express = require('express');
const {ApolloServer} = require('apollo-server-express')
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const multer = require('multer');
const {Image} = require('./models')


const PORT = process.env.PORT || 3001;
const app = express();

const fs = require('fs')


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app. use('/uploads', express.static('uploads'))

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

app.post('/upload', upload.single('image'), (req, res) => {
  console.log('start upload')
  console.log(req.file.filename)
  const saveImage = new Image ({
    // name:req.body.name,
    recipeId:req.body.recipeId,
    img:{
      data: fs.readFileSync('uploads/'+ req.file.filename),
      // data: fs.readFileSync('uploads/'+ req.body.recipeId),
      contentType: 'image/png'
    }
  });
  saveImage.save()
  .then(res.status(200).json({message: `uploaded image`}))
  .catch((err) => {
    console.log(err, "error has occur")
  })

});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

startApolloServer(typeDefs,resolvers);