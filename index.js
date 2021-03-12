const http = require('http');
const fs = require('fs');
const users = [];
const PORT = 3000;


const requestListener = (req, res) => {
  const { method, url } = req

  if (method === 'GET') {
    if (url === '/') {
      fs.readFile('./views/index.html', { encoding: 'utf-8' }, (err, data) => {
        if (err) {
          throw err;
        }
        res.end(data);
      })
      return
    }

    if (url === '/about.html') {
      fs.readFile('./views/about.html', { encoding: 'utf-8' }, (err, data) => {
        if (err) {
          throw err;
        }
        res.end(data);
      })
      return
    }

    if (url === '/contacts.html') {
      fs.readFile('./views/contacts.html', { encoding: 'utf-8' }, (err, data) => {
        if (err) {
          throw err;
        }
        res.end(data);
      })
      return
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