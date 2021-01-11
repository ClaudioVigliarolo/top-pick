
CREATE TABLE "categories" (
	"topic"	TEXT,
	"title"	TEXT,
	FOREIGN KEY("topic") REFERENCES "topics"("title"),
	PRIMARY KEY("title")
);


CREATE TABLE "topics" (
	"title"	TEXT,
	PRIMARY KEY("title")

);

CREATE TABLE "questions" (
	"topic"	TEXT,
	"name"	TEXT,
	FOREIGN KEY("topic") REFERENCES "topics"("title")
);



CREATE TABLE "category_topics" (
	"category" TEXT,
	"topic"	   TEXT,
	PRIMARY KEY("category","topic")
    FOREIGN KEY("topic") REFERENCES "topics"("title")
    FOREIGN KEY("category") REFERENCES "category"("title")
);



