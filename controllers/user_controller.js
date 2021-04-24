module.exports.profile = function(req,res){
    return res.render('user',{
        title:"user_profle",
        user:"Rupesh"
    });
};



