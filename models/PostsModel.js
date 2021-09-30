module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        Id: String,
        Desc: String,
        Photo: Date,
        
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Posts = mongoose.model("posts", schema);
    return Posts;
  };