const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const signupRouter = require('./routes/signupRouter');
const User = require('./models/User');

require('dotenv').config({ path: 'variables.env' });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'vibey-playlist',
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  }); // allows to use local MongoDB 

app.listen(5000, function () {
  console.log('listening on 5000')
});

app.use(express.json());
app.use(cors());

// app.use('/user',user);
app.post('/auth/sign-up', signupRouter);
app.post('/auth/login', async (req, res) => {
  try {
    const userInfo = await User.findOne({ id: req.body.id });
    console.log(req.body.id);
    if (!userInfo) {
      return res.json({
        loginSuccess: false,
        messsage: "아이디에 해당하는 유저가 없습니다."
      });
    }

    const isMatch = await userInfo.comparePassword(req.body.pw);
    if (!isMatch) {
      return res.json({ loginSuccess: false, messsage: "비밀번호가 틀렸습니다." });
    }

    const user = await userInfo.generateToken();
    res.cookie("x_auth", user.token)
      .status(200)
      .json({ loginSuccess: true, userId: user._id });
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.use(express.static(path.join(__dirname, './client/build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
})
// 수정완료

//항상 가장 하단에 위치해야 하는 코드
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
})