'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var items = require('../../app/controllers/items.server.controller');

	// Items Routes
	app.route('/items')
		.get(users.requiresLogin, items.list)
		.post(users.requiresLogin, users.isAdmin, items.create);

	app.route('/items/:itemId')
		.get(users.requiresLogin, items.read)
		.put(users.requiresLogin, users.isAdmin,items.hasAuthorization, items.update)
		.delete(users.requiresLogin, users.isAdmin, items.hasAuthorization, items.delete);

	// Finish by binding the Item middleware
	app.param('itemId', items.itemByID);
};
