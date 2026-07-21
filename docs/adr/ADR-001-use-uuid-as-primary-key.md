# ADR-001 - Use UUID as Primary Key

## Status

Accepted

## Context

Every entity in the application requires a unique identifier.
The project needs an identifier that is suitable for REST APIs and can scale well if the application grows.

## Decision

All entities will use UUID as their primary key.

## Alternatives Considered

- Long with auto-increment
- Integer with auto-increment

## Consequences

### Advantages

- Globally unique identifiers.
- Safer to expose through REST APIs.
- Better support for distributed systems.
- Native support in Spring Boot and PostgreSQL.

### Disadvantages

- Larger than numeric IDs.
- Slightly less readable when debugging.