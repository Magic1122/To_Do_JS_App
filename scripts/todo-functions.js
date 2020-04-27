'use strict'

// Read the Data from local storage

const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')
    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        return []
    }
}

// Save todos to localStorage

const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Remove a todo

const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// Toggle completed value

const toggleCompleted = (id) => {
    const todoToToggle = todos.find((todo) => todo.id === id)

    if (todoToToggle) {
        todoToToggle.completed = !todoToToggle.completed
    }
}

// Generate the DOM for a todo

const generateTodoDOM = (todo) => {
    // Creating the elements
    const todoEl = document.createElement('label')
    const container = document.createElement('div')
    const checkBox = document.createElement('input')
    const textEl = document.createElement('span')
    const button = document.createElement('button')
    // Setting up the elements
    checkBox.setAttribute('type', 'checkbox')
    checkBox.checked = todo.completed
    textEl.textContent = todo.text
    button.textContent = 'remove'
    button.classList.add('button', 'button--text')
    todoEl.classList.add('list-item')
    container.classList.add('list-item__container')
    // Adding eventlisteners
    button.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    checkBox.addEventListener('change', () => {
        toggleCompleted(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    // Appending the elements
    container.appendChild(checkBox)
    container.appendChild(textEl)
    todoEl.appendChild(container)
    todoEl.appendChild(button)
    return todoEl
}

// Generate summary DOM

const generateSummaryDOM = (getThingsToDo) => {
    const todoOrTodos = getThingsToDo.length === 1 ? 'todo' : 'todos'
    const todosLeft = document.createElement('h2')
    todosLeft.classList.add('list-title')
    todosLeft.textContent = `You have ${getThingsToDo.length} ${todoOrTodos} left.`
    return todosLeft
}

// Render TODOS

const renderTodos = (todos, filters) => {
    const todosEl = document.querySelector('#todos')
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })

    const getThingsToDo = filteredTodos.filter((todo) => !todo.completed)

    
    todosEl.innerHTML = ''
    todosEl.appendChild(generateSummaryDOM(getThingsToDo))


    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todosEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const p = document.createElement('p')
        p.classList.add('empty-message')
        p.innerText = 'No to-dos to show!'
        todosEl.appendChild(p)
    }
}
