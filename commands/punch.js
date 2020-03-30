let Attendances = require("../models/attendances");

module.exports = {
  name: "!punch",
  description: "punch",
  execute(msg, args) {
    const user_id = msg.author.id;
    const user_name = msg.author.username;
    const member = msg.member;
    const member_name = msg.member.nickname;
    Attendances.findOne({ userID: user_id }).then(doc => {
      if (!doc) {
        Attendances.create({
          userID: user_id,
          userName: user_name,
          memberName: member_name,
          punchType: "in"
        }).then(() => {
          msg.reply(`Welcome to the Office!`);
        });
      } else {
        Attendances.findOne(
          { userID: user_id },
          {},
          { sort: { createdAt: -1 } }
        ).then(doc => {
          if (doc.punchType === "in") {
            Attendances.create({
              userID: user_id,
              userName: user_name,
              memberName: member_name,
              punchType: "out"
            }).then(() => {
              msg.reply(`Goodbye! Have a Nice Day!`);
            });
          } else {
            Attendances.create({
              userID: user_id,
              userName: user_name,
              memberName: member_name,
              punchType: "in"
            }).then(() => {
              msg.reply(`Welcome to the Office!`);
            });
          }
        });
      }
    });
  }
};
