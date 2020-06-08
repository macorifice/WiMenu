const mongoose = require('mongoose');
const Menu = mongoose.model('menus');

module.exports = (app) => {

  app.get(`/api/menu`, async (req, res) => {
    let menus = await Menu.find();
    return res.status(200).send(menus);
  });

  app.post(`/api/menu`, async (req, res) => {
    let menu = await Menu.create(req.body);
    return res.status(201).send({
      error: false,
      menu
    })
  })

  app.put(`/api/menu/:id`, async (req, res) => {
    const {id} = req.params;

    let menu = await Menu.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
      error: false,
      menu
    })

  });

  app.delete(`/api/menu/:id`, async (req, res) => {
    const {id} = req.params;

    let menu = await Menu.findByIdAndDelete(id);

    return res.status(202).send({
      error: false,
      menu
    })

  })

}