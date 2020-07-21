const { User } = require('./models/user')

;(async () => {
  await User.sync({'force': true});
})()
