
import React from 'react';
import {
    Route,
    Redirect,
} from 'react-router-dom';
import { getCurrentUser } from './Utils';
import { isAuthGuardActive } from '../constants/defaultValues';

const ProtectedRoute = ({ component: Component, roles = undefined, ...rest }) => {
    const setComponent = (props) => {
        if (isAuthGuardActive) {
            const currentUser = getCurrentUser();
            if (currentUser) {
                if (roles) {
                    if (roles.includes(currentUser.role)) {
                        return <Component {...props} />;
                    } else {
                        return <Redirect
                            to={{
                                pathname: '/unauthorized',
                                state: { from: props.location },
                            }} />
                    }
                } else {
                    return <Component {...props} />;
                }
            } else {
                return <Redirect
                    to={{
                        pathname: '/user/login',
                        state: { from: props.location },
                    }} />
            }
        } else {
            return <Component {...props} />;
        }

    }

    return (
        <Route
            {...rest}
            render={setComponent}
        />
    );
}
const UserRole = {
    Admin: 0,
    Editor: 1,
}

export { ProtectedRoute, UserRole };
