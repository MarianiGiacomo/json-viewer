
function readKeys(input) {
  try {
    const json = typeof(input) === 'string' ? JSON.parse(input) : input
  } catch (err) {
    throw err;
  }
  return jsonToHTML(input)
}

function jsonToHTML(input) {
  const html = ['<ul>'];
  for( let [key, value] of Object.entries(input)) {
    if(typeof(value) === 'object') {
      html.push(jsonToHTML(value));
    } else {
      html.push(`<li>${key}: ${value}</li>`)
    }
  }
  html.push('</ul>')
  return html.flat().join('');
}
