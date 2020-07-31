# Quiz Game (Direwolf Digital coding challenge)

## Description

A quiz game where the user selects a quiz, is asked a series of questions, and is presented with their score at the end. User answers are sent to the server to check whether they are correct or incorrect, keeping the quiz answers hidden from the client. User's quiz progress is saved locally so that the game can be resumed at a later time.

## Technologies Used

This app was built using React and Bootstrap on the front-end and Node/Express on the back-end. Quiz data is saved in text files on the back end and read, parsed, and structured as JSON by the server. User progress information is stored in local storage.

## Design Notes

I struggled with how to best manage the restriction of using text files as the quiz data source. I debated whether to read the quiz files when the server starts and hold the info in memory for quick access to API requests, or access the files every time data was needed to avoid holding all of the data in memory. With just a few quizzes, obviously it's a very small amount of data, but I was trying to think of how it would scale. I decided to go the second route and read the file whenever the server needs to serve up quiz data or verify an answer, but what I really wanted to do was just throw all the data in a database. :)

## Directions for Future Development

Adding the ability for users to create and share their own quizzes would be fun. I also think making this a progressive web app would be beneficial - it's a quick easy game to play on a phone. The front-end could use a little more polish at mobile resolutions. I realized late in the process that I had only been checking at iPhone X screen res, which is very tall. It looks like on most phones the bottom answer for each question would be off the bottom of the screen and require scrolling. Lastly, adding user account functionality so that users could save and track their stats would be a nice feature.

## Credits

"correct.png" and "incorrect.png" were provide by Direwolf Digital.
"check.png" is from [Clker-Free-Vector-Images on Pixabay](https://pixabay.com/users/clker-free-vector-images-3736/).
"redx.png" is from [OpenClipart-Vectors on Pixabay](https://pixabay.com/users/openclipart-vectors-30363/).
"questionmarks.jpg" is by [qimono on Pixabay](https://pixabay.com/users/qimono-1962238/).
"Geography.jpg" is by [Andrew Neel on Unsplash](https://unsplash.com/@andrewtneel).
"Science.jpg" is by [Michael Longmire on Unsplash](https://unsplash.com/@f7photo).
"Movies.jpg" is by [onkelglocke on Pixabay](https://pixabay.com/users/onkelglocke-12931647/).
"Video_Games.jpg" is by [Thomas Despeyroux on Unsplash](https://unsplash.com/@thomasdes).
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
