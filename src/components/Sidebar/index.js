import React from "react"

import * as side from "./sidebar.module.scss"

const Sidebar = () => (
  <div className={side.container}>
    <div className={side.header}>
      <span className={side.title}>pokedex</span>
      <span className={side.description}>
        a lightweight, but super useful data dictionary.
      </span>
    </div>
  </div>
)

export default Sidebar
