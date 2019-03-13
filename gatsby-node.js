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
      authors: [MarkdownRemark]
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
      authors: {
        resolve: async (source, args, context) => {
          // source is frontmatter object
          const authors = source.authors

          // if author is not set - return null
          if (!authors || authors.length === 0) {
            return []
          }

          // we run query looking for MarkdownRemark node with frontmatter.name that is one of authors
          const authorNodes = await context.nodeModel.runQuery({
            query: { filter: { frontmatter: { name: { in: authors } } } },
            type: `MarkdownRemark`,
            firstOnly: false,
          })

          return authorNodes
        },
      },
      books: {
        resolve: async (source, args, context) => {
          const author = source.name

          // if author is not set - return empty array
          if (!author) {
            return []
          }

          // we run query looking for MarkdownRemark nodes with frontmatter.authors.frontmatter.name set to author
          const bookNodes = await context.nodeModel.runQuery({
            query: {
              filter: {
                frontmatter: {
                  authors: { frontmatter: { name: { eq: author } } },
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
