const ADMIN_EMAIL_HASH = 3762047934;

const hashEmail = (value = "") => {
    const normalized = value.trim().toLowerCase();
    let hash = 5381;
    for (let i = 0; i < normalized.length; i += 1) {
        hash = ((hash << 5) + hash) + normalized.charCodeAt(i);
        hash |= 0;
    }
    return hash >>> 0;
};

export const isAdminUser = (userData) => {
    if (!userData?.email) return false;
    return hashEmail(userData.email) === ADMIN_EMAIL_HASH;
};

