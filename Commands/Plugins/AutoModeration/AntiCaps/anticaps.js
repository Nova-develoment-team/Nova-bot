module.exports = {
    name: "$alwaysExecute",
    code: `
    $deletecommand
$sendmessage[<@$authorid>, please do not use too many caps!]
$onlyif[$sub[$charcount[$message];$charcount[$get[e]]]>=$divide[$multi[$charcount[$message];3];4];]
$let[e;$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$noescapingmessage;A;];B;];C;];D;];E;];F;];G;];H;];I;];J;];K;];L;];M;];N;];O;];P;];Q;];R;];S;];T;];U;];V;];W;];X;];Y;];Z;]]
$onlyif[$suppresserrors$charcount[$message]$suppresserrors>=$getServerVar[capsLimit];]
$onlyif[$hasperms[$authorid;managemessages]==false;]
$onlyif[$getservervar[AntiCap]==true;]
$suppresserrors
    `
}