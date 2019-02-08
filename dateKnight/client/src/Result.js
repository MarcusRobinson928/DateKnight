import React from 'react'

const Result = props => (
    <div>
        <h1>ToDos Here</h1>
        <div>
            <h3>{props.result.map(todo => 
            <div>
                <ul>
                    <li>{todo.content}<i className="fas fa-times" onClick={() => props.handleDelete(todo._id)}></i></li>
                </ul>
            </div>)}
            </h3>
        </div>
    </div>
  )

export default Result