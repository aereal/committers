var UserComponent = Vue.extend({
  template: '#user-card-template',
  props: [
    'name'
  ],
  data: function () {
    return {
      speaking: false,
      speakedTime: 0,
    };
  },
  methods: {
    onClick: function (event) {
      this.speaking = !this.speaking;
      var action = this.speaking ? 'show' : 'hide';

      var self = this;
      var started = new Date();
      $('#timer').
        modal({
          onHide: function () {
            var finished = new Date();
            var nextSpeakedTime = finished - started;
            self.speakedTime += nextSpeakedTime;
            console.log('Next speaked: ' + nextSpeakedTime);
            console.log('Total speaked: ' + self.speakedTime);
          }
        }).
        modal(action);
    },
  },
  computed: {
    icon: function () {
      return 'http://cdn1.www.st-hatena.com/users/__/' + this.name + '/profile.gif';
    },
  },
});
Vue.component('user', UserComponent);

function defaultUsersByHash(location) {
  var names = location.hash.substring(1).split(/\s*,\s*/);
  return names.map(function (n) { return { name: n } });
}

var app = new Vue({
  el: '#entrypoint',
  data: {
    users: defaultUsersByHash(window.location),
  },
  methods: {
    onAddUser: function (event) {
      var input = event.target;
      var name = input.value;
      this.users.push({ name: name });
      input.value = '';
    },
  },
});
