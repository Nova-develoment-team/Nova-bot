module.exports = ({
  name:"$alwaysExecute",
  code:`$setuservar[spammessages;0]
  $wait[4s]
  $setuservar[spammessages;$sum[$getuservar[spammessages];1]]
  $if[$sum[$getuservar[spammessages];1]==$getServerVar[AllowedSpam]]
  $suppresserrors
  $clear[10;$authorid;$channelid]
  $sendmessage[Please do not spam, <@$authorid>!]
  $setuservar[spammessages;0]
  $else
  $endif
  $suppresserrors
  $onlyif[$hasperms[$authorid;managemessages]==false;]
  $onlyif[$getservervar[antispam]==true;]`
})