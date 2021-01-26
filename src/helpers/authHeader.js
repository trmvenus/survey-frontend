import { getCurrentUser } from './Utils';

function authHeader(contentType='application/json') {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.accessToken) {
        return {
            Authorization: `${currentUser.accessToken}`,
            'Content-Type': contentType,
        };
    } else {
        return {};
    }
}

export default authHeader;
