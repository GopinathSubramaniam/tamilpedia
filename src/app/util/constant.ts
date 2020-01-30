export const Constant = {
   COLLECTION: {
      PEDIAS: 'pedias',
      USERS: 'users'
   },
   SESSION_VARIABLE: {
      USER_ID: 'userId',
      DISPLAY_NAME: 'displayName'
   },
   getUserId: () => {
      return sessionStorage.getItem(Constant.SESSION_VARIABLE.USER_ID);
   },
   getDisplayName: () => {
      return sessionStorage.getItem(Constant.SESSION_VARIABLE.DISPLAY_NAME);
   }

}



