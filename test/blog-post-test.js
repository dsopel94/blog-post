const chai = require('chai')
const chaiHTTP = require('chai-http')
const {app, runServer, closeServer} = require('../server')

const {BlogPosts} = require('../models')
const should = chai.should();

chai.use(chaiHTTP);

describe('BlogPosts', function() {
	
	before(function(){
		runServer();
	});

	after(function() {
		closeServer();
	});

	it('should return all blog posts', function() {
		return chai.request(app)
		.get('/posts')
		.then(function(res) {
			res.should.have.status(200);
			res.should.be.json;
			
			const expectedKeys = ['title', 'content', 'author', 'publishDate'];
			res.body.forEach(function(item) {
				item.should.be.a('object');
				item.should.include.keys(expectedKeys);
			});
		});
	});

	it('should update an existing blog post', function() {
		const newItem = { title: 'Call Me Ishmael', 
						  content: 'A Guide to Moby Dick', 
						  author: 'Herman Melville', 
						  publishDate: '1851'
						};
		return chai.request(app)
			.get('/posts')
			.then(function(res) {
			   	newItem.id = res.body[0].id;


			   	return chai.request(app)
			   	.put(`/posts/${newItem.id}`)
			   	.send(newItem);
			})

			.then(function(res) {
				console.log(res.status)
			res.should.have.status(204);
			})	
		})
	
	it('should delete posts on request', function() {
		return chai.request(app)
		.get('/posts')
		.then(function(res) {
			return chai.request(app)
			.delete('/posts/${res.body[0].id}');
		})
		.then(function(res) {
			res.should.have.status(204);
		});
	})

	it('should create a new item on POST', function() {

		const newItem = { title: 'Call Me Ishmael', 
						  content: 'A Guide to Moby Dick', 
						  author: 'Herman Melville', 
						  publishDate: '1851'
						};

		return chai.request(app)
			.post('/posts')
			.send(newItem)
			.then(function(res) {
				res.body.should.have.keys('title','content', 'id', 'author','publishDate');
				res.body.id.should.not.be.null

			})
	})

})
