let refs = {
    1245620  : 'Anygame',
    16777214  : 'Goldenberg/Lobby connect'
  }

let getName = function(id)
{
    if(refs[id])
    {
        return refs[id];
    }
    return 'Unknown game id '+id;
}

exports.refs = refs;
exports.getName = getName;

