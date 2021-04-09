// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


//Importaremos los datos de nuestra app creada en Firebase 
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCgDkeMJL-GHPfWKls7bH-ZSnARSBPxH1Q",
    authDomain: "proyectowebcasas.firebaseapp.com",
    projectId: "proyectowebcasas",
    storageBucket: "proyectowebcasas.appspot.com",
    messagingSenderId: "760277497969",
    appId: "1:760277497969:web:bcb48e7eeedb69953643d0",
    measurementId: "G-LFTF018WLM"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
