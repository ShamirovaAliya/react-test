/*�������� ����������� � ������� �������*/
import React from 'react';

class ClassCounter extends React.Component {

    constructor(props) {
        super(props);
        this.state = { /*������������� ���������, ��� ����� ��������������� �������� � ����������, ������� ���������� state ������ ���� ������ ���� count, ��� � ����� ��� �������*/
            count: 0
        }
        /*���������� ����� bind, ������� ��������� ������������� this*/
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
                {/*��� ��� �� ��������� ������ ������, ��� ���� ����� ���������� � �����-�� ��������� ���� ������������ this*/}
                <h1>{this.state.count}</h1>
                <button onClick={this.increment}>increment</button>
                <button onClick={this.decrement}>decrement</button>
            </div>
        )
    }
}

export default ClassCounter;