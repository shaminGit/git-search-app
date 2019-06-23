//const fetch = require('node-fetch');
var start = 0, end = 10;
var storeBranch, storeName;
function showData() {

    var str = document.getElementById('i1').value;
    url = 'https://api.github.com/search/repositories?q=' + str;
    var ownObj = {};
    var final = {};
    var list_final = [{}];
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            it = myJson.items;                // get items

            for (let i = start; i < end; i++) {

                own = it[i].owner;              // get owner
                url_ = own.url;
                ownObj['login'] = own.login;
                branch_ = it[i].branches_url;
                branch_ = branch_.slice(0, -9);                  // get correct  branch_url
                final['name'] = it[i].name;
                final['full_name'] = it[i].full_name;       // assign full_name propertyto output
                final['private'] = it[i].private;           // assign Private property to output
                final['licenceName'] = it[i].license;           // assign licence property to output
                final['score'] = it[i].score;
                final['owner'] = { 'login': it[i].owner['login'] };

                // fething number of branches   
                fetch(branch_).then(function (response) {
                    return response.json();
                }).then(function (b) {
                    storeBranch = Object.keys(b).length;
                    console.log(storeBranch);
                }).catch(function (e) {
                    console.log(e);
                })
                // fetching owner login and name
                fetch(url_).then(function (response) {
                    return response.json();
                }).then(function (ownerJson) {
                    console.log(ownerJson);
                    storeName = ownerJson.name;
                    //  console.log(final);

                }).catch(function (e) {
                    console.log(e);
                })
                // list_final.push(final);
                list_final.push(final);
                final = {};
                //  console.log(final);
            }
            // console.log(list_final);
            return list_final;
        }).then(function (f) {
            //  console.log(f);
            for (let j = 1; j < f.length; j++) {
                var li = document.createElement("li");
                var t = document.createTextNode(JSON.stringify(f[j]));
                li.appendChild(t);
                document.getElementById('myUL').appendChild(li);
            }

        }).catch(function (e) {
            console.log(e);
        });
}


function next() {
    document.getElementById('msg').innerText = " Loading next 10.."
    document.getElementById('myUL').innerHTML = '';
    end = end + 10;
    start = start + 10;
    showData();
}

function previous() {
    if (start == 0) {
        document.getElementById('msg').innerText = "No previous record..";
    }
    else {
        document.getElementById('msg').innerText = " Loading previous 10.."
        document.getElementById('myUL').innerHTML = '';
        end = end - 10;
        start = start - 10;
        showData();
    }
}





