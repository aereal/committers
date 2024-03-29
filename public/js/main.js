var UserComponent = Vue.extend({
  template: '#user-card-template',
  props: [
    'name'
  ],
  data: function () {
    return {
      speakedTime: 0,
    };
  },
  methods: {
    onClick: function (event) {
      this.$parent.setCurrentSpeaker({
        name: this.name,
        totalSpeakedTime: this.speakedTime,
        icon: this.icon,
      });

      var self = this;
      var started = new Date();
      var timer = setInterval(function () {
        var elapsed = new Date() - started;
        self.$parent.notifyTotalSpeaked(elapsed + self.speakedTime);
      }, 1);

      $('#timer').
        modal({
          onHide: function () {
            clearInterval(timer);

            var finished = new Date();
            var nextSpeakedTime = finished - started;
            self.speakedTime += nextSpeakedTime;
            console.log('Next speaked: ' + nextSpeakedTime);
            console.log('Total speaked: ' + self.speakedTime);

            self.$parent.setCurrentSpeaker(null);
          }
        }).
        modal('show');
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
    currentSpeaker: {},
  },
  methods: {
    onAddUser: function (event) {
      var input = event.target;
      var name = input.value;
      this.users.push({ name: name });
      input.value = '';
    },
    setCurrentSpeaker: function (speaker) {
      if (speaker === null) {
        this.currentSpeaker = {};
      } else {
        this.currentSpeaker = speaker;
      }
    },
    notifyTotalSpeaked: function (total) {
      if (this.currentSpeaker) {
        this.currentSpeaker.totalSpeakedTime = total;
      }
    },
  },
});
