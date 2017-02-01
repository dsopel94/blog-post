const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  // the `name` property is String type and required
  title: { type: String, required: true },
  content: { type: String, required: true },
  created: { type: Date, default: Date.now },
  author: { firstName: String,
            lastName: String             
          }
      });

blogSchema.virtual('authorName').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim()});

blogSchema.methods.apiRepr = function() {

  return {
    id: this._id,
    title: this.title,
    content: this.content,
    author: this.authorName,
    created: this.created
  };
}

// note that all instance methods and virtual properties on our
// schema must be defined *before* we make the call to `.model`.
const BlogPost = mongoose.model('BlogPost', blogSchema)
module.exports = {BlogPost};