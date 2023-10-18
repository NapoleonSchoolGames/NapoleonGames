runAfterLoad(function() {
    for (var elem in elements) {
      if (elements[elem].hidden) {
        delete elements[elem].hidden;
      }
    }
  });