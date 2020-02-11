export const Constant = {
   COLLECTION: {
      PEDIA_HINT: 'pedia_hint',
      PEDIA_MASTER: 'pedia_master',
      USERS: 'users',
      CATEGORIES: 'categories'
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
   },
   isLoggedIn: () => {
      return sessionStorage.hasOwnProperty(Constant.SESSION_VARIABLE.USER_ID);
   }

}



