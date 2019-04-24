
drop table users cascade;
drop table vacation cascade;
drop table list cascade;
drop table comment cascade;
drop table list_item cascade;


CREATE TABLE "users"
(
    "id" serial NOT NULL,
    "email" varchar(100) NOT NULL UNIQUE,
    "first_name" varchar(100) NOT NULL,
    "last_name" varchar(100) NOT NULL,
    "password" varchar(100) NOT NULL,
    CONSTRAINT users_pk PRIMARY KEY ("id")
);



CREATE TABLE "list_item"
(
    "list_item_id" serial NOT NULL,
    "list_id" int NOT NULL,
    "list_item_name" text NOT NULL,
    "description" varchar(180),
    "budget" int,
    CONSTRAINT list_item_pk PRIMARY KEY ("list_item_id")
);



CREATE TABLE "list"
(
    "list_id" serial NOT NULL,
    "vacation_id" int NOT NULL,
    "list_name" varchar(180) NOT NULL,
    CONSTRAINT list_pk PRIMARY KEY ("list_id")
);



CREATE TABLE "vacation"
(
    "vacation_id" serial NOT NULL,
    "users_id" int NOT NULL,
    "vacation_name" varchar(100) NOT NULL,
    "days" int,
    CONSTRAINT vacation_pk PRIMARY KEY ("vacation_id")
);



CREATE TABLE "comment"
(
    "comment_id" serial NOT NULL,
    "list_item_id" int NOT NULL,
    "comment" TEXT NOT NULL,
    CONSTRAINT comment_pk PRIMARY KEY ("comment_id")
);




ALTER TABLE "list_item" ADD CONSTRAINT "list_item_fk0" FOREIGN KEY ("list_id") REFERENCES "list"("list_id") on;

ALTER TABLE "list" ADD CONSTRAINT "list_fk0" FOREIGN KEY ("vacation_id") REFERENCES "vacation"("vacation_id");

ALTER TABLE "vacation" ADD CONSTRAINT "vacation_fk0" FOREIGN KEY ("users_id") REFERENCES "users"("id");

ALTER TABLE "comment" ADD CONSTRAINT "comment_fk0" FOREIGN KEY ("list_item_id") REFERENCES "list_item"("list_item_id");