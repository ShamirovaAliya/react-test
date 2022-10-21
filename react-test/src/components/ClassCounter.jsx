/*Создание компонентов с помощью классов*/
import React from 'react';

class ClassCounter extends React.Component {

    constructor(props) {
        super(props);
        this.state = { /*Инициализация состояния, для этого зарезервировано свойство в компоненте, которое называется state внутри него создаём поле count, это и будет наш счётчик*/
            count: 0
        }
        /*Встроенный метод bind, который позволяет зафиксировать this*/
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    increment() {
        this.setState({ count: this.state.count + 1 })
    }

    decrement() {
        this.setState({ count: this.state.count - 1 })
    }

    render() {
        return (
            <div>
                {/*Так как мы находимся внутри класса, для того чтобы обратиться к каким-то свойствам надо использовать this*/}
                <h1>{this.state.count}</h1>
                <button onClick={this.increment}>increment</button>
                <button onClick={this.decrement}>decrement</button>
            </div>
        )
    }
}

export default ClassCounter;