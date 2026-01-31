# Vehicle Table Schema

## Table Name
vehicles

## Description
Stores vehicles created by owners and assigned to drivers.

## Columns

| Column Name | Data Type | Constraints |
|------------|----------|-------------|
| id | uuid | Primary Key, default `uuid_generate_v4()` |
| name | text | NOT NULL |
| registration_number | text | NOT NULL, UNIQUE |
| allowed_passengers | integer | NOT NULL, CHECK (> 0) |
| isAvailable | boolean | Default TRUE |
| driver_id | uuid | Nullable, Foreign Key → users(id) |
| rate_per_km | numeric | NOT NULL, CHECK (> 0) |
| owner_id | uuid | NOT NULL, Foreign Key → users(id) |
| created_at | timestamp | Default `now()` |

## Constraints
- Registration number must be unique
- Only owners can create vehicles (enforced at API level)

## Relationships
- One **owner** → many vehicles
- One **driver** → one vehicle
- One vehicle → many trips
