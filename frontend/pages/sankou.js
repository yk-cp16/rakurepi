import React, { useState, useEffect } from 'react';

function TodoLists() {

    const initialState = [
        {
            name: 'azukiさん　',
            task: 'Learn vue.js',
            isCompleted: false
        },
        {
            name: 'mitarasiさん　',
            task: 'Learn React Hook',
            isCompleted: false
        },
        {
            name: 'ancoさん　',
            task: 'Learn Gatsby.js',
            isCompleted: false
        },
    ]

    useEffect(async () => {
        const res = await fetch('http://127.0.0.1:8000/api/recipe');
        const json = await res.json();
        // console.log('res', res);
        // console.log('json', json);
        // console.log('json.recipes', json.recipes);
        const recipes = json.recipes.data;
        setRecipes(recipes);
    }, []);

    // console.log(todos);をしたい変数にされない？
    const [todos, setTodo] = useState(initialState);
    // console.log(setTodo);
    const [name, setName] = useState('');

    const [task, setTask] = useState('');
    // console.log(task);
    const [recipes, setRecipes] = useState([]);



    // 入力された文字列をnameにセットしている
    // setNameはnameにセットするメソッド
    const handleNewName = (event) => {
        setName(event.target.value)
    }

    const handleNewTask = (event) => {
        setTask(event.target.value)
    }

    const handleSubmit = (event) => {
        // console.log('handleSubmit');
        event.preventDefault()
        if (name === '' || task === '') return
        setTodo(todos => [...todos, { name, task, isCompleted: false }])
        setTask('')
    }


    const handleSubmitButton = (event) => {
        // console.log('handleSubmit');
        event.preventDefault()
        if (name === '' || task === '') return
        setTodo(todos => [...todos, { name, task, isCompleted: false }])
        setTask('')
    }



    // todo.isCompleted = !todo.isCompletedの理解できていない
    // クリックされたやつのindexと等しいタスクだけを反転させて加工して返す
    // それ以外のindexと同じクリックしたtodo以外はそのままreturnして返す
    const handleUpdateTask = index => {
        let newTodos = todos.map((todo, todoIndex) => {
            // console.log(map.get('todo'));
            if (todoIndex === index) {
                todo.isCompleted = !todo.isCompleted
            }
            return todo;
        })
        setTodo(newTodos);
    }

    // const countCompletedTask = () => {
    //     const completedTask = todos.filter((todo) => {
    //         return todo.isCompleted;
    //     });
    //     return completedTask.length;
    // };

    // const completedTaskCount = todos.filter((todo) => {
    //     return todo.isCompleted;
    // }).length;

    const completedTaskCount = todos.filter(todo => todo.isCompleted).length;


    // const countUnCompletedTask = () => {
    //     const completedTask = todos.filter((todo) => {
    //         return !todo.isCompleted;
    //     });
    //     return completedTask.length;
    // };

    // const unCompletedTaskCount = todos.filter((todo) => {
    //     return !todo.isCompleted;
    // }).length;

    const unCompletedTaskCount = todos.filter(todo => !todo.isCompleted).length;


    useEffect(() => {
        console.log('useEffect');
    }, [name]);

    // console.log('hoge');
    return (
        <div>
            <h1>ToDo Lists</h1>
            <p>完了済みタスク数: {completedTaskCount}</p>
            <p>未完了タスク数: {unCompletedTaskCount}</p>
            <form onSubmit={handleSubmit}>
                <label>
                    名前：<input type="text" value={name} placeholder="名前を入力する" onChange={handleNewName} />
                </label>
                <label>
                    タスク追加: <input type="text" value={task} placeholder="タスクを入力する" onChange={handleNewTask} />
                </label>
                <button type="submit">追加</button>
            </form>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}
                        style={todo.isCompleted === true ? { textDecorationLine: 'line-through', color: 'green' } : {}}
                    >
                        {todo.name}
                        {todo.task}
                        <span onClick={() => handleUpdateTask(index)}>→タスク完了する</span>

                    </li>
                ))}
            </ul>

            {recipes.map((recipe, index) => (
                <div key={index}>
                    {recipe.title}
                </div>
            ))}
        </div >
    );
}

export default TodoLists;
