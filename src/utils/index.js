export function isObjectEmpty(obj) {
  for(var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
    }
  }
  return true;
}

export function paginate(model) {
  return async (req, res, next) => {
    let { page, limit } = req.query;
    [page, limit] = [page, limit].map(Number);

    const start = (page - 1) * limit;
    const end = page * limit;

    const result = {}
    
    try {
      const { count, rows } = await model.findAndCountAll({
        order: ['textId'],
        offset: start,
        limit: end - start
      });

      if(start > 0) {
        result.previous = { 
          page: page - 1, 
          limit 
        };
      }
  
      if(end < count) {
        result.next = { 
          page: page + 1, 
          limit 
        };
      }
      
      result.items = rows
      res.paginatedResults = result;
      next()

    } catch(e) {
      return res
        .status(500)
        .json({ message: e.message })
    }

  }
}