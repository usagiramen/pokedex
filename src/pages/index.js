import React from "react"
import { Helmet } from "react-helmet"

import Sidebar from "../components/Sidebar/";
import Header from "../components/Header/";

import * as style from "../styles/global.module.scss";

const IndexPage = ({data}) => (
  <div className={style.wrap}>
    <Helmet>
      <title>podedex</title>
    </Helmet>
    <Sidebar />
    
    <main className={style.maincontainer}>
      <Header />
    </main>
  </div>
)

export default IndexPage
