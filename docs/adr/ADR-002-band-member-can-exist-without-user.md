# ADR-002 - BandMember Can Exist Without a User Account

## Status

Accepted

## Context

The application may be used by a manager or organizer who creates and manages bands and their members.

The actual band members may not use the application or have registered user accounts. Requiring every band member to register would limit the application and make band organization dependent on all members using the system.

## Decision

A `BandMember` can exist without being connected to a `User`.

The relationship from `BandMember` to `User` will be optional.

A user account may later be connected to an existing band member.

## Alternatives Considered

- Require every `BandMember` to be connected to a registered `User`.
- Store all member information directly inside the `User` entity.

## Consequences

### Advantages

- A manager can organize an entire band without requiring every member to register.
- The application supports musicians, managers, producers, roadies, and technicians who do not have accounts.
- A registered user can later be attached to an existing band member.
- `User` remains responsible only for application authentication and account information.

### Disadvantages

- Linking a registered user to an existing band member requires a secure invitation or verification process.
- Services and DTOs must support an optional `User` relationship.

