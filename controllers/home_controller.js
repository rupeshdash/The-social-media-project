const Post = require('../models/post');
module.exports.home = function(req,res){

    // Post.find({},function(err,posts){
    //     res.render('home',{
    //         title:'Codeial | Home',
    //         posts:  posts
    //     });
    // });

    //populate the user of each posts
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts){
        res.render('home',{
            title:'Codeial | Home',
            posts:  posts
        });
    })
    
}

// module.exports.profile = function(req,res){
//     return res.end("<h1>Whoa!! Youa re inside profile!!!</h1>")
// }