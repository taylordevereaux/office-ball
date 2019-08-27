<template>
  <div>
    <NavBar />
    <div class="container-fluid">
      <div class="row d-sm-flex align-items-center mb-4">
        <div class="col">
          <h3 class="h3 mb-0 text-gray-800">Scoreboard</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-xl-3 mb-4">
          <HighlightWidget
            color="primary"
            v-bind:value="highlights.mostShots"
            text="Most Consecutive Shots"
            icon="dribbble"
          ></HighlightWidget>
        </div>
        <div class="col-md-6 col-xl-3 mb-4">
          <HighlightWidget
            color="success"
            v-bind:value="highlights.mostTrickShots"
            text="Most Trick Shots"
            icon="magic"
          ></HighlightWidget>
        </div>
        <div class="col-md-6 col-xl-3 mb-4">
          <HighlightWidget
            color="danger"
            v-bind:value="highlights.mostDisasters"
            text="Most disasters"
            icon="ambulance"
          ></HighlightWidget>
        </div>
        <div class="col-md-6 col-xl-3 mb-4">
          <HighlightWidget
            color="warning"
            v-bind:value="highlights.daysSinceLastDisaster"
            text="Days since last disaster"
            icon="hourglass-start"
          ></HighlightWidget>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-5 col-xl-4">
          <Players :players="players" @playerAdded="addPlayer" />
        </div>
        <div class="col-lg-7 col-xl-8">
          <div class="card shadow mb-4">
            <div
              class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
            >
              <h6 class="m-0 font-weight-bold text-primary">Shots</h6>
            </div>
            <div class="card-body">
              <ShotsChart :players="players" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import HighlightWidget from './components/HighlightWidget.vue';
import Players from './components/Players.vue';
import ShotsChart from './components/ShotsChart.vue';
import { highlightsService } from './_services/highlights.service';
import { playersService } from './_endpoints/players.service';

import axios from 'axios';
import { server } from './helper';

export default {
  name: 'app',
  components: {
    NavBar,
    HighlightWidget,
    Players,
    ShotsChart
  },
  data() {
    return {
      highlights: {
        mostShots: '',
        mostTrickShots: '',
        mostDisasters: '',
        daysSinceLastDisaster: 0
      },
      players: []
    };
  },
  mounted() {
    axios
      .get(`${server.baseURL}/api/players`, {
        crossdomain: true
      })
      .then(result => this._setPlayers(result.data))
      .catch(error => console.log(error));
  },
  methods: {
    addPlayer(playerName) {
      if (
        this.players.filter(
          x => x.name.toUpperCase() === playerName.toUpperCase()
        ).length > 0
      ) {
        return;
      } else {
        this.players.push({
          name: playerName,
          shots: 0,
          tags: []
        });
      }
    },
    _setPlayers(players) {
      this.players = players;
      if (this.players.length) {
        const highlights = highlightsService.getHightlights(this.players);
        this.highlights = {
          ...this.highlights,
          ...highlights
        };
      }
    }
  }
};
</script>

<style>
</style>
