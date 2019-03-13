Sample query:

```graphql
{
  books: allFile(filter: { sourceInstanceName: { eq: "books" } }) {
    nodes {
      childMarkdownRemark {
        bookMeta: frontmatter {
          title
          authors {
            authorMeta: frontmatter {
              name
              allBooksByThisAuthor: books {
                frontmatter {
                  title
                }
              }
            }
            html
          }
        }
        html
      }
    }
  }
}
```

Results:

```json
{
  "data": {
    "books": {
      "nodes": [
        {
          "childMarkdownRemark": {
            "bookMeta": {
              "title": "A Clash of Kings",
              "authors": [
                {
                  "authorMeta": {
                    "name": "Grim Reaper",
                    "allBooksByThisAuthor": [
                      {
                        "frontmatter": {
                          "title": "A Clash of Kings"
                        }
                      }
                    ]
                  },
                  "html": "<p>Very often helps George R.R. Martin to write his books.</p>"
                },
                {
                  "authorMeta": {
                    "name": "George R.R. Martin",
                    "allBooksByThisAuthor": [
                      {
                        "frontmatter": {
                          "title": "A Clash of Kings"
                        }
                      },
                      {
                        "frontmatter": {
                          "title": "A Game of Thrones"
                        }
                      }
                    ]
                  },
                  "html": "<p>Yup, he does kill a lot of book characters</p>"
                }
              ]
            },
            "html": "<p>A Clash of Kings is the second novel in A Song of Ice and Fire, an epic fantasy series by American author George R. R. Martin expected to consist of seven volumes. It was first published on 16 November 1998 in the United Kingdom, although the first United States edition did not follow until March[citation needed] 1999.</p>"
          }
        },
        {
          "childMarkdownRemark": {
            "bookMeta": {
              "title": "Dune Messiah",
              "authors": [
                {
                  "authorMeta": {
                    "name": "Frank Herbert",
                    "allBooksByThisAuthor": [
                      {
                        "frontmatter": {
                          "title": "Dune Messiah"
                        }
                      },
                      {
                        "frontmatter": {
                          "title": "Dune"
                        }
                      }
                    ]
                  },
                  "html": "<p>American science fiction writer best known for the novel Dune and its five sequels</p>"
                }
              ]
            },
            "html": "<p>Dune Messiah is a science fiction novel by American writer Frank Herbert, the second in his Dune series of six novels. It was originally serialized in Galaxy magazine in 1969.</p>"
          }
        },
        {
          "childMarkdownRemark": {
            "bookMeta": {
              "title": "Dune",
              "authors": [
                {
                  "authorMeta": {
                    "name": "Frank Herbert",
                    "allBooksByThisAuthor": [
                      {
                        "frontmatter": {
                          "title": "Dune Messiah"
                        }
                      },
                      {
                        "frontmatter": {
                          "title": "Dune"
                        }
                      }
                    ]
                  },
                  "html": "<p>American science fiction writer best known for the novel Dune and its five sequels</p>"
                }
              ]
            },
            "html": "<p>Dune is a 1965 science fiction novel by American author Frank Herbert, originally published as two separate serials in Analog magazine.</p>"
          }
        },
        {
          "childMarkdownRemark": {
            "bookMeta": {
              "title": "A Game of Thrones",
              "authors": [
                {
                  "authorMeta": {
                    "name": "George R.R. Martin",
                    "allBooksByThisAuthor": [
                      {
                        "frontmatter": {
                          "title": "A Clash of Kings"
                        }
                      },
                      {
                        "frontmatter": {
                          "title": "A Game of Thrones"
                        }
                      }
                    ]
                  },
                  "html": "<p>Yup, he does kill a lot of book characters</p>"
                }
              ]
            },
            "html": "<p>A Game of Thrones is the first novel in A Song of Ice and Fire, a series of fantasy novels by the American author George R. R. Martin. It was first published on August 1, 1996.</p>"
          }
        }
      ]
    }
  }
}
```
