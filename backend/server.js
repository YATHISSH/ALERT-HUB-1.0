const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const jwt = require('jsonwebtoken');
const multer=require("multer");
const path=require("path");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true,
}));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://atchayaa135:atc1305h@cluster0.d0q3jph.mongodb.net/Personalization', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// User Schema and Model
const userSchema = new mongoose.Schema({
  fullname: String,
  pincode: Number,
  city: String,
  address: String,
  email: String,
  password: String,
  score: {
    type: Number,
    default:0
  },
  picture: {
    data: Buffer,
    contentType: String
  },
  description: String,
  issue: String,
  upvotedPosts: [
    {
      postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
      },
      upvoteDate: {
        type: Date,
        default: Date.now
      }
    }
  ]
});
const User = mongoose.model('User', userSchema);

// Define Post Schema
const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  pincode:{
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  filepath: {
    type: String,
    required: true
  },
  upvotes: {
    type: [String], // Array of user IDs who upvoted
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

postSchema.index({ content: 'text', userId: 'text' });
// Regular index for numerical field
postSchema.index({ pincode: 1 }); // 1 indicates ascending order; -1 would be descending

const Post = mongoose.model('Post', postSchema);

app.use(
  session({
    secret: "8f767ac8fe2f0564e01e2e911ffc81f87c8bd262414a581880d1b3e3dae916fb",
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://atchayaa135:atc1305h@cluster0.d0q3jph.mongodb.net/Personalization' }),
    cookie:{
      maxAge:null
    }
  })
);
//---------------------------File Storage-------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const currentDate = new Date();
    const dateString = currentDate.toISOString().replace(/:/g, '-').replace(/\./g, '-');
    const ext = path.extname(file.originalname);
    const uniqueFilename = file.fieldname + '-' + dateString + ext;
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage: storage });

// Add the login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Generate a unique token
    const token = jwt.sign({ userId: user._id }, "8f767ac8fe2f0564e01e2e911ffc81f87c8bd262414a581880d1b3e3dae916fb", {
      expiresIn: '100y' // Set expiration time as needed
    });
    req.session.email = user.email;
    req.session.fname = user.fullname;
    req.session.userId = user._id;
    req.session.pincode = user.pincode; // Store pincode
    req.session.city = user.city; // Store city
    req.session.score = user.score;

    console.log("Session:", req.session, req.session.email, req.session.fname, req.session.userId, req.session.pincode, req.session.city);

    // Send the actual token, email, fullname, pincode, and city in the response
    res.status(200).json({ token, email: user.email, fullname: user.fullname, pincode: user.pincode, city: user.city, score: user.score });

    // Send the actual token in the response
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST Endpoint for creating a new post
app.post('/api/posts', upload.single('issuepic'),async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const { userId, content, pincode, address } = req.body;
  const imagePath = req.file.filename.replace('uploads\\',"");
  console.log(imagePath);

  try {
    const newPost = new Post({ userId, content, pincode, address, filepath: imagePath
  });
    await newPost.save();
    const xp_user = await User.findOne({fullname: userId});
    xp_user.score += 5;
    await xp_user.save();
    console.log("file saved");
    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error('Error saving post to MongoDB:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Signup Route
app.post('/api/signup', async (req, res) => {
  const { fullname, email, password, confirmpassword, pincode, city } = req.body;
  console.log('Received user details:');
  console.log('Full Name:', fullname);
  console.log('Email:', email);
  console.log('Password:', password);
  console.log('Confirm Password:', confirmpassword);
  console.log('Pincode:',pincode);
  console.log('City:', city);
  
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds: 10
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errorType: 'emailExists', message: 'Email already exists' });
    }
    const newUser = new User({ fullname, email, password: hashedPassword, pincode, city });
    await newUser.save();
    console.log('User saved to MongoDB');
    res.status(201).json({ message: 'User created successfully', pincode: newUser.pincode, city: newUser.city});
  } catch (error) {
    console.error('Error saving user to MongoDB:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/posts/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("id is:",userId);
    const userPosts = await Post.find({ userId: userId }).sort({ createdAt: -1 });
    //console.log(userId, userPosts);
    res.status(200).json(userPosts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/posts/pin/:userPincode', async (req, res) => {
  try {
    const userpincode = req.params.userPincode;
    //userPincode=123456;
    console.log("pincode is:", userpincode);
    const userPosts = await Post.find({ pincode: userpincode }).sort({ createdAt: -1 });
    console.log("posts are:",userPosts);
    res.status(200).json(userPosts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/api/posts/upvote/:postId', async (req, res) => {
  console.log("req.body",req.body);
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    console.log("the post to be upvoted:",post);
    //const { userId } = req.body;

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    const post_email = req.body.email;

    console.log("req.session.email is",post_email);
    // Check if the user has already upvoted
    const hasUpvoted = post.upvotes.includes(post_email);
    console.log("hasUpvoted",hasUpvoted);
    if (hasUpvoted) {
      // If already upvoted, remove the upvote
      console.log("already upvoted");
      post.upvotes = post.upvotes.filter((email) => email !== post_email);
      await User.findOneAndUpdate(
        { email: post_email },
        { $pull: { upvotedPosts: { postId: postId } } }
      );
      res.status(200).json({ message: 'Downvoted!', upvotes: post.upvotes.length });
    } else {
      // If not upvoted, add the upvote
      post.upvotes.push(post_email);
      await User.findOneAndUpdate(
        { email: post_email },
        { $push: { upvotedPosts: { postId: postId } } }
      );
      res.status(200).json({ message: 'Upvoted!', upvotes: post.upvotes.length });
    }

    // Save the updated post
    await post.save();
  } catch (error) {
    console.error('Error upvoting/downvoting post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add the search route
app.get('/api/search', async (req, res) => {
  try {
    const { search } = req.query;
    let searchNumber;
    if (!search || search.trim() === '') {
      return res.status(200).json([]); // Return empty array when search term is empty
  }
    if (parseInt(search,10)){
      const searchNumber = parseInt(search, 10);
    }
    const searchData = await Post.find({
      $or: [
        { content: { $regex: new RegExp(search, 'i') } },
        { userId: { $regex: new RegExp(search, 'i') } },
        { pincode: { $eq: searchNumber } },
      ],
    }).sort({ createdAt: -1 });
    if (searchData.length === 0) {
      return res.status(404).json({ message: 'No posts found' });
  }
    console.log("searchData",searchData)
    res.status(200).json(searchData);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/user/upvotedPosts/:email', async (req, res) => {
  try {
    console.log("myupvotes called");
    const userEmail = req.params.email; // Extract email from query parameter
    console.log("email from myupvotes", userEmail);
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const upvotedPostIds = user.upvotedPosts.map(upvotedPost => upvotedPost.postId);

    // Fetch details of upvoted posts using the Post model
    const upvotedPosts = await Post.find({ _id: { $in: upvotedPostIds } });
    console.log("My upvotes:",upvotedPosts);

    res.status(200).json(upvotedPosts);
  } catch (error) {
    console.error('Error fetching upvoted posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});