var UserComponent = Vue.extend({
  template: '#user-card-template',
  props: [
    'name'
  ],
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
