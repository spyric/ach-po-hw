var express = require('express');
var router = express.Router();

// Требующиеся модули контроллеров.
var users_conteroller = require('../controllers/users');

router.get('/', users_conteroller.users_list);
router.post('/', users_conteroller.create_user);
router.get('/:id', users_conteroller.user_details);
router.put('/:id', users_conteroller.update_user);
router.delete('/', users_conteroller.delete_user);
