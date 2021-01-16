SELECT category as title, count(*) as counter
        from category_topics
        GROUP BY category;