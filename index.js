const http = require('http');
const fs = require('fs').promises;
const users = [];
const PORT = 3000;


const requestListener = async (req, res) => {
  const { method, url } = req

  if (method === 'GET') {
    if (url === '/') {
      const data = await fs.readFile('./views/index.html', 'utf-8')
      return res.end(data)
    }

    if (url === '/about.html') {
      const data = await fs.readFile('./views/about.html', 'utf-8')
      return res.end(data)
    }

    if (url === '/contacts.html') {
      const data = await fs.readFile('./views/contacts.html', 'utf-8')
      return res.end(data)
    }
  }


  if (method === 'POST') {
    if (url === '/create-user') {
      let jsonString = ''
      req.on('data', (chunk) => {
        jsonString += chunk;
      })
      req.on('end', () => {
        const user = JSON.parse(jsonString)
        delete user.password
        user.is = Date.now()

        users.push(user)
        console.log(user)
        res.end(JSON.stringify(user))
      })
      return
    }
  }
}

const server = http.createServer(requestListener);

server.listen(PORT)