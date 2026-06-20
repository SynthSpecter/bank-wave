const fs = require('node:fs')
const http = require('node:http')
const path = require('node:path')

const rootDir = path.resolve(__dirname, '..')
const port = Number.parseInt(process.env.PORT || '4173', 10)

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`)
  const requestedPath = url.pathname === '/' ? '/index.html' : url.pathname
  const filePath = path.normalize(path.join(rootDir, requestedPath))

  if (!filePath.startsWith(rootDir)) {
    sendResponse(response, 403, 'text/plain; charset=utf-8', 'Forbidden')
    return
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      sendResponse(response, 404, 'text/plain; charset=utf-8', 'Not found')
      return
    }

    const extension = path.extname(filePath).toLowerCase()
    sendResponse(
      response,
      200,
      contentTypes[extension] || 'application/octet-stream',
      content,
    )
  })
})

server.listen(port, () => {
  console.log(`bank-wave is running at http://localhost:${port}`)
})

function sendResponse(response, statusCode, contentType, body) {
  response.writeHead(statusCode, {
    'Content-Type': contentType,
    'Cache-Control': 'no-store',
  })
  response.end(body)
}
