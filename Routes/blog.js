const blog = require("../Models/blogSchema");

const { Router } = require("express");

const blogRouter = Router();

//post
blogRouter.post("/", async (req, res) => {
  const user = new blog(req.body);
  user.save((err, success) => {
    if (err) {
      return res.status(500).send({ message: "Error Occurred" });
    }
    return res
      .status(201)
      .send({ message: "Successfully Posted", user: success["_doc"] });
  });
}),
  //get
  blogRouter.get("/", async (req, res) => {
    try {
      const { page = 1, limit = 5 } = req.query;
      const feed = await blog
        .find().limit(limit * 1).skip((page - 1) * limit);
      const total = feed.length;
      res.send({ total, feed });
    } catch (e) {
      console.log(e);
    }
  });

// get particular post with id
blogRouter.get("/:postId", async (req, res) => {
  const { postId } = req.params;
  const Blog = await blog.findOne({ _id: postId });
  const words = Blog.body
    .split(" ")
    .filter((element) => element[0] === "a" || element[0] === "A");
  return res.status(200).send({ words, Blog });
});

//update particular post with id
blogRouter.patch("/:id", async (req, res) => {
  const postId = req.params.id;
  const Blog = await blog.findOne({ _id: postId });

  // change last 3 characters to "*"
  const words = Blog.body.split(" ").map((element) => {
    if (element[0] === "a" || element[0] === "A") {
      let char = element.split("");
      (char[char.length - 1] = "*"), (char[char.length - 2] = "*"), (char[char.length - 3] = "*");
      return char.join("");
    } else {
      return element;
    }
  });

  const updatedWords = words.join(" ");
  const updatedBlog = await blog.findOneAndUpdate(
    { _id: postId },
    { body: updatedWords },
    { new: true }
  );
  return res.status(200).send({ updatedBlog });
});

module.exports = blogRouter;
