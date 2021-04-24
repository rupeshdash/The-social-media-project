
module.exports.home = function(req,res){
    return res.render('home',{
        title:'home'
    });
}

// module.exports.profile = function(req,res){
//     return res.end("<h1>Whoa!! Youa re inside profile!!!</h1>")
// }