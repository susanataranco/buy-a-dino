export const isAdministrator = (userId: string | null | undefined) => {
    const adminIds = process.env.NEXT_PUBLIC_ADMINISTRATORS?.split(',') || [];
    return userId ? adminIds.includes(userId) : false;
};