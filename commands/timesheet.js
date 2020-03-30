const { utcToZonedTime, format } = require("date-fns-tz");

let Attendances = require("../models/attendances");

module.exports = {
  name: "!timesheet",
  description: "timesheet",
  execute(msg, args) {
    const member = msg.mentions.members.first();
    const member_name = msg.mentions.members.first().nickname;
    console.log(member, member_name);
    Attendances.find({ memberName: member_name }).then(docs => {
      let timesheet = "";

      docs.map(doc => {
        timesheet += "punch " + doc.punchType + " @ ";

        const date = new Date(doc.createdAt);
        const date_zoned = utcToZonedTime(
          date,
          Intl.DateTimeFormat().resolvedOptions().timeZone
        );
        const date_formatted = format(date_zoned, "dd-MM-yyyy HH:mm:ss zzz", {
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });
        timesheet += date_formatted;
        timesheet += "\n";

        console.log(date, date_zoned, date_formatted);
      });
      console.log(timesheet);
      msg.reply(`${member} 's timesheet for today: \n${timesheet}`);
    });
  }
};
