var superkoud = function() {};

function user(username, tips)
{
    this.username = username;
    this.tips = tips;
}

function tip(title, description)
{
    this.title = title;
    this.description = description;
}

function createUser(username)
{
    if (username == 'achiel')
      throw new Error('User already exists');
    else
        console.log("should have created user" + username);
}

function getUser(username)
{
    if (username == 'achiel')
    {
        tips = [new tip('the matrix', 'sci-fi muke'), ];
        return new user('achiel', tips);
    }
    if (username == 'muriel')
    {
        tips = [new tip('la vita e bella', 'mush stuff'), ];
        return new user('muriel', tips);
    }
    else
        return null;
}

exports.getUser = getUser;
exports.createUser = createUser;
