const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key:'blahsomething',
    db:'codeial_development',
    smtp:{
        service : "gmail",
    host:'smtp.gmail.com',
    port:587,
    secure:'false',
    auth:{
        type: "login", // default
        user:'RUPESH KUMAR DASH',
        pass:'RupeshKumar@123'
    }
    },

    google_clientID:"773776627377-bp90cp9fsqtlp8t4gq4fgnjn65m7tll0.apps.googleusercontent.com",
    google_clientSecret:"hrNxiW6yq5ixe7-pThq-oMEC",
    google_callbackURL:"http://localhost:8000/users/auth/google/callback",

    jwt_secret:'codeial'
}

const production = {
    name: 'production'
    
}

module.exports = development;