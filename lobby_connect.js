
var {spawn} = require('child_process');


let players = {};

function get()
{
    return players;
}
async function update()
{

    let child = spawn(__dirname +'\\lobby_connect.exe');

    child.stdout.on('data', (data) => {

        let lines = data.toString();

        lines.split("\n").forEach((line ) => {
            let res;
            if(res = line.match(/(.*) is playing: (.*)/))
            {
                players[res[1]] =
                    {
                        timeout: new Date().getTime() / 1000 + 65,
                        hide: new Date().getTime() / 1000 + 300,
                        name: res[1],
                        appID: res[2]
                    };
            }
        })
    });
    setTimeout(function()
        {
            child.kill('SIGINT');
        }, 15000)
    return players;
};

//init();

exports.get = get;
exports.update = update;

