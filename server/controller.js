module.exports = {
  getPosts: async(req, res) => {
    const db = req.app.get('db')
    const posts = await db.get_posts()

    res.status(200).send(posts)
  },

  addPost: async(req, res) => {
    const db = req.app.get('db')
    const {users_id, content} = req.body

    await db.add_post([users_id, content])

    const posts = await db.get_posts()

    res.status(200).send(posts)
  },
  
  editPost: async(req, res) => {
    const db = req.app.get('db')
    const {post_id} = req.params
    const {content} = req.body

    await db.edit_post([content, post_id])

    const posts = await db.get_posts()

    res.status(200).send(posts)
  },
  
  deletePost: async(req, res) => {
    const db = req.app.get('db')
    const {post_id} = req.params

    await db.delete_post([post_id])

    const posts = await db.get_posts()

    res.status(200).send(posts)
  }
};
