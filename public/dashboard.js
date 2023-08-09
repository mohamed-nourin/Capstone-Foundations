const form = document.querySelector('form')
const taskInput = document.querySelector('#task-input')
const categorySelect = document.querySelector('#category-type')
const categoryList = document.querySelector('#category-list')

function handleSubmit(e) {
    e.preventDefault()

    if (taskInput.value < 1) {
      alert('You must enter a task');
      return;
  }  

    let userPriority = document.querySelector('input[name="priority"]:checked').value;

    let body = {
      name: taskInput.value,
      priority: +userPriority,
      category_id: +categorySelect.value
  };
  
  
    axios.post('http://localhost:5555/tasks', body)
        .then(() => {
          categorySelect.value = 1
            taskInput.value = ''
            document.querySelector('#priority-one').checked = true
            getTasks()
            showAddAnimation();
        })
}


function deleteCard(id) {
    axios.delete(`http://localhost:5555/tasks/${id}`)
        .then(() => getTasks())
        .catch(err => console.log(err))
}

function getTasks() {
  categoryList.innerHTML = ''

    axios.get('http://localhost:5555/tasks/')
        .then(res => {
            res.data.forEach(elem => {
              console.log(elem)
                let categoryCard = `<div class="category-card">
                    <h2>${elem.name}, ${elem.category}</h2>
                    <h3>Priority: ${elem.priority}/5</h3>
                    <button onclick="deleteCard(${elem['task_id']})">Delete</button>
                    </div>
                `

                categoryList.innerHTML += categoryCard
            })
        })
}

function getCategories() {
  axios.get('http://localhost:5555/categories')
      .then(res => {
          res.data.forEach(category => {
              const option = document.createElement('option')
              option.setAttribute('value', category['category_id'])
              option.textContent = category.name
              categorySelect.appendChild(option)
          })
      })
}

getCategories()
getTasks()
form.addEventListener('submit', handleSubmit)
