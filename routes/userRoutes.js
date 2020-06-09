const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = (app) => {

  app.get(`/api/user`, async (req, res) => {
    let users = await User.find();
    return res.status(200).send(users);
  });

  app.get(`/api/user/:email`, async (req, res) => {
    const {email} = req.params;
    console.log(email)
    let user = await User.findOne({email: new RegExp('^'+email+'$', "i")}, req.body);

    return res.status(202).send({
      error: false,
      user
    })

  });

  app.post(`/api/user/signin`, async (req, res) => {
    const {email, password} = req.body;
    
    let checkUser = await User.findOne({email: new RegExp('^'+email+'$', "i"), password: new RegExp('^'+password+'$', "i") });

    return res.status(202).send({
      error: false,
      checkUser
    })

  });

  app.post(`/api/user`, async (req, res) => {
    let user = await User.create(req.body);
    return res.status(201).send({
      error: false,
      user
    })
  })

  app.put(`/api/user/:id`, async (req, res) => {
    const {id} = req.params;

    let user = await User.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
      error: false,
      user
    })

  });

  app.delete(`/api/user/:id`, async (req, res) => {
    const {id} = req.params;

    let user = await User.findByIdAndDelete(id);

    return res.status(202).send({
      error: false,
      user
    })

  })

}