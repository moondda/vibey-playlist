const express = require('express');
const path = require('path');
const app = express();
const cors=require('cors');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const signupRouter=require('./routes/signupRouter');


require('dotenv').config({path:'variables.env'});
app.use(bodyParser.urlencoded({extended:true}));

  mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
dbName:'vibey-playlist',
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
app.post('/auth/sign-up',signupRouter );


app.use(express.static(path.join(__dirname,'./client/build')));
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'));
})


//항상 가장 하단에 위치해야하는 코드
app.get('*',function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'));
})