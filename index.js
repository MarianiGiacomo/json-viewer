
function readKeys(input) {
  try {
    const json = typeof(input) === 'string' ? JSON.parse(input) : input
  } catch (err) {
    throw err;
  }
  return (show) => jsonToHTML(input, show);
}

function jsonToHTML(input, show) {
  const display = show ? 'block' : 'none';
  const htmlArray = [`<ul style="display:${display}">`];
  for( let [key, value] of Object.entries(input)) {
    if(typeof(value) === 'object' && Object.keys(value).length > 0) {
      htmlArray.push(`<li>${key}:<span class="clickable" style="cursor: pointer">+</span>`)
      htmlArray.push(jsonToHTML(value, false));
    } else {
      let content;
      if(Array.isArray(value)) {
        content = '[]'
      } else if(typeof(value) === 'object') {
        content = '{}'
      } else {
        content = `<span class="clickable" style="cursor: pointer">+</span><pre style="display:${display}"><code>${value}</code></pre>`;
      }
      htmlArray.push(`<li>${key}: ${content}</li>`)
    }
  }
  htmlArray.push('</ul>')
  return htmlArray.flat().join('');
}

function setClickListeners() {
  const clickableElements = document.getElementsByClassName('clickable');
  Array.from(clickableElements).forEach( el => {
    el.onclick = () => {
      const node = el.nextSibling;
      if(node.style && node.style.display == 'none') {
        node.style.display = 'block';
        el.innerText = ' -'
      } else if(node.style && node.style.display == 'block') {
        node.style.display = 'none';
        el.innerText = '+'
      }
    };
  })
}

const clickableStyle = {
  cursor: 'pointer'
}
