CREATE SCHEMA "schema-georgeton";

CREATE TABLE "schema-georgeton".pokemons (id int NOT NULL IDENTITY, tipo varchar(1000), treinador varchar(1000), nivel int, PRIMARY KEY (id));

select * from "schema-georgeton".pokemons;