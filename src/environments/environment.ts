// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyA6MrUilTpZk3c9h1OG4ih1RpbC8bHJWnc',
    authDomain: 'fanderful-117.firebaseapp.com',
    projectId: 'fanderful-117',
    storageBucket: 'fanderful-117.appspot.com',
    messagingSenderId: '647666496063',
    appId: '1:647666496063:web:00254ac44a81e2cd747e8a',
    measurementId: 'G-2J729BKVPW'
  },
  tmbdMovieConfig: {
    apiUrl: 'https://api.themoviedb.org/3/discover/movie',
    apiKey: '32d8b054cd4fbb6126f2fb9c7eda0179'
  },
  newsApiConfig: {
    apiKey: '9e1e8f7482984b989e2be4e516e5292a',
    apiURL: 'https://newsapi.org/v2/'
  },
  videogamesAPIConfig: {
    apiURL: 'https://api.rawg.io/api/games?',
    apiKey: 'ebd97506bfc34a28a0458b5258dd1ff8',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
