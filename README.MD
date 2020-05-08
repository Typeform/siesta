# Siesta
A Github Action that integrates Google Calendar, telling you if your schedule is busy or not, so you can schedule a Siesta.  
 
## Developing

### Prerequisites

- Node.js
- Yarn

### Installation

To install the project dependencies:

```bash
yarn
```

Copy the contents of the `.env.dist` file into a new file called `.env`
and fill in the necessary variables with your own variables.

### How to run it
```bash
yarn start
```

### How to run tests
```bash
yarn test
```
### How to distribute
Github actions requires all the package dependencies in the repo to run the JavaScript code.  
We prefer to distribute our code and modules into a single file: ```dist/index.js```. To do that, run: 
```bash
yarn distribute
```

## Usage
Check ```action.yml``` for the documentation of the inputs needed.


