# Login 

Because the ABP project login is a two-step walk. The first step is to obtain the user name and so on through the `Session/getcurrentlogininformations`, the second step is obtains the system information through the `Abpuserconfiguration/GetAll`, therefore, In `Application.js`, `Session.init ()` is invoked to obtain session information, in the main view controller (`/app/view/main/Maincontroll.js`) to obtain the login information in the `Onmainviewrender` method.If your system does not require such complex steps, you can delete part of the code in the `application.js` that is related to the session.

Because the webApi mode is used and is authenticated by token, the login view is displayed in the `Onmainviewrender` method if token is not found in the cookie. If you are logged on and have acquired token and saved to a cookie, you can get the login information and switch to the user view.

Enter the username `admin` and password `123qwe` in the login view to login to the system.
