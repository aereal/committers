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

var app = new Vue({
  el: '#entrypoint',
  data: {
    users: [],
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
