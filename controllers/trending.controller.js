const Post = require( "../models/Post.model" ),
  PostCategory = require( "../models/PostCategory.model" ),
  PostMeta = require( "../models/PostMeta.model" );

module.exports = {
  "topTrendNewsFeed": async ( req, res ) => {
    
  },
  "upvote": async ( req, res ) => {
    const findPost = await Post.findById( req.query.id );

    if ( findPost ) {
      
    }
  }
}