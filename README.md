IONIC Project Application



CONCEPT & IDEA

For my project in the end I have decided to create a simple application where any user can add or change a Post with a picture title 
and description of what they are doing. In this version the application is not using authentication as in my opinion there are too 
many websites with users needing to create an account, for a simple application it is frustrating and annoying. Authentication however 
should be added in some form as currently anyone can change anything. The application is using IONIC components and almost no CSS as 
the framework itself looks very nice and clean. The application can use Camera and Geolocation from the user's device. The backend 
currently consists of a Firebase realtime database. I used github to track my progress and committed every feature separately to the 
main branch. For the future a branch should be created for each feature. 

DESIGN CHOICES

The app was designed for simplicity so users can easily see the steps that can be taken. Further user research should be done to
decide what features should be added, changed or removed. The app tries to communicate in a simple way the steps the user can take. 
While testing the app it lacks feedback in my opinion and this would be a thing I would like to change in the future with more time. 
The features of this app are pretty limited but I tried my best to label them properly and make them discoverable. The consistency 
is mostly managed by the IONIC framework which can be changed with some tweaks. The use of icons is pretty minimal but I did my 
best to connect them to real world features. 

THINKING IN REACT

As IONIC can use any JavaScript framework and for my purpose I used React. The idea is to use reusable components. 
This means that each page is made of multiple components. These can be further divided into smaller components. 
The basic rule is to make components fairly small. Even a button could be used as a component. This can simplify 
the design as they can be reused all over the project. In my opinion it can also add complexity as the data needs 
to be transferred between different components. For my application I could be turned into more components but as 
it isn't big enough for the components to be reused properly.


HOW TO RUN

The application can run as a React project using 

$ npm start

 And build as IONIC app 

$ ionic build --prod

For ios  we can easily generate native project 

$ ionic capacitor add ios

Native project for android 

$ ionic capacitor add android

These can be then run in Android studio or Xcode as native apps for each platform. 


HAND IN

Github link: 
https://github.com/Daniel692/WhatAreYouUpTo

.env file data:

REACT_APP_MY_API_KEY=14de60fd94d4d8753fe8a277ba88667a
REACT_APP_DB_URL=https://whatareyouupto-fc433-default-rtdb.europe-west1.firebasedatabase.app

