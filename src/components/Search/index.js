import React, { Component } from "react"
import { Index } from "elasticlunr"
import { Link } from "gatsby"

import * as search from "./search.module.scss"
import * as entry from "../../templates/metric.module.scss"

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
        <div className={search.container}>
          <span>What are</span>
          <input className={search.bar} type="text" value={this.state.query} onChange={this.search} />
        </div>

        <div className={entry.container}>
          {this.state.results.map(page => (
            <div key={page.id}>
              <Link to={"/" + page.key.replace(' ', '_')}>
                <h2> &gt; {page.key}</h2>
              </Link>
              <p>{page.description}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  getOrCreateIndex = () => 
    // create elasticlunr index and hydrate with graphql query.
    this.index? this.index : Index.load(this.props.searchIndex)

  search = evt => {
    const query = evt.target.value

    if (query != '') {
      console.log('not empty');
    } else {
      console.log('empty');
    }

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