var Main = {
    run: function () {
        Main.OAuthLogin();
    },
    OAuthLogin: function () {
        var qs = location.search.trim();

        if (qs.length <= 1)
            return alert('Error');

        var provider = 'google';
        if (qs.indexOf('state=Facebook') > -1)
            provider = 'facebook';
        else if (qs.indexOf('state=microsoft') > -1)
            provider = 'microsoft';

        $.ajax({
            url: 'https://leitordenotas3.herokuapp.com/oauth/' + provider + '/callback' + qs,
            contentType: "application/json",
            type: 'POST'
        }).fail(function () {
            alert('❌ Erro inesperado!');
        }).done(function (data) {
            localStorage.setItem('bgggSessionId', data.session);
            localStorage.setItem('bgggSessionExpires', (Date.now() + 1000 * 60 * 60 * 24 * 14).toString());
            location.href = '/';
        });
    }
};

Main.run();