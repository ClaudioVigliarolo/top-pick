CREATE TABLE "categories" (
	"title"	TEXT,
	PRIMARY KEY("title")
);


CREATE TABLE "topics" (
	"title"	TEXT,
    "source" TEXT,
	PRIMARY KEY("title")
);




CREATE TABLE "category_topics" (
	"category" TEXT,
	"topic"	   TEXT,
	PRIMARY KEY("category","topic")
    FOREIGN KEY("topic") REFERENCES "topics"("title")
    FOREIGN KEY("category") REFERENCES "category"("title")
);


CREATE TABLE "questions" (
	"id" integer primary key autoincrement,
	"topic"	TEXT,
	"title"	TEXT,
	"liked" NUMERIC DEFAULT 0,
	FOREIGN KEY("topic") REFERENCES "topics"("title")
);
