'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
 
var ArticleSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	like: Schema.Types.Mixed,
	comments: Schema.Types.Mixed,
	title: {
		type: String,
		default: ''
	},
    link: {
    	type: String,
    	default: ''
    },
	content: {
		type: String,
		default: ''
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Article', ArticleSchema);