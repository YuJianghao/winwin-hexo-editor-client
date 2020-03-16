const lineNumber = function (code, count) {
  let html = ''
  html += '<table><tbody><tr><td class="gutter"><pre class="hljs"><code class="hljs">'
  for (let i = 1; i < count; i++) {
    html += '<span class="hljs-meta">' + i + '</span><br>'
  }
  html += '</code></pre></td><td class="code">'
  html += code
  html += '</td></tr></tbody></table>'
  return html
}
export default lineNumber
