const express = require('express');
const bodyParser = require('body-parser');
const userCtrl = require('./usersCtrl');
const port = 3000;

const app = express();

app.use(bodyParser.json());

app.get('/api/users', userCtrl.getUsers);
app.get('/api/users/:id', userCtrl.getUserById);
app.get('/api/admins', userCtrl.getAdmins);
app.get('/api/nonadmins', userCtrl.getNonAdmins);
app.get('/api/user_type/:type', userCtrl.getByUserType);
app.put('/api/users/:id', userCtrl.updateUser);
app.post('/api/users', userCtrl.newUser);
app.delete('/api/users/:id', userCtrl.deleteUserById);








app.listen(port, function () {
  console.log('Listening on port', port);
});
