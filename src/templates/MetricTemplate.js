import { graphql } from "gatsby";
import React from "react"

import Sidebar from "../components/Sidebar/";
import Header from "../components/Header/"

import * as style from "../styles/global.module.scss";
import * as entry from "./metric.module.scss";

const reactStringReplace = require('react-string-replace')
const Capitalise = (input) => {

  return input.charAt(0).toUpperCase() + input.slice(1).replace('_', ' ');
}

const MetricPage = ({data}) => (
  <div className={style.wrap}>
    <Sidebar />

    <main className={style.maincontainer}>
      <Header />

      <div className={entry.headingcontainer}>
        <h2> &gt; {Capitalise(data.metric.key)}</h2>
        <p>{reactStringReplace(data.metric.description, /@(\w+)/g, (match, i) => (
          <a key={match + i} className={entry.relatedmetric} href={match}>{match.replace('_', ' ')}</a>
        ))}</p>
      </div>

      <div className={entry.relatedcontainer}>
      {data.relatedMetrics? data.relatedMetrics.edges.map(({ node }) => (
        <div className={entry.relatedrow}>
          <p>{Capitalise(node.key)}</p>
          <span>{reactStringReplace(node.description, /@(\w+)/g, (match, i) => (
            <a key={match + i} className={entry.relatedmetric} href={match}>{match.replace('_', ' ')}</a>
          ))}</span>
        </div>
      )) : ''}
      </div>
    </main>
  </div>
)

export const PageQuery = graphql`
  query MetricByName($key: String!, $relatedMetrics: [String!]!) {
    metric: metricsYaml(key: { eq: $key }) {
      key
      description
    }
    relatedMetrics: allMetricsYaml(
      filter: {key: { in: $relatedMetrics } }) {
        edges {
          node {
            key
            description
          }
        }
      }
  }
`;
export default MetricPage