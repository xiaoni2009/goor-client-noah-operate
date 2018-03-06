// https://github.com/GA-MO/react-confirm-alert

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render, unmountComponentAtNode } from 'react-dom';

import '../style.less';

export default class ReactConfirmAlert extends Component {
    static propTypes = {
        title: PropTypes.string,
        message: PropTypes.string,
        confirmLabel: PropTypes.string,
        cancelLabel: PropTypes.string,
        onConfirm: PropTypes.func,
        onCancel: PropTypes.func,
        children: PropTypes.node
    };

    static defaultProps = {
        title: '',
        message: '',
        childrenElement: () => null,
        confirmLabel: '',
        cancelLabel: '',
        onConfirm: () => null,
        onCancel: () => null
    };

    onClickConfirm = () => {
        const self = this;
        this.props.onConfirm((bool)=>{
            if(bool){
                self.close();
            }
        });
    };

    onClickCancel = () => {
        this.props.onCancel();
        this.close();
    };

    close = () => {
        removeElementReconfirm();
        removeSVGBlurReconfirm();
    };

    render() {
        const { title = '', message = '', confirmLabel = '', cancelLabel = '', childrenElement } = this.props;

        return (
            <div className="react-confirm-alert-overlay">
                <div className="react-confirm-alert">
                    <div className="confirmCo">
                        <div className="cftit">
                            {title && <h1 dangerouslySetInnerHTML={{__html:title}}></h1>}
                            {message && <h3>{message}</h3>}
                        </div>
                        {childrenElement()}
                    </div>
                    <div className="react-confirm-alert-button-group">
                        {cancelLabel && <button className="modals_cancel" onClick={this.onClickCancel}>{cancelLabel}</button>}
                        {confirmLabel && <button className="modals_OK" onClick={this.onClickConfirm}>{confirmLabel}</button>}
                    </div>
                </div>
            </div>
        );
    }
}

function createSVGBlurReconfirm() {
    const svgNS = 'http://www.w3.org/2000/svg';
    const feGaussianBlur = document.createElementNS(svgNS, 'feGaussianBlur');
    feGaussianBlur.setAttribute('stdDeviation', '0.7');

    const filter = document.createElementNS(svgNS, 'filter');
    filter.setAttribute('id', 'gaussian-blur');
    filter.appendChild(feGaussianBlur);

    const svgElem = document.createElementNS(svgNS, 'svg');
    svgElem.setAttribute('id', 'react-confirm-alert-firm-svg');
    svgElem.setAttribute('class', 'react-confirm-alert-svg');
    svgElem.appendChild(filter);

    document.body.appendChild(svgElem);
}

function removeSVGBlurReconfirm() {
    const svg = document.getElementById('react-confirm-alert-firm-svg');
    svg.parentNode.removeChild(svg);
    document.body.children[0].classList.remove('react-confirm-alert-blur');
}

function createElementReconfirm(properties) {
    document.body.children[0].classList.add('react-confirm-alert-blur');
    const divTarget = document.createElement('div');
    divTarget.id = 'react-confirm-alert';
    document.body.appendChild(divTarget);
    render(<ReactConfirmAlert {...properties} />, divTarget);
}

function removeElementReconfirm() {
    const target = document.getElementById('react-confirm-alert');
    unmountComponentAtNode(target);
    target.parentNode.removeChild(target);
}

export function confirmAlert(properties) {
    createSVGBlurReconfirm();
    createElementReconfirm(properties);
}