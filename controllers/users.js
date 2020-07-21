const { User } = require('../models/user')

exports.user_details = async function (req, res) {
  const user = await User.findByPk(req.params.id)

  if (user === null) {
    res.status(404).send({ 'error': 'user not found' })
    return
  }

  res.send(user)
}
exports.create_user = async function (req, res) {
  const user = await User.create(req.body, {
      fields: [
        'username',
        'firstName',
        'lastName',
        'email',
        'phone',
      ]
    }
  )
  res.status(201).send(user)
}
exports.update_user = async function (req, res) {
  const user = await User.findByPk(req.params.id)

  if (user === null) {
    res.status(404).send({ 'error': 'user not found' });
    return;
  }

  for (let key in req.body) {
    if (!req.body.hasOwnProperty(key)) {
      continue
    }

    if (user[key] === undefined) {
      continue
    }

    user[key] = req.body[key]
  }
  await user.save()

  res.send(user)
}

exports.delete_user = async function (req, res) {
  const user = await User.findByPk(req.params.id)

  if (user === null) {
    res.status(404).send({ 'error': 'user not found' });
    return;
  }

  user.destroy()

  res.send({ 'status': 'OK' })
}

