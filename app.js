Vue.component("hightlight-widget", {
  props: ["color", "text", "value", "icon"],
  template: `
      <div :class="['card shadow h-100 py-2', 'border-left-' + color]">
      <div class="card-body">
          <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                  <div :class="['text-xs font-weight-bold text-uppercase mb-1', 'text-' + color]"><span>{{ text }}</span></div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800"><span>{{ value }}</span></div>
              </div>
              <div class="col-auto"><i :class="['fa fa-2x', 'fa-' + icon, 'text-' + color]"></i></div>
          </div>
      </div>
  </div>`
});

var app = new Vue({
  el: "#app",
  data: {
    highlights: {
      mostShots: "Eric",
      mostTrickShots: "Taylor",
      mostDisasters: "Yannick",
      daysSinceLastDisaster: 0
    },
    players: [
      {
        name: "Taylor",
        shots: 5,
        tags: [{ name: "Table Shot", count: 1 }, { name: "Football", count: 1 }]
      },
      {
        name: "Yannick",
        shots: 4,
        tags: [
          { name: "Table Shot", count: 1 },
          { name: "Disaster", count: 2, IsDisaster: true }
        ]
      },
      {
        name: "Eric",
        shots: 7,
        tags: [{ name: "Disaster", count: 1, IsDisaster: true }]
      },
      {
        name: "Biran",
        shots: 3,
        tags: []
      }
    ]
  }
});
