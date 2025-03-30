export const paginateItems = (sentPage = 1, limit = 12, items) => {
    sentPage = parseInt(sentPage) || 1;
    sentPage = sentPage < 1 ? 1 : sentPage;
    limit = parseInt(limit) || 12;
    limit = limit < 1 ? 12 : limit;
    const pages = Math.ceil(items.length / limit);
    const page = Math.min(pages, sentPage);
    const startIdx = (page - 1) * limit;
    const endIdx = Math.min(startIdx + limit, items.length);

    return { page, limit, pages, total: items.length, items: items.slice(startIdx, endIdx) };
};
