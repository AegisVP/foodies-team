export const selectUserProfile = state => state.user;
export const selectFollowers = state => state.followers.followers;
export const selectFollowees = state => state.followees.followees;
export const selectIsLoading = state => state.user.isLoading;
