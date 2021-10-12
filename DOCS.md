# User Management Service

# Description
The User Management Frontent allows admin users to insert new users into the database, as well as
listing all available users and view specific ones.

# Running instructions
To run the application, just execute the following command:
#ng serve --open

To test the application, just execute the following command:
#ng test

# Key Features

* Componentization
* Lazy Loading of Modules
* Singleton Service
* Auth Guard
* Http Generic Service
* Htto Interception
* Loading Component
* Messaging Component
* Modal Component
* Karma/Jasmine Tests
* JWT Decode Service

# The Software Architecture

* In order to save memory loading the routes necessary for application, a lazy loading strategy was
decide for all routes other than the Login, Home and Unauthorized, since these are expected to be
most used and should be available on the go. Furthermore, singleton services using the Injectable
providedIn root were used to store the session JWT, as the token becomes hidden and, therefore,
more secure. An GenericHttp class was build along with a request interceptor, so header parameters
are set automatically.

* The application consists of the following routes:

    * [/login] - The first page of the application, the name and password are checked against the backend
    database. If the authentication is confirmed, the user receives a token which is stored in the
    JWT singleton service

    * [/home] - The first page available for a logged in user, there are no claim restrictions whatsoever

    * [/user] - The user managment page consisting of a listing of all the users currently in the backend
    database. The user is also able to sort the table is he so wishes
    
    * [/user/add] - This page allows for new users to be added to the database
    
    * [/user/view] - A specific user select in the /user page can be view here

    * [/unauthorized] - Users who attempt to access a prohibited route are redirected to this page

* Each route is a module consisting of:

    * Components - Contains the HTML/CSS page along with all the logic necessary to present the page data

    * Models - The presentation of the data displayed in the Components

    * Services - Bridge the communcation between Frontend and Backend

    * Routing Module - All the routes are listed here

    * Module - Contains all dependencies necessary to open a specific Component

* The Shared Module contains many useful classes to help productivity, listed below:

    * The alert component - Displays Success/Warning/Error messages at the top right of the page

    * Checkbox - Displays a number of option to be selected by the user, it can be multi-selection
    enabled.

    * Confirmation - A modal capable of handling simple Yes/No questions, a Subject can be listened
    to whenever a user chooses one of the options.

    * Loading - A spinning circle indication a service is being requested from the backend

    * Login Widget - A box with information about the user and the option of logging out of the application,
    resulting in the loss of the JWT token

    * Table - Pretty straightforward, used to list items according to their column data, also enabled
    the view option for a specific item in the table

    * Auth Guard - Holds logic for matching the logged user claims agaist the claims allowed by a route

    * Generic HTTP Interceptor - Intercepts http requests and adds the JWT token as a Bearer Authentication

    * Generic HTTP - Contains generic calls to HTTP Rest requests (GET, POST, PUT, DELETE), used by injected
    component services

    * Alert Service - Singleton service capable of creating a Subject capable of handling Success/Warning/Error
    messages for other components to listen to

    * Confirmation Service - Singleton service capable of creating a Subject capable of handling Yes/No messages
    for other components to listen to

    * Jwt Service - Singleton service capable of storing a JWT token. This method is preffered over the browser
    cache as users are unable to fetch, and therefore steal, the token content

    * Alert Service - Singleton service capable of creating a Subject capable of handling Push/Pop loading requests
    so the user is informed data is being requested from the backend service

# Tests
    
    In order to ensure the quality and consistency of the code, unit tests were created covering the
    Home, User and Manage User components, as these hold the more complex and sensitive logic. In order to test
    differente cenarios, mocks of the service responses were built as to manipulate the behaviour of the methods
    to satisfy testing scenarios. Finally, the production code was fully auditioned using the NG Lint tool.

# Implemented test cases

* Home
    * Tests the information displayed
    
* User
    * Tests the users listed in the table, according to the mocked user service's response

* Manage User
    *  Tests the user name fetched from the mocked user service's response
    *  Tests the user password fetched from the mocked user service's response
    *  Tests the confirm button is being hidden from the page (as the mock is in view user mode)
    *  Tests the cancel button is being shown in the page