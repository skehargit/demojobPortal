import mongoose, { Schema } from "mongoose";

// Define the schema for a blog post
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false, // Image is optional in case you want text-only blogs
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Create a Blog model from the schema
const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
