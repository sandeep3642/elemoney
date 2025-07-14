export const getMessageName = (status) => {
    const messageName = {
        NOT_STARTED: "Not Started",
        APPLIED: "Applied"
    }
    return messageName[status] || status;
};