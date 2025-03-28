export const selectIsAuthenticated = state => state.authUser.isAuthenticated;
export const selectUser = state => state.authUser.user;
export const selectUserId = state => state.authUser.user?.id;
