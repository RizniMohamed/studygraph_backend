const tagModel = require("../model/tag")
const timesheetModel = require("../model/timesheet")
const { formatAMPM, time_diff, dateFormat, convertToJSDate } = require("./dt")

const getAllTS = async (start_date = undefined, end_date = undefined) => {

    const timesheet = await timesheetModel.find()

    const allDates = []
    const allTags = []
    const new_ts = []

    for (const ts of timesheet) {

        // push unique date dictonary to new_ts
        if (!new_ts.find(e => Object.keys(e).includes(dateFormat(ts.date)))) {
            if (start_date && end_date) {
                if (new Date(start_date) <= ts.date && new Date(end_date) >= ts.date) {
                    let temp = {}
                    temp[dateFormat(ts.date)] = []
                    allDates.push(dateFormat(ts.date))
                    new_ts.push(temp)
                }
            } else {
                let temp = {}
                temp[dateFormat(ts.date)] = []
                allDates.push(dateFormat(ts.date))
                new_ts.push(temp)
            }
        }

        // get ts.date dictonary from new_ts
        const target_ts = new_ts.find(e => Object.keys(e)[0] === dateFormat(ts.date))

        if (target_ts) {

            // get tag by its id
            const tag = await tagModel.findById({ _id: ts.tagID })

            if (!target_ts[dateFormat(ts.date)].find(e => Object.keys(e).includes(tag.name))) {
                const temp = {}
                temp[tag.name] = []
                allTags.push(tag)
                target_ts[dateFormat(ts.date)].push(temp)
            }

            const target_tag = target_ts[dateFormat(ts.date)].find(e => Object.keys(e)[0] === tag.name)

            // ts.tag = tag
            target_tag[tag.name].push({
                id: ts._id,
                start_time: formatAMPM(ts.start_time),
                end_time: formatAMPM(ts.end_time),
                deff_time: time_diff(ts.start_time, ts.end_time),
                ts: ts,
                tag: tag

            })

        }
    }

    new_ts.sort((a, b) => new Date(convertToJSDate(Object.keys(a)[0])) - new Date(convertToJSDate(Object.keys(b)[0])))

    return { ts: new_ts, allDates, allTags }
}

module.exports = {
    getAllTS
}