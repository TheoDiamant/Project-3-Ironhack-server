const { Schema, model } = require("mongoose");


const productSchema = new Schema(
    {
      img:  [
        {
          type: String
        },
      ],
      
      title: {
        type: String,
        required: [true, "Title is required."],
      },
      description: {
        type: String,
        required: [true, "Description is required."],
      },
      price: {
        type: Number,
        required: [true, "price is required."],
      },
      state: {
        type: String,
        
      },
      brand: {
        type: String,
        
      },
      size: {
        type: String,
        
      },
      color: {
        type: String,
        
      },
      country: {
        type: String,
        
      },
      category: {
        type: String,
        enum: ["Men", "Women", "Home", "Baby", "Accessories"],
        required: [true, "Category is required."],
      },

      review: [{type: Schema.Types.ObjectId, ref: "Review"}],
      user: [{type: Schema.Types.ObjectId, ref: "User"}],
      offer: [{type: Schema.Types.ObjectId, ref: "Offer"}],
      like: [{type: Schema.Types.ObjectId, ref: "Like"}],
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
  );
  
  const Product = model("Product", productSchema);
  
  module.exports = Product;
  