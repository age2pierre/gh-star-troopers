# Github Star Troopers

This app allows you to track the starred repo of your team (or anyone you like) and see what awesome libs you will use in your next project.

## Getting Started

How to get up and running on your local machine for development and testing purposes.

Install dependencies :

```
yarn
```

Start dev server (available on localhost:1234) :

```
yarn start
```

Running the tests :

```
yarn test
```

Build and deploy to firebase hosting, (bundle size report at ./report.html) :

```
yarn deploy
```

Code style is ensured by prettier (not install in dependencies, [use IDE plugin](https://github.com/prettier/prettier-vscode)).

## TODOs

- [ ] Use firestore REST API to minimze bundle size
- [ ] Make use of parcel dynamic imports to reduce time to first render
- [ ] Find the right jest config to not be in conflict with parcel/TS/lodash tree shaking (aka scope-hoisting)

## License

This app is under MIT license.

The logo is the property of Code Troopers SAS (contact@code-troopers.com).

## Built With

- [Hyperapp](https://hyperapp.js.org/) - The minimal web framework used, combines state management with a virtual DOM engine.
- [Firebase](https://firebase.google.com/) - For authentication, cloud database and hosting solution.
- [Jest](https://jestjs.io/) - Testing library.
- [Lodash/FP]() - As a utility library for immutable transformation.
