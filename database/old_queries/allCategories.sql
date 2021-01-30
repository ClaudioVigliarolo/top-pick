SELECT category as title, count(*) as counter
        from category_topics${translations.DB_NAME} 
        GROUP BY category;