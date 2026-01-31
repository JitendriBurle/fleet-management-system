# Trip Table Schema

## Table Name
trips

## Description
It stores the trips created by customers.

## Columns

| Column Name | Data Type | Constraints |
|-----------=-|-----------|-------------|
| id | uuid | Primary Key, default `uuid_generate_v4()` |
| customer_id | uuid | NOT NULL, Foreign Key → users(id) |
| vehicle_id | uuid | NOT NULL, Foreign Key → vehicles(id) |
| start_date | date | NOT NULL |
| end_date | date | Nullable |
| location | text | NOT NULL |
| distance_km | numeric | NOT NULL, CHECK (> 0) |
| passengers | integer | NOT NULL, CHECK (> 0) |
| tripCost | numeric | Nullable |
| isCompleted | boolean | Default FALSE |
| created_at | timestamp | Default `now()` |

## Constraints
* Passengers must not be exceeded than the limit.
* Vehicle should be available before creating a trip.

## Relationships
- One **customer** → many trips
- One **vehicle** → many trips
