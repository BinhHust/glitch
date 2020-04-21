// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

let todos = [
  { id: 1, name: 'Di cho' },
  { id: 2, name: 'Nau com' },
  { id: 3, name: 'Hoc tren CoderX' },
];


app.get('/', (request, response) => {
  response.render('index', {
    name: 'XXX'
  });
});

app.get('/todos', (req, res) => {
  const q = req.query.q;
  let matchedTodos;
  if(q) {
     matchedTodos = todos.filter(todo => todo.name.toLowerCase().includes(q.toLowerCase())); 
  }
  res.render('todos/index', {
    todos: matchedTodos || todos
  })
});

app.get('/todos/create', (req, res) => {
  res.render('todos/create');
})

app.post('/todos/create', (req, res) => {
  todos.push(req.body);
  
  res.redirect('/todos');
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
