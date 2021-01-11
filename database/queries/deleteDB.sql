  const loadDB = () => {
    SQLite.deleteDatabase(
      {name: 'db.db', location: 'default'},
      () => {
        console.log('second db deleted');
      },
      () => {
        console.log('ERROR');
      },
    );
  };
