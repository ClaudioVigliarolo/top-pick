	SELECT c.topic_title,
	from category_topics${translations.DB_NAME} c
	WHERE category_title = “,,,”



SELECT t.title
${translations.DB_NAME} t
WHERE t.title IN(
    SELECT c.topic
    from category_topics${translations.DB_NAME} c
    WHERE c.category = ${category}
)
