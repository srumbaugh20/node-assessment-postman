var userData = require('./userData.json')

module.exports= {

  getUsers: function (req, res, next){

    if(req.query != {}){
      var key = Object.keys(req.query)[0]
      var value = req.query[key]
      var result = [];
      switch (key) {
        case "favorites":
          for(var i = 0; i< userData.length; i++){
            for (var j = 0; j < userData[i].favorites.length;j++){
              if (userData[i].favorites[j] == value){
                result.push(userData[i]);
              }
            }
          }
          break;
        case "age":
          for(var i = 0; i< userData.length; i++){
              if (userData[i].age < value){
                result.push(userData[i]);
              }
          }
          break;
        case "lastname":
          for(var i = 0; i< userData.length; i++){
              if (userData[i].last_name == value){
                result.push(userData[i]);
              }
          }
          break;
        case "email":
          for(var i = 0; i< userData.length; i++){
              if (userData[i].email == value){
                result.push(userData[i]);
              }
          }
          break;
      }

      if (!value){
        return res.status(200).send(userData);
      }
      if (key == "email"){
        return res.status(200).json(result[0]);
      }
      return res.status(200).json(result);

    }

  },

  getUserById: function(req, res, next){
    var id = req.params.id;

    for(var i = 0; i < userData.length; i++){
      if(userData[i].id == id){
        return res.status(200).json(userData[i])
      }
    }
    return res.status(404).json(null);

  },

  getAdmins: function(req, res, next){
    var admins = []
    for(var i = 0; i < userData.length; i++){
      if(userData[i].type == 'admin'){
        admins.push(userData[i])
      }
    }
    return res.status(200).json(admins)
  },

  getNonAdmins: function(req, res, next){
    var nonAdmins = []
    for(var i = 0; i < userData.length; i++){
      if(userData[i].type != 'admin'){
        nonAdmins.push(userData[i])
      }
    }
    return res.status(200).json(nonAdmins)
  },

  getByUserType: function(req, res, next){
    var type = req.params.type;
    var users = [];
    for(var i = 0; i < userData.length; i++){
      if(userData[i].type == type){
        users.push(userData[i])
      }
    }
    return res.status(200).json(users)

  },

  updateUser: function(req, res, next){
    var id = req.params.id;
    var info = req.body;
    console.log(info);

    for(var i = 0; i < userData.length; i++){
      if(userData[i].id == id){
        Object.assign(userData[i], info);
      }
    }
    return res.status(200).json("User updated!", userData)

  },

  newUser: function(req, res, next){
    var newUser = req.body;
    newUser.id = userData.length+1
    console.log(newUser);
    userData.push(newUser);

    return res.status(200).json("User added!", userData);

  },

  deleteUserById: function(req, res, next){
    var id = req.params.id;

    for(var i = 0; i < userData.length; i++){
      if(userData[i].id == id){
        userData.splice(userData[i],1);
         return res.status(200).json("User deleted!",userData);
      }
    }
  }



}
