import { getCurrentUser } from './Utils';

function authHeader() {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.accessToken) {
        return {
            Authorization: `${currentUser.accessToken}`,
            'Content-Type': 'application/json',
        };
    } else {
        return {};
    }
}

export default authHeader;
