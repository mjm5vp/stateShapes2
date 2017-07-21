import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom"

import michiganUP from "./michiganUP.js"
import maineNorth from "./maineNorth.js"
import masonDixonLine from "./masonDixon.js"
import minnesotaNotch from "./minnesotaNotch.js"
import georgiaNorth from "./georgiaNorth.js"
import kentuckyIsland from "./kentuckyIsland.js"
import mississippiRiver from "./mississippiRiver.js"
import dc from "./dc.js"


var allFiles = [
  michiganUP,
  maineNorth,
  minnesotaNotch,
  georgiaNorth,
  kentuckyIsland,
  mississippiRiver,
  dc
]

var allVisibleLayers = []
var allLayers = []

allFiles.forEach((file, index) => {
  file.visibleLayers.forEach((visibleLayer, index) => {
    allVisibleLayers.push(visibleLayer)
  })
  file.layers.forEach((layer, index) => {
    allLayers.push(layer)
  })
})

module.exports = {
  allLayers: allLayers,
  allVisibleLayers: allVisibleLayers
}
