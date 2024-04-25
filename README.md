# Borsa Frontend Exercise

* A react native (mobile) project showcasing signin/signupa dashboard/homeand profile page integration with backend.

## Features

Here're some of the project's best features:

* A sign in page
* a sign up page
* Dashboard
* Profile

## 🛠️ Installation Steps

1. Install project dependencies and install expo go on your mobile device

    `
    npx expo install
    `

2. run the app with expo

    `
    npx expo start
    `

## 💻 Built with

Technologies used in the project:

* typescript,react native, expo, axios,redux saga, react community packages etc..

## Folder Structure

* src
  * components
    * we may store components that we might need to use in multiple places later on
  * features
    * this is where every individual feature is maintained, this kind of file organizarion allows for more flexibility and maintainability as every feature can be independently be updated without having to modify other parts of the app.
  * routes
    * we might need this for routes especially when apps get large, helps to separate out and make the starting boilerplate code easier to be readable.
  * store
    * this is where our state management configuration is handled.
