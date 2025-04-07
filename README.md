# ACME ACCOUNTING

Welcome to ACME acounting, this codebase serves as a way for you to
know how we at OSOME work and how you work through challenges while
adopting an existing codebase.

---

There are 5 tasks that you need to do to complete this task, at least
3 tasks must be done for you to move forward.

You are allowed to refactor as much as you want. However, Be mindful 
of your time.

If there are any issues, contact your hiring representative and they 
will clarify it with you.

If you want to use AI/LLM, **DISCLOSE** where and how you used it.

## Context

We have `companies`, companies have `users`.

Every user has a `role`, which defines what this user does in the 
company. There might be multiple users with the same role.

We create and assign `tickets` to users.

Every ticket has
1. Type - defines the work that should be done by the user
2. Single assignee - the user
3. Category - every type is under a particular category
4. Status: open or resolved

**Endpoints**

- `GET  api/v1/tickets`    - returns all tickets in the system. Without 
                             pagination. This is only for creating logic 
                             testing.
- `POST api/v1/tickets`    - creates a ticket. It accepts type and `companyId`
- `GET  api/v1/report`     - starts the processing of existing data and
                             builds a report.        

**Ticket Creation Rules**

If a ticket type is `managementReport`, then the ticket category 
should be `accounting`. The assignee is a user with the role = `Accountant`. 
If there are multiple accountants in the company, 
take the most recently created one.

If a ticket type is `registrationAddressChange`, then the ticket category 
should be `Corporate`. Assignee is a user with the role `Corporate secretary`. 
If there are multiple secretaries, throw an error.

If we cannot find an assignee with the required role, throw an error.

## Tasks

### 1. Setup

This directory is not set up properly. Explore the code base and create
a mental model of where things are. Based on your expertise with node.js,
Set up the codebase based on industry standard conventions.

**Instructions**

1. Modify the codebase so that it starts.

**Acceptance**

1. Service should run when you use `npm run dev`.
2. Once everything is set up, you should be able to receive `{ "OK": true }` 
   when you access http://localhost:1337/api/v1/healthcheck.
3. Commit the changes that allowed #2 to work and create a PR for the 
   changes in YOUR OWN repository.

### 2. Behaviour

This service is old, new business requirements have come in and it
requires us to change the internals of the service.

Let's start with fixing the behaviour of the service.

**Instructions**

1. When creating a `registrationAddressChange` ticket, if the company 
   already has a ticket with this type, throw a duplication error.
2. Add a new `Director` user. If we create a `registrationAddressChange`
   ticket and we cannot find a secretary, assign it to the `Director`. 
   If there are multiple directors, throw an error.

**Acceptance**

1. Each requirement should have an accompanying test.
2. Include the HTTP requests you used to test in the code base.
3. Commit the changes and create a PR for the changes in YOUR OWN 
   repository.

### 3. Schema

It seems that companies are closing down more than usual, we never considered
this case before. Maybe it's time to add another type of ticket.

**Instructions**

1. Create New Ticket Type
   ```
   {
       "type": "strikeOff",
       "Category": "Management",
       "Assignee": "Director"
   }
   ```

**Side Effects**
- If there are multiple directors, throw an error.
- Resolve all other active tickets in this company (we do not need 
  them anymore as we are closing down the company).

**Acceptance**

1. The ticket type should be usable by other engineers when setting up
   this service.
2. Accompanying tests should be available to accommodate the side effects.
3. Include the HTTP requests you used to test in the code base.
4. Commit the changes and create a PR for the changes in YOUR OWN
   repository.

### 4. Optimize

ACME processes tons of data every day. It is essential for us that we
make sure that our internal processes and data are provided accurately
and on time.

We have a legacy service that processes data for us, but it takes a long
time to get the results. Maybe this is a good time to refactor the code.

**Instructions**

1. Optimize the endpoint so that the time it takes to finish an action
   is marginally faster.
2. The endpoint should not hold the connection of the client while processing
   the data in the background.

**Acceptance**

1. The endpoint should be respond faster than the existing implementation
2. Documents should process in the background and the client should be able
   to check the status of the processing.
3. Metrics should be recorded for discussion.
4. Commit the changes and create a PR for the changes in YOUR OWN
   repository.

### 5. Interaction

It seems it is hard for agents in ACME to keep track of changes within
a company itself. They need a way to keep context as long as the company
is being managed by ACME.

Perhaps if we can add a way for agents to take notes, it would be easier
for them to keep track of changes.

**Instruction**

1. Create a new endpoint that allows agents to add notes to a company.
2. The endpoint should accept the following:
   ```
   {
       "companyId": 123,
       "note": "This is a note",
       "createdBy": "userId",
       "createdAt": "2023-10-01T00:00:00Z"
   }
   ```
3. Create a new form that allows agents to add notes to a company.
4. Create a new page that allows agents to view all notes for a company.

**Acceptance**

1. The endpoint should be able to accept the request and store the note
   in the database safely.
2. The UI should have some sort of validation.
3. The UI should be able to prevent abuse.
4. Include the HTTP requests you used to test in the code base.
5. Commit the changes and create a PR for the changes in YOUR OWN
   repository.

## Stretch Tasks

There are common principles in the repository that are intentionally 
left out and not covered by the base tasks given above. These are common 
best-practice tasks that you can make in any node project. 

Doing more than what is given above will be plus points and will be
considered in our code review session.

Here are some of the topics you can consider:

- [ ]  Code Quality
- [ ]  Fixing Subtle Errors
- [ ]  Using Tests
- [ ]  Using Typescript or Using Types
- [ ]  Security Considerations
- [ ]  Performance Considerations
- [ ]  Use Component Systems
- [ ]  Commit Convention
