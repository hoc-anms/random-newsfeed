const Post = require( "../models/Post.model" ),
  PostCategory = require( "../models/PostCategory.model" ),
  PostMeta = require( "../models/PostMeta.model" ),
  redis = require( "redis" );
  //configure redis client on port 6379
  const redisClient = redis.createClient( process.env.PORT_REDIS );
  
  
module.exports = {
  "index": async ( req, res ) => {

    const findPost = await Post.aggregate([{ "$sample": { "size": req.query.size && typeof parseInt( req.query.size ) !== NaN ? parseInt( req.query.size ) : 5  } },  {
     $lookup: {
        from: 'postcategories',
        localField: '_postCategory',
        foreignField: '_id',
        as: '_postCategory' 
      } },
      // {                     // Limit field wanna response
      //   "$project": {
      //     "_postCategory.uuid": 1
          
      // } }
    ] )
    res.send( findPost );
  },
  "getPostById": async ( req, res ) => {
    const findPost = await Post.findOne( { "_id": req.params.id } ).catch( ( e ) => console.log(e ) );

    if ( !findPost ) {
      res.send( "Not Found!" );
    }

    //add data to Redis
    await redisClient.setex(req.params.id, 3600, JSON.stringify(findPost));

    // res.send( findPost );
  }
}