const express = require('express');
const controllerName = require('@controllers/controllerName.controller');

const router = express.Router();

router.get('/', controllerName.get);
router.post('/', controllerName.store);
router.get('/:id', controllerName.view);
router.put('/:id', controllerName.update);
router.delete('/:id', controllerName.remove);

module.exports = router;
