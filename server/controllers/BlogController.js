import Blog from "../models/BlogModel.js";
import Users from "../models/userModel.js";

export const createBlog = async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const userId = req.body.user.userId;
    // Create a new blog post
    const newBlog = new Blog({
      title,
      content,
      image,
    });

    // Save the blog to the database
    await newBlog.save();
    // Find the user and push the blog ID into the user's blogs array
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        
      });
    }
    user.blogs.push(newBlog._id); // Add blog ID to user's blogs array
    await user.save();

    res.status(201).json({
      success: true,
      message: "Blog posted successfully",
      user
    });
  } catch (error) {
    console.error("Error posting blog:", error);
    res.status(500).json({
      success: false,
      message: "Failed to post blog",
      error: error.message,
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog fetched successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blog",
      error: error.message,
    });
  }
};
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      blogs
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
      error: error.message,
    });
  }
};
