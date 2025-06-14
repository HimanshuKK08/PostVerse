const express = require("express");
const app = express();

const userModel = require("./Models/userModel")
const postModel = require("./Models/post")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const post = require("./Models/post");

app.set("view engine", "ejs");
app.use(express.static('Public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/' , (req,res)=>{
    res.render('Register');
})
app.post('/create/user', async (req,res)=>{
    let {username, email, age, image} = req.body;
    console.log(req.body);
    
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(req.body.password, salt);
    await userModel.create({
        username,
        email,
        age,
        url: image,
        password: hash
    })
    
    let token = jwt.sign({name: username, email: email}, "POSTING");
    res.cookie("token", token);
    res.redirect('/home');
})

app.get('/login', (req,res)=>{
    res.render('login');
})
app.post('/login', async(req,res)=>{
    let {email, password} = req.body;
    let user = await userModel.findOne({email});
    if(!user){
        res.send("Email or Password is Incorrect");
    }
    let result = await bcrypt.compare(password, user.password);
    if(result){
        if(!req.cookies.token){
            let token = jwt.sign({name: user.username, email: user.email}, "POSTING");
            res.cookie("token", token);
        }
        res.redirect('/home')
    }
})

app.get('/home', istoken, async (req,res)=>{
    res.render('home', {user: req.user});
})

app.get('/post', istoken, (req,res)=>{
    // res.render('home', {username: req.user.name});
    res.render("post");
})

app.post('/allpost', async (req,res)=>{
    try {
        const posts  = await postModel.find();
        res.render('allpost', {posts});
    } catch (error) {
        console.log(error);
    }
})

async function istoken(req,res, next){
    if(!req.cookies.token){
        res.send("We don't know you, Login First");
    }else{
        const data = jwt.verify(req.cookies.token, "POSTING");
        let user= await userModel.findOne({email: data.email});
        req.user = user;
    }
    next();
}

app.get("/logout", (req,res)=>{
    res.clearCookie("token");
    res.redirect("/login");
})

app.post('/create/post', async (req,res)=>{
    let decoded = jwt.verify(req.cookies.token, "POSTING");
    let email = decoded.email;
    let user = await userModel.findOne({email});
    let post = await postModel.create({
        user: user._id,
        title: req.body.title,
        content: req.body.postdata,
    })
    user.post.push(post._id);
    user.save();
    res.redirect('/home');
})

app.post('/post/:id', async (req,res)=>{
    let posts = await postModel.find({user: req.params.id});
    
    res.render('myposts', {posts});
})

app.get('/like/:id', async (req,res)=>{
    // res.send(Hello);
    let post = await postModel.findOne({_id: req.params.id});
    let liker = jwt.verify(req.cookies.token, "POSTING");
    post.likes.push(liker.name);
    post.save();
    res.redirect('allpost');
})

app.get('/editpost/:id', async(req, res)=>{
    let postToEdit = await postModel.findOne({_id: req.params.id});
    res.render('editPage', {postToEdit});
})
app.post('/editProcess/:id', async(req,res)=>{
    let editedpost = await postModel.findOneAndUpdate({_id:req.params.id}, {title:req.body.title, content:req.body.content}, {new: true})
    console.log(editedpost);
    
    res.redirect(`/home`)
})


app.listen(3000);