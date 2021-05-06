const Post = require('../models/post');
const User = require('../models/user');
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
        User.find({},function(err,users){
            res.render('home',{
                title:'Codeial | Home',
                posts:  posts,
                all_users: users
            });
        })

        
    })
    
}

// module.exports.profile = function(req,res){
//     return res.end("<h1>Whoa!! Youa re inside profile!!!</h1>")
// }