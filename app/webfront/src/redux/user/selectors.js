export const selectUserProfile = state => state.user;
export const selectFollowers = state => state.user.followers.followers;
export const selectFollowees = state => state.user.followees.followees;
export const selectIsLoading = state => state.user.isLoading;
