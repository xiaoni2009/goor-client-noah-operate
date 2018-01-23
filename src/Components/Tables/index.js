import React, { PropTypes } from 'react';
import './style.less'

class Tables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }

    render() {
        const { columns, data } = this.props;
        console.log(data)
        return (
            <div className="dataTable">
                <table cellPadding="0" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>序号</th>
                            {
                                columns.map((t, i) => {
                                    return <th key={i}>{t.name}</th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>1</td><td>xxxxxxxxxx</td><td>xxxxxxx</td><td>xxxxxxxxxxxxxxx</td></tr>
                        <tr><td>1</td><td>xxxxxxxxxx</td><td>xxxxxxx</td><td>xxxxxxxxxxxxxxx</td></tr>
                        <tr><td>1</td><td>xxxxxxxxxx</td><td>xxxxxxx</td><td>xxxxxxxxxxxxxxx</td></tr>
                        <tr><td>1</td><td>xxxxxxxxxx</td><td>xxxxxxx</td><td>xxxxxxxxxxxxxxx</td></tr>
                        <tr><td>1</td><td>xxxxxxxxxx</td><td>xxxxxxx</td><td>xxxxxxxxxxxxxxx</td></tr>
                        <tr><td>1</td><td>xxxxxxxxxx</td><td>xxxxxxx</td><td>xxxxxxxxxxxxxxx</td></tr>
                        <tr><td>1</td><td>xxxxxxxxxx</td><td>xxxxxxx</td><td>xxxxxxxxxxxxxxx</td></tr>
                        <tr><td>1</td><td>xxxxxxxxxx</td><td>xxxxxxx</td><td>xxxxxxxxxxxxxxx</td></tr>
                        <tr><td>1</td><td>xxxxxxxxxx</td><td>xxxxxxx</td><td>xxxxxxxxxxxxxxx</td></tr>
                    </tbody>
                </table>
                <ul className="pages">
                    <li className="pPrev">{`<`}</li>
                    <li className="pActive">1</li>
                    <li>2</li>
                    <li>3</li>
                    <li className="pNext">{`>`}</li>
                </ul>
            </div>
        )
    }
}

export default Tables