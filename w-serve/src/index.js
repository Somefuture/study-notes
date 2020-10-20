// import { add } from "./other.js"
import './style.less'
// import './index.css'
import Iimg from './a.gif'

// const json = require("./data.json")
/* import { a1 as aaa, a2 as bbb } from './ma'

console.log( aaa, bbb) */

document.body.appendChild(component())

function component () {
  let oDiv = document.createElement('div')
  oDiv.classList.add('box')

  let oImg = new Image()
  oImg.src = Iimg
  oDiv.appendChild(oImg)

  return oDiv
}