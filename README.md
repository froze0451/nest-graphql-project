## Description

NestJS + MongoDB + GraphQL api example. Includes some validation, data transformation and custom exceptions.<br> Installed MongoDB required

### There are two entities - user and group.

You can add user to another as a friend and also follow groups.<br>
There are also many crud methods to use.<br>
If you choose to delete user or group - all they relations with friends/groups will update accordingly.

## Installation

```bash
$ npm install
#or
$ yarn run start
```

## Running the app

```bash
$ npm run start
#or
$ yarn run start
```

## GraphQL Playground
```bash
# browse
http://localhost:3000/graphql
```
