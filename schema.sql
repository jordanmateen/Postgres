create table engineers (
    id serial primary key,
    name varchar(50) not null,
    email varchar(50) not null
);

create table languages (
    id serial primary key,
    language text not null,
    user_id integer references engineers (id)
);