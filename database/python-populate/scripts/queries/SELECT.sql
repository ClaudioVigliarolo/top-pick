	SELECT c.topic_title,
	FROM category_topics c
	WHERE category_title = “,,,”



SELECT t.title
FROM topics t
WHERE t.title IN(
    SELECT c.topic
    FROM category_topics c
    WHERE c.category = ${category}
)
