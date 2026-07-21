# ADR-003 - Manage Database Schema with Flyway

## Status

Accepted

## Context

The application uses PostgreSQL and JPA entities to model the domain.

Allowing Hibernate to create or update the database schema automatically is convenient during early development, but it does not provide a clear and versioned history of database changes.

The project needs a predictable way to create the same database structure in development, testing, and future deployment environments.

## Decision

The database schema will be managed with Flyway migrations.

SQL migration files will be stored in:

`src/main/resources/db/migration`

Hibernate will use:

`spring.jpa.hibernate.ddl-auto=validate`

Hibernate will validate that the entities match the database schema, but it will not create or modify tables.

## Alternatives Considered

- Use Hibernate with `ddl-auto=update`.
- Create and modify the database manually through DBeaver.
- Use Liquibase instead of Flyway.

## Consequences

### Advantages

- Database changes are versioned in Git.
- The database can be recreated consistently in different environments.
- Schema changes have a visible history.
- Constraints and relationships can be controlled explicitly with SQL.
- Hibernate can detect differences between the entities and the database schema.

### Disadvantages

- Every schema change requires a new migration file.
- Entity changes and migrations must remain synchronized.
- Incorrect migrations can prevent the application from starting.