const { node } = require("prop-types");

module.exports = {
  siteMetadata: {
    title: "pokedex",
    description: "a data dictionary.",
    siteUrl: "https://norweijian.com"
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require("sass"),
      }
    },
    {
      resolve: `gatsby-transformer-yaml`,
      options:{
        typeName: ({ node }) => node.name.charAt(0).toUpperCase() + node.name.slice(1) + `Yaml`,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/data/`,
        name: `data`,
      }
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        fields: ['key'],
        resolvers: {
          MetricsYaml: {
            key: node => node.key.replace('_', ' '),
            description: node => node.description,
          }
        }
      }
    }
  ],
};
