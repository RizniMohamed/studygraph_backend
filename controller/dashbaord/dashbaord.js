const tagModel = require("../../model/tag");
const userModel = require("../../model/user");
const { StatusCodes } = require("http-status-codes");
const { APIError } = require("../../middleware/errorHandler");
const { getAllTS } = require("../../helper/ts");
const { convertToJSDate, dateFormat } = require("../../helper/dt");

//Get tags
const getLineChart = async (req, res) => {
  let { start_date, end_date } = req.body

  const { userID } = req.query;

  const query_params = {}
  if (userID) query_params["userID"] = userID;

  if (!start_date) throw new APIError("start_date required", StatusCodes.NOT_FOUND)
  if (!end_date) throw new APIError("end_date required", StatusCodes.NOT_FOUND)

  const { ts, allDates, allTags } = await getAllTS({start_date, end_date,query_params})

  const allDates_ordered = allDates.map(d => new Date(convertToJSDate(d))).sort((a, b) => a - b).map(d => dateFormat(d))
  let unique_TagList = [...new Set(allTags.map(JSON.stringify))].map(JSON.parse);

  let end_date_day = new Date(end_date)
  end_date_day = new Date(end_date_day.getFullYear(), end_date_day.getMonth() + 1, 0).getDate()
  let labels = Array(end_date_day).fill(1).map((n, i) => n + i)

  let final = unique_TagList.map(tag => {
    return {
      label: tag.name,
      data: new Array(labels.length).fill(0),
      borderColor: tag.color,
      backgroundColor: tag.color,
    }
  })

  let i = 0
  ts.forEach(ts => {
    let qwe = {}
    ts[allDates_ordered[i]].forEach(e => {
      const tags = Object.values(e)
      let minutes = 0
      tags[0].forEach(d => {
        minutes += (parseInt(d.deff_time.split(":")[0]) * 60) + parseInt(d.deff_time.split(":")[1])
        qwe[d.tag.name] = minutes
      })

    })
    Object.keys(qwe).forEach(k => {
      const asd = final.find(j => j.label == k)
      asd.data[new Date(convertToJSDate(allDates_ordered[i])).getDate() - 1] = qwe[k]
    })
    i++
  })

  final.push({
    label: "Total",
    data: new Array(labels.length).fill(0),
    borderColor: "#000000",
    backgroundColor: "#000000",
  })

  const total = final.find(j => j.label == "Total")
  final.forEach(d => {
    let i = 0
    if (d.label !== "Total")
      for (let k = 0; k < d.data.length; k++) {
        total.data[i] += parseInt(d.data[k])
        i++
      }
  })

  final = final.map(e => {
    console.log(new Date((start_date)).getDate() - 1);
    console.log(new Date((end_date)).getDate());
    e.data = e.data.slice(new Date((start_date)).getDate() - 1, new Date((end_date)).getDate())
    return e
  })

  if (final.length === 0)
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.NOT_FOUND,
      data: "No timesheet found",
    });

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    data: {
      datasets: final,
      labels: labels.slice(new Date((start_date)).getDate() - 1, new Date((end_date)).getDate()),
    }
  });


};

module.exports = {
  getLineChart,
};
