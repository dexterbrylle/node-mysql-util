'use strict';
/**
 * Sample config file
 */

var config;

if (process.env.NODE_ENV === 'production') {
	config = {
		mysql: {
			host: 'localhost',
			user: 'root',
			password: '',
			db: 'taxumo',
			connectionLimit: 10
		}
	};
} else if (process.env.NODE_ENV === 'development') {
	config = {
		mysql: {
			host: 'localhost',
			user: 'root',
			password: '',
			db: 'taxumo',
			connectionLimit: 10
		}
	};
} else {
	config = {
		mysql: {
			host: 'localhost',
			user: 'root',
			password: '',
			db: 'taxumo',
			connectionLimit: 10
		}
	};
}