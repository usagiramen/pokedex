exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const metricTemplate = require.resolve(`./src/templates/MetricTemplate.js`);

  const result = await graphql(`
    {
      metrics: allMetricsYaml(limit: 1000) {
        edges {
          node {
            key
            related
          }
        }
      }
    }
  `,);
  if (result.errors) {
    throw result.errors;
  }

  // create entry page.
  result.data.metrics.edges.forEach((metric) => {
    createPage({
      path: `/${metric.node.key}`,
      component: metricTemplate,
      context: {
        key: metric.node.key,
        relatedMetrics: metric.node.related? metric.node.related : [],
      },
    });
  });
};
