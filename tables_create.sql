CREATE TABLE accommodation(
id INTEGER PRIMARY KEY,
name VARCHAR(255),
type VARCHAR(255),
location VARCHAR(255),
latitude FLOAT,
longitude FLOAT,
description TEXT);

CREATE TABLE acc_users (
id INTEGER PRIMARY KEY,
username VARCHAR(255),
password VARCHAR(255),
admin INTEGER);

CREATE TABLE acc_dates(
id INTEGER PRIMARY KEY,
accID INTEGER,
thedate INTEGER,
availabillity INTEGER);

CREATE TABLE acc_bookings(
id INTEGER PRIMARY KEY,
accID INTEGER,
thedate INTEGER,
username VARCHAR(255),
npeople INTEGER);