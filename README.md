### What is this app?

  - The app is a web application that allows you to save links to your bookmarks.
  - You can add links by clicking on the "Add Link" button and entering the URL of the link you want to save.

### How the app works?

  - When you open the app, it will check if you have a user-id set in your cookies, and if you do, it will load the saved links from our database server. If you don't have an user-id, it will create a new user identifier and save it in your browser's cookies. This identifier will be used to make the ability to synchronize your saved links across devices easier without having to create a new user account.


### Process
 - [ ] Verify if the user has a user-id in their cookies.
 - [ ] If the user has a user-id, load the saved links from our database server.
 - [ ] If the user does not have a user-id, create a new user identifier and save it in their cookies.
 - [ ] Save the user-id in the database server. (This will be done only if the user add a bookmark)