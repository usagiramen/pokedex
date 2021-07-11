import React from "react"
import { Helmet } from "react-helmet"

import Sidebar from "../components/Sidebar/";

import * as style from "../styles/global.module.scss";

const IndexPage = ({data}) => (
  <div className={style.wrap}>
    <Helmet>
      <title>podedex</title>
    </Helmet>
    <Sidebar />
    
    <main className={style.maincontainer}>
    </main>
  </div>
)

// export const pageQuery = graphql`
//   query EntryByName($name: String!, $relatedEntries: [String!]!) {
//     entry: entryYaml(name: { eq: $name } }) {
//       name
//     }
//     relatedEntries: allEntriesYaml(
//       filter: { name: { in: $relatedEntries } } }
//     ) {
//       edges {
//         node {
//           name
//         }
//       }
//     }
//   }
// `;
export default IndexPage
