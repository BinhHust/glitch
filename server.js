const express = require('express');
const fs = require('fs');

let todos = JSON.parse(
  fs.readFileSync(`${__dirname}/db.json`)
); 

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.get('/', (request, response) => {
  response.render('index', {
    name: 'XXX'
  });
});

app.get('/todos', (req, res) => {
  // const q = req.query.q;
  // let matchedTodos;
  // if(q) {
  //    matchedTodos = todos.filter(todo => todo.name.toLowerCase().includes(q.toLowerCase())); 
  // }
  fs.writeFile(`${__dirname}/db.json`, JSON.stringify(todos), err => {
    res.render('todos/index', {
      todos: todos
    })
  })
});

app.get('/todos/create', (req, res) => {
  res.render('todos/create');
})

app.post('/todos/create', (req, res) => {
  todos.push(req.body);
  fs.writeFile(`${__dirname}/db.json`, JSON.stringify(todos), err => {
    res.redirect('/todos');
  })
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
