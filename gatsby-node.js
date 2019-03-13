/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
    
    type Frontmatter {
      name: String
      title: String
      author: MarkdownRemark
      books: [MarkdownRemark]
    }
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
  `)
}

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    Frontmatter: {
      author: {
        resolve: async (source, args, context) => {
          // source is frontmatter object
          const author = source.author

          // if author is not set - return null
          if (!author) {
            return null
          }

          // we run query looking for MarkdownRemark node with frontmatter.name set to author
          const authorNode = await context.nodeModel.runQuery({
            query: { filter: { frontmatter: { name: { eq: author } } } },
            type: `MarkdownRemark`,
            firstOnly: true,
          })

          return authorNode
        },
      },
      books: {
        resolve: async (source, args, context) => {
          const author = source.name

          // if author is not set - return empty array
          if (!author) {
            return []
          }

          // we run query looking for MarkdownRemark nodes with frontmatter.author.frontmatter.name set to author
          const bookNodes = await context.nodeModel.runQuery({
            query: {
              filter: {
                frontmatter: {
                  author: { frontmatter: { name: { eq: author } } },
                },
              },
            },
            type: `MarkdownRemark`,
            firstOnly: false,
          })

          return bookNodes
        },
      },
    },
  })
}
