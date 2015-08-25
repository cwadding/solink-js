var fetch = require('node-fetch'),
	querystring = require('querystring'),
	URL = require('url'),
	_cameras = require('./objects/cameras'),
	path = require('./common/path'),
	helper = require('./common/response-handlers')

function LocationsEndpoint(ctx) {
	this.ctx = ctx
}

var _find = function(params) {
	var apiContext = this.ctx,
		url = _locationsEndPtUrl(apiContext.host),
		options = { 
			method: 'GET', 
			headers: { 'content-type': 'application/json'},
		}

		if (params)
			url = URL.resolve(url, params)	
	
		if(apiContext.token == '')
			login = apiContext.auth.login()

		console.log(url)
		return login.then(function () {
			options.headers.Authorization = 
				"Bearer " + apiContext.token
			return fetch(url, options)
				.then(_checkStatus)
				.then(_parseJSON)
				.catch(_handleError)
		})
}

var _tree = function(orgPath, depth) {
	var apiContext = this.ctx,
		url = _locationsEndPtUrl(apiContext.host),
		options = { 
			method: 'GET', 
			headers: { 'content-type': 'application/json'},
		}
		
		url = URL.resolve(url, 'tree/' + orgPath)

		if(typeof depth !== 'undefined')
			url = URL.resolve(url, '?depth=' + depth)
	
		if(apiContext.token == '')
			login = apiContext.auth.login()

		console.log(url)

		return login.then(function () {
			options.headers.Authorization = 
				"Bearer " + apiContext.token
			return fetch(url, options)
				.then(_checkStatus)
				.then(_parseJSON)
				.catch(_handleError) 
		})
}

LocationsEndpoint.prototype = {
	find: _find,
	tree: _tree,
	cameras: _cameras
};

module.exports = LocationsEndpoint