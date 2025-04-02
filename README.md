# The task

We have an existing project with working code. Your task is to run it and make a few changes to it.

### Given

We have **companies**, companies have **users**.

Every user has a **role**, which defines what this user does in the company. There might be multiple users with the same role.

We create and assign **tickets** to users.

Every ticket has
1. Type - defines the work that should be done by the user
2. Single assignee - the user
3. Category - every type is under a particular category
4. Status: open or resolved

**We have 2 endpoints:**

`GET api/v1/tickets` - returns all tickets in the system. Without pagination. This is only for creating logic testing, you can ignore its code.

`POST api/v1/tickets` - creates a ticket. It accepts type and companyId

**Ticket creation logic:**

If a ticket type is ‘managementReport’, then the ticket category should be ‘accounting’. The assignee is a user with the role = ‘Accountant’. If there are multiple accountants in the company, take the most recently created one.

If a ticket type is ‘registrationAddressChange’, then the ticket category should be ‘Corporate’. Assignee is a user with the role ‘Corporate secretary’. If there are multiple secretaries, throw an error.

If we cannot find an assignee with the required role, throw an error.

### TO DO

**Task 1.** If we create a registrationAddressChange ticket, but the company already has a ticket with this type, throw a duplication error

**Task 2.** Add a new user role = Director. If we create a registrationAddressChange ticket and we cannot find a secretary, assign it to the Director. If there are multiple directors, throw an error.

**Task 3.** Add a new ticket type:

- type = strikeOff
- Category = ‘Management’
- Assignee = ‘Director’. If there are multiple directors, throw an error.
- Additional side effect: Resolve all other active tickets in this company (we do not need them anymore as we are closing down the company).

**Note! Do not be afraid to refactor the code. It is deliberately far from perfect 😅**

# Project setup and run

1. NPM
```sh
$ nvm use
$ npm install
```

2. Run the DB container
```sh
docker-compose up -d
```

3. Run migrations
```sh
npm run db:migrate
```

4. Start the server
```sh
npm start
```

5. Go to http://localhost:3000/api/v1/tickets 🍾

# Testing
1.Run the DB container (if you did not before)
```sh
docker-compose up -d
```

2.Create a db
```sh
npm run db:create:test
```

3. Run migrations
```sh
npm run db:migrate:test
```

4. Test
```sh
npm test
```
