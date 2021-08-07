# HDNet Movies - Movie Database using TMDB API

This is a movie database containing thousands of movies with all their information. Furthermore also actors and their personal information could be found there. User can also use various features such as search, filter, sort or discover. The application itself was then built using React.js as the frontend framework. All the data that is displayed is fetched from the TMDB API.

## Used Technologies

- HTML (EJS view engine)
- CSS / Material UI
- JavaScript
- React

## Given Problem

The task was to create a fully functional movie database with features such as search, sort or discover and to put an emphasis on the design.

## Application Design

For this particular application I have decided to use an external API, thus I don't have to have my own backend set up. I'm TMDB API and for the frontend I have chosen React.js framework and Material UI library for styling.

In order to be able to communicate with the API I am using Javascript built-in Fetch API.

## Design

### Landing Page

On the first glance of the website you can spot a simple slideshow of trending movies. At first I am fetching last week trending movies. After that I make an array of the displayed movies, where the middle one is highlighted. In order to always keep the array to contain 5 elements I am adding empty elements to the array when we are approaching one of the ends.

### Discover Feature

The discover section has three options. The first one is to display top 20 movies depending on whether they were trending last week. The second option is to sort them in the descending order by the revenue they have made. And the last option is to sort them according to their date of release. Furthermore I have also added an option of a custom search, where the clients can discover movies however they want it to be.

### Actors

The user is given an opportunity to search for an actor, but not only them. Producers, directors and other crew members are also in the database. And when it comes to displaying data about a certain person I'm fetching their biography, all the general personal information and the movies their are best known for.

### Movies

The user is given an opportunity to search for a movie, with its title or the release year. When it comes to displaying the data about the movie I am fetching all the general information such as title, descirption, release year, rating etc. What's more on the landing page I am showing the most important members of the crew like producer or director. In the section above it the user can find the whole cast of the movie and movies that are similar or are recommended to the original one.

## HDNet Movies Demo Showcase

[Youtube Link](https://www.youtube.com/watch?v=BGZOmnE5RUI)
