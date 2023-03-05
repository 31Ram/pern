drop  table if exists user_info cascade;
drop  table if exists languages cascade;
drop  table if exists language_level cascade;
drop  table if exists language_offered cascade;
drop  table if exists language_wanted cascade;

CREATE TABLE user_info (
	id serial primary key NOT NULL,
	username varchar(30) NOT null UNIQUE,
	email VARCHAR(120) NOT null UNIQUE,
	password varchar(100) NOT null,
	full_name varchar(40) NOT NULL,
	date_of_birth DATE NOT NULL,
	gender varchar(10) NOT NULL,
	nationality varchar(50) NOT NULL,
	description varchar(200)
	);

CREATE TABLE languages (
	id serial primary key NOT NULL,
	language_name varchar(30) NOT NULL
	);

CREATE TABLE language_level (
	id serial primary key NOT NULL,
	levels varchar(30) NOT NULL
	);

CREATE TABLE language_offered (
	id serial primary key NOT NULL,
	username int references  user_info(id),
	language_id int references languages(id),
	user_level int references language_level(id)
	);

CREATE TABLE language_wanted (
	id serial primary key NOT NULL,
	username int references  user_info(id),
	language_id int references languages(id),
	user_level int references language_level(id)
	);

insert into languages (language_name)
values('English');
insert into languages (language_name)
values('Spanish');
insert into languages (language_name)
values('Catalan');
insert into languages (language_name)
values('Arabic');

insert into language_level ("levels")
values('Basic');
insert into language_level ("levels")
values('Intermediate');
insert into language_level ("levels")
values('Advanced');
insert into language_level ("levels")
values('Native');

insert into user_info (username, email, password, full_name, date_of_birth , gender , nationality , description)
values('mdesi98','miguel.desimone98@gmail.com', 'MAD98', 'Miguel Desimone', '30/04/1998', 'male', 'Argentina', 'Hello world');
insert into user_info (username, email, password, full_name, date_of_birth , gender , nationality , description)
values('abubaker', 'habubakernazir@gmail.com', 'ab99', 'Abubaker Nazir', '23/05/1997', 'male', 'Pakistan', 'World Hello');
insert into user_info (username, email, password, full_name, date_of_birth , gender , nationality , description)
values( 'agafarno','agafarno@gmail.com', 'gaboarno', 'Gabriel Arno', '01/07/1981', 'male', 'Venezuela', ' Goodbye world');

insert into language_offered (username, language_id, user_level)
values(1, 3, 2);
insert into language_offered (username, language_id, user_level)
values(2, 1, 3);
insert into language_offered (username, language_id, user_level)
values(3, 2, 4);

insert into language_wanted (username, language_id, user_level)
values(1, 4, 2);
insert into language_wanted (username, language_id, user_level)
values(2, 2, 1);
insert into language_wanted (username, language_id, user_level)
values(3, 3, 1);

select user_info.username, language_name ,language_level.levels 
from language_offered
join user_info on language_offered.username = user_info.id
join languages on language_offered.language_id = languages.id
join language_level on language_offered.user_level = language_level.id;

select user_info.username, user_info.nationality  ,user_info.description , languages.language_name , language_level.levels, user_info.id  
from user_info
join language_offered on user_info.id = language_offered.username
join languages on language_offered.language_id = languages.id
join language_level on language_offered.user_level = language_level.id;


select * from languages;
select * from user_info;
select * from language_level;