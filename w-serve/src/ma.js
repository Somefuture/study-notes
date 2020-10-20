/* exports.abc = function () {
  console.log('this is abc fn')
}

module.exports = {
  efg: function () {
    console.log('this is efg')
  },
  hd: function () {
    console.log('this is hd')
  }
} */


function a1 () {
  console.log('a1 fn')
}

function a2 () {
  console.log('a2 fn')
}

export {
  a1,
  a2
}