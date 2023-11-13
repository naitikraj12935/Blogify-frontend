import React from 'react'
import Banner from '../Component/banner/banner'
import Categories from './Categories'
import { Grid } from '@mui/material'
import Posts from './Posts/posts'
export default function Home() {
  return (
    <div>
      <Banner/>
      <Grid container>
        <Grid container item lg={2} sm={2} xs={12}>
        <Categories/>
        </Grid>
        <Grid container item lg={10} sm={10} xs={12}>
          <Posts/>
        </Grid>
      </Grid>
      
    </div>
  )
}
