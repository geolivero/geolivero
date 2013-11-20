define(function() {
    return {
        projectList: '/projects/list.json',
        projectByName: function (name) {
            name = name || 'website';
            return '/projects/list/' + name;
        },
        getProjectImagePath: function (img) {
            return '/assets/projects/' + img;
        },
        snds: {
            click: document.getElementById('snd_click'),
            hover: document.getElementById('snd_hover'),
            remove: document.getElementById('snd_gone')
        }
    }
});