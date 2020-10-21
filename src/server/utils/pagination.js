import { Op } from "sequelize";

export function paginate(model) {
  return async (req, res, next) => {
    const name = model.getTableName();

    let { page, per_page, word, search, sort, status } = req.query;
    if (!page || !per_page) {
      (page = 1), (per_page = 10);
    }

    [page, per_page] = [page, per_page].map(Number);

    const start = (page - 1) * per_page;
    const end = page * per_page;

    const result = {};
    try {
      const query = {
        offset: start,
        limit: per_page,
      };

      //TODO: Filtering should be improved
      if (word) {
        query.where = {
          word,
        };
      }

      if (status) {
        query.where = {
          status,
        };
      }

      if (search && name === "words") {
        query.where = {
          word: { [Op.like]: `%${search}%` },
        };
      }

      if (name === "users") {
        query.attributes = [
          "userId",
          "username",
          "admin",
          "createdAt",
          "updatedAt",
        ];
      }
      // It only supports one column ordering for now
      const [sort_by, order] = sort.split("|");
      query.order = [[sort_by, order.toUpperCase()]];

      const { count, rows } = await model.findAndCountAll(query);

      result.total = count;
      result.per_page = per_page;
      result.current_page = page;
      result.last_page = Math.ceil(count / per_page);

      result.previous_page_url =
        start > 0 ? `/api/${name}?page=${page - 1}&per_page=${per_page}` : null;

      result.next_page_url =
        end < count
          ? `/api/${name}?page=${page + 1}&per_page=${per_page}`
          : null;

      result.from = start + 1;
      result.to = end;
      result.data = rows;
      res.paginatedResults = result;
      next();
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };
}
