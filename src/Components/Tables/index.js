import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import './style.less'

class Tables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            thisPage: 1
        }
        this.getPage = this.getPage.bind(this);
    }

    // 跳转页
    getPage(page) {
        const { thisPage } = this.state;
        const { dispatch, location, data } = this.props;
        const { total, pageSize } = data;
        const total_ = Math.ceil(total / pageSize);
        const { query } = location;
        const pathname = location.pathname;
        // 

        if (page === '-1') {
            if (thisPage - 1 > 0) {
                page = thisPage - 1;
                dispatch(routerRedux.push({ pathname, query: { page } }));
            }
        } else if (page === '+1') {
            if (thisPage < total_) {
                page = thisPage + 1;
                dispatch(routerRedux.push({ pathname, query: { page } }));
            }
        } else {
            dispatch(routerRedux.push({ pathname, query: { page } }));
        }

        this.setState({ thisPage: page })
    }

    // 页码
    pages(pageSize, total, pageNum, thisPage) {
        const total_ = Math.ceil(total / pageSize);

        // 生成页码
        let page_ = [];
        for (var i = 1; i <= total_; i++) {
            if (i == 2 && pageNum - 3 > 1) {
                i = pageNum - 3;
            } else if (i == pageNum + 3 && pageNum + 3 < total_) {
                i = total_ - 1;
            } else {
                page_.push(i);
            }
        }

        // 补头
        if (page_[1] > page_[0] + 1) {
            page_.splice(1, 0, '...')
        }

        // 补尾
        if (page_[page_.length - 1] > page_[page_.length - 2] + 1) {
            page_.splice(page_.length - 1, 0, '...')
        }

        return (
            <ul className="pages">
                <li className={thisPage == 1 ? 'pPrev normal' : 'pPrev'} onClick={() => { thisPage != 1 && this.getPage('-1') }}><i></i></li>
                {
                    page_.map((t, i) => {
                        if (t == pageNum) {
                            return <li key={i} className='pActive'>{t}</li>
                        } else {
                            return <li key={i} onClick={() => { this.getPage(t) }}>{t}</li>
                        }

                    })
                }
                <li className={thisPage == total_ ? 'pNext normal' : 'pNext'} onClick={() => { thisPage != total_ && this.getPage('+1') }}><i></i></li>
            </ul>
        )
    }

    render() {
        const { thisPage } = this.state;
        const { columns, data, getPage } = this.props;
        const { list = [], pageSize, total, pageNum } = data;
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
                    {
                        (list && list.length > 0)
                        &&
                        <tbody>
                            {
                                list.map((t, i) => {
                                    return <tr key={i}><td>{i}</td><td>{t.name}</td><td>{t.searchName}</td><td>{t.packageType && t.packageType.name}</td></tr>
                                })
                            }
                        </tbody>
                    }
                </table>
                {
                    (list && list.length > 0)
                    &&
                    this.pages(pageSize, total, pageNum, thisPage)
                }
            </div>
        )
    }
}

function mapStateToProps({ routing, app }) {
    return { location: routing.locationBeforeTransitions };
}

export default connect(mapStateToProps)(Tables);