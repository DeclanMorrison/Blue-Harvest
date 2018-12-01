# This folder is for the controllers for the database.

In this folder will be pre-baked functions that will be called in order to interact with the database, e.g.

```javascript
findAll: function(req, res) {
    db.Book
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
```

This will be referenced somewhere else, and the functions will be called from there.