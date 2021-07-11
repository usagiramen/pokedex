import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Search from "../Search/"

import * as head from "./header.module.scss"

const Header = () => (
  <StaticQuery
    query={graphql`
      query SearchIndexQuery {
        siteSearchIndex {
          index
        }
      }
    `}
    
    render={data => (
      <header className={head.container}>
        <Search searchIndex={data.siteSearchIndex.index} />
      </header>
    )}
  />
)

export default Header