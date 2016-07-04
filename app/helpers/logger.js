import _ from 'lodash';

export default function logger(log) {

    //// avoid running when off
    //if (!Fiverr.models.globals.debug) {
    //    return;
    //}
    //
    //var messages = _.toArray(arguments),
    //    message = typeof messages[0] === 'string' ? messages[0] : null,
    //    filters = Fiverr._getLS('fiverr-debugger') || [],
    //    matches = [];
    //
    //// make sure browser supports console log
    //if (typeof console !== 'undefined' && typeof console.log === 'function') {
    //
    //    // apply filters (if exist)
    //    if (filters.length) {
    //
    //        // filter the matching keywords for the log message
    //        matches = _.filter(filters, function(filter) {
    //            return message && ~message.toLowerCase().indexOf(filter);
    //        });
    //
    //        // stop here in case there were no matches
    //        if (!matches.length) {
    //            return;
    //        }
    //
    //    }
    //
    //    // print single string message
    //    if (messages.length === 1 && message) {
    //
    //        console.log(message);
    //
    //        // print multiple messages
    //    } else {
    //
    //        console.log(messages);
    //
    //    }
    //
    //}

    if ((typeof window !== 'undefined') && (typeof console !== 'undefined') && (typeof console.log === 'function')) {
        console.log(log);
    }

};
