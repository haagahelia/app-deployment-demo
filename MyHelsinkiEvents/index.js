const { createEventDateFilter, eventDateComparator } = require('../events/dates');
const { getEventsAsync } = require('../events/client');

module.exports = async function (context, req) {

    let { min_date, max_date } = req.query;
    let dateFilter = createEventDateFilter(min_date, max_date);

    let events = await getEventsAsync();
    let filtered = events.filter(dateFilter);

    filtered.sort(eventDateComparator);

    context.res = {
        body: filtered
    };
}