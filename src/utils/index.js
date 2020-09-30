import { Op } from 'sequelize';

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
    const name = model.getTableName();
    
    let { 
      page, 
      per_page, 
      word, 
      search, 
      sort
    } = req.query;
    if (!page || !per_page) {
      page = 1,
      per_page = 10
    }
    
    [page, per_page] = [page, per_page].map(Number);
  
    const start = (page - 1) * per_page;
    const end = page * per_page;

    const result = {}
    try {
      const query = {
        offset: start,
        limit: per_page
      }

      if (word) {
        query.where = {
          word
        };
      }

      if(search && name === 'words') {
        query.where = {
          word: {[Op.like]: `%${search}%`}
        }
      }

      // It only supports one column ordering for now
      const [sort_by, order] = sort.split('|');
      query.order = [[sort_by, order.toUpperCase()]];

      const { count, rows } = await model.findAndCountAll(query);
      
      result.total = count;
      result.per_page = per_page;
      result.current_page = page;
      result.last_page = Math.ceil(count / per_page);

      result.previous_page_url = start > 0
        ? `http://localhost:3000/api/${name}?page=${page - 1}&per_page=${per_page}`
        : null;

      result.next_page_url = end < count 
        ? `http://localhost:3000/api/${name}?page=${page + 1}&per_page=${per_page}` 
        : null;
      
      result.from = start + 1;
      result.to = end;
      result.data = rows;
      res.paginatedResults = result;
      next()

    } catch(e) {
      return res
        .status(500)
        .json({ message: e.message })
    }

  }
}