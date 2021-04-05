# How to Start Project ?
- Run npm install to install all packages.
- Run npm run start.

# Features
- Paginated list for New, Top and best stories.
- Added interfaces wherever required.
- Handling of job type and story type.
- Login/Signup - Single component to handle both views
- Integrated with Chrome's indexedDB in order to store user information and doing validation against it.
- Post Story view for posting story to IndexedDB and post successful upload moving user to new story page so that they can view the posted story (Note: since I am posting data to IndexedDB locally and fetching newstories from live API new story won't appear).
- Added a authGuard or RoutGuard if user tries to access post story route directly they get redirected to login page.
- Added CSS to design News List, login, Register and Post Stories component.
- DB service and User service stays in shared and at root level injection to share the state across application.

# Technologies
- Angular 11, IndexedDB.

# Note
- Since IndexedDB is purely used for storing purpose and not managing state via cookies or localstorage. once user refreshes the page it will logout. but user can login back with previously registered credentials since it is stored.
