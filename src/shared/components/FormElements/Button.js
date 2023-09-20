import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

const Button = props => {

    let className = `button button--${props.size || 'default'}`;
    className += (props.inverse ? ' button--inverse'  : '');
    className += (props.danger ? ' button--danger' : '');

    if (props.href) {
        return (
                <a
                    className={className}
                    href={props.href}
                    >
                    {props.children}
                </a>
                );
    }
    if (props.to) {

        return (
                <Link
                    to={props.to}
                    exact={props.exact}
                    className={className}
                    >
                {props.children}
                </Link>
                );
    }
    return (
            <button
                className={className}
                type={props.type}
                onClick={props.onClick}
                disabled={props.disabled}
                >
                {props.children}
            </button>
            );
};

export default Button;
