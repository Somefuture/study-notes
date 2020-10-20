import _ from 'lodash'
function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'world233'], ' ');
  element.style.background = 'yellow';

  return element;
}

document.body.appendChild(component());

// document.getElementsByTagName('h3')[0].style.color = 'red'