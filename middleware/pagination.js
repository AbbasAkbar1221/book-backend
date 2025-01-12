function paginate (req, res, next)  {
    const { page, limit } = req.query;

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;

    const totalPages = Math.ceil(req.paginationResource.length / limitNumber);
    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = startIndex + limitNumber;

    const results = req.paginationResource.slice(startIndex, endIndex);

    if (
      isNaN(pageNumber) ||
      isNaN(limitNumber) ||
      pageNumber <= 0 ||
      limitNumber <= 0
    ) {
      return res.json("Invalid page or invalid value");
    }

    if (pageNumber > totalPages) {
      return res.json({
        error: true,
        message: `Page ${pageNumber} does not exist. There are only ${totalPages} pages available.`,
      });
    }

    const paginatedResults = {
      results: results,
      totalPages: totalPages,
      totalResults: req.paginationResource.length,
    };

    if (pageNumber < totalPages) {
      paginatedResults.next = {
        page: pageNumber + 1,
        limit: limitNumber,
      };
    }

    if (pageNumber > 1) {
      paginatedResults.prev = {
        page: pageNumber - 1,
        limit: limitNumber,
      };
    }

    res.paginatedResults = paginatedResults;
    next();
  };


module.exports = {
  paginate
}