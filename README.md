# AngularDemoMac

This is a demo Angular application featuring a secure login page and a dashboard. The login uses username (`test`) and password (`test123`), with the password securely stored and validated using base64 encoding (for demo purposes only).

## Features

- **Login Page:** Enter username and password to authenticate. Only the credentials `test` / `test123` are valid.
- **Dashboard:** Displays a welcome message and user details after successful login.
- **Session Management:** User session is stored in local storage and can be cleared by logging out.
- **Angular Standalone Components:** Uses Angular's latest standalone component architecture.

## Folder Structure

```
angular.json
package.json
src/
  index.html
  main.ts
  styles.css
  app/
    app-routing.module.ts
    app-settings.ts
    app.component.ts
    app.component.html
    dashboard/
      dashboard.component.ts
      dashboard.component.html
      dashboard.component.css
    login/
      login.component.ts
      login.component.html
      login.component.css
    auth.service.ts
  assets/
  environments/
    environment.ts
    environment.prod.ts
```

## Getting Started

### Development server

Run:
```sh
ng serve
```
Navigate to [http://localhost:4200/](http://localhost:4200/). The app will automatically reload if you change any of the source files.

### Build

Run:
```sh
ng build
```
The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run:
```sh
ng test
```
Executes the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run:
```sh
ng e2e
```
Executes the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Code scaffolding

Generate a new component or service:
```sh
ng generate component component-name
ng generate service service-name
```

## Further help

To get more help on the Angular CLI use `ng help` or check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
