# User Table Schema

## Table Name
users

## Description
It stores user details.Each user should have one role.


## Columns

| Column Name | Data Type | Constraints |
|-------------|-----------|-------------|
| id | uuid | Primary Key, default `uuid_generate_v4()` |
| name | text | NOT NULL |
| email | text | NOT NULL, UNIQUE |
| password | text | NOT NULL |
| role | text | NOT NULL, CHECK (customer, owner, driver) |
| created_at | timestamp | Default `now()` |

## Constraints
- Email must be unique and should not be duplicates.
- Role must be one of: `customer`, `owner`, `driver`

## Relationships
- One **owner** → many vehicles
- One **driver** → one vehicle
- One **customer** → many trips
