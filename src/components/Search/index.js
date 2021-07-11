import React, { Component } from "react"
import { Index } from "elasticlunr"
import { Link } from "gatsby"

import * as search from "./search.module.scss"

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
    }
  }

  render() {
    return (
      <div>
        <span>What are..</span>
        <input className={search.bar} type="text" value={this.state.query} onChange={this.search} />
        <ul>
          {this.state.results.map(page => (
            <li key={page.id}>
              <Link to={"/" + page.key.replace(' ', '_')}>{page.key}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  getOrCreateIndex = () => 
    // create elasticlunr index and hydrate with graphql query.
    this.index? this.index : Index.load(this.props.searchIndex)

  search = evt => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()

    this.setState({
      query,
      // query the index with search string to get list of IDs.
      results: this.index
        .search(query, { expand: true }) // accept partial search.
        // map over each ID and return the full document.
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    })
  }
}