var users = [
    { name: "1万", username: "嘉宾1", people: null, },
    { name: "10万", username: "嘉宾2", people: null, },
];

var Lottery2 = function (dom, options) {
    //console.log(window.lottery);
    if (window.lottery == undefined)
        return;
    $("#loged-user-name span").html("王小华")
    window.lottery.options.delay = 10;
    window.lottery.off('matched');
    window.lottery.on('matched', this._on_matched_peoples.bind(this));

    window.lottery._clean_peoples = this._clean_peoples;
};

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function setCookie(name, value) {
    var Days = 1;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

Lottery2.prototype._on_matched_peoples = function (peoples) {
    //console.log(peoples);
    users.forEach(function (user) {
        if ($("#prize-name").html() == user.name) {
            if (user.people && getCookie(user.people.winUserId) == null) {
                peoples[0] = user.people;
                setCookie(user.people.winUserId, 1);
            }
        }
    });
    //console.log(peoples);
    window.lottery._on_matched_peoples(peoples);
};


Lottery2.prototype._clean_peoples = function (peoples, records) {
    peoples = peoples || [];

    if (this.options.allowDuplicate) {
        return peoples;
    }

    var userIds = [];
    (records || []).forEach(function (record) {
        userIds.push(record.winUserId);
    });

    var ary = [];
    peoples.forEach(function (people) {
        var found = false;
        users.forEach(function (user, index) {
            if (user.username == people.name) {
                found = true;
                user.people = people;
                users[index] = user;
            }
        });
        if (userIds.indexOf(people.winUserId) === -1 && !found) {
            ary.push(people);
        }
    });
    //console.log(ary);
    return ary;
};
/*window.onload = function () {
    alert('onload');
    window.lottery2 = new Lottery2('.wrapper',{usr:{
        id:'1660421',
        nickName:'leapar'
    }});
};*/


window.lottery2 = new Lottery2('.wrapper', {
    usr: {
        id: '1660421',
        nickName: 'leapar'
    }
});



