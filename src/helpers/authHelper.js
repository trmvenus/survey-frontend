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
    User: 1,
    OrgAdmin: 2,
    Researcher:3,
}

const getRoleName = (role) => {
    if (role == UserRole.Admin)
        return 'Super Manager';
    else if (role == UserRole.User)
        return 'User';
    else if (role == UserRole.OrgAdmin)
        return 'University Manager';
    else if (role == UserRole.Researcher)
        return 'Researcher';
}

export { ProtectedRoute, UserRole, getRoleName };
