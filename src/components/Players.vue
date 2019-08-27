<template>
  <div class="card shadow mb-4">
    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
      <h6 class="m-0 font-weight-bold text-primary">Players</h6>
      <div class="dropdown no-arrow">
        <a
          class="btn btn-outline-primary btn-sm dropdown-toggle border-0"
          data-toggle="dropdown"
          aria-expanded="false"
          role="button"
        >
          <i class="fa fa-ellipsis-v fas fa-sm fa-fw text-gray-400"></i>
        </a>
        <div class="dropdown-menu" role="menu">
          <a
            class="dropdown-item"
            role="presentation"
            data-toggle="modal"
            data-target="#addPlayerModal"
          >Add Player</a>
        </div>
      </div>
    </div>
    <div class="card-body">
      <ul class="list-group">
        <li class="list-group-item" v-for="(player, index) in players" :key="index">
          <div class="row no-gutters align-items-center">
            <div class="col">
              <h3>{{ player.name }}</h3>
            </div>
            <div class="col-auto"></div>
            <div class="col-auto text-primary align-items-center">
              <a class="ml-2 text-primary" href="#">
                <i class="fa fa-dribbble fa-2x text-primary"></i>
                <h4 class="d-inline-block">&nbsp;x{{ player.shots }}</h4>
              </a>
            </div>
          </div>
          <div>
            <span
              v-for="(tag, index) in player.tags"
              :key="index"
              :class="['badge badge-pill text-uppercase mr-1', 'badge-' + ((tag.isDisaster === true) ? 'danger' : 'success')]"
            >
              {{ tag.name }}
              <span v-if="tag.count > 1">x{{tag.count}}</span>
            </span>
            <span class="link text-secondary c-pointer">
              <span class="v-align pr-1" v-if="!player.tags || player.tags.length === 0">Add Tag</span>
              <i class="fa fa-plus-circle"></i>
            </span>
          </div>
        </li>
      </ul>
    </div>
    <div
      class="modal fade"
      id="addPlayerModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addPlayerModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <form submit="return false;" novalidate>
            <div class="modal-header">
              <h5 class="modal-title" id="addPlayerModalLabel">Add Player</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="exampleInputEmail1">Player Name</label>
                <input
                  id="playerName"
                  type="text"
                  class="form-control"
                  placeholder="Enter player name"
                  v-model="playerName"
                  required
                />
                <div class="invalid-feedback">Please choose a player name.</div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary" @click="addPlayer">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'Players',
  props: ['players'],
  data() {
    return {
      playerName: ''
    };
  },
  methods: {
    addPlayer() {
      const name = this.playerName;
      if (!name || !name.length > 0) {
        return;
      }
      this.$emit('playerAdded', name);

      $('#addPlayerModal').modal('hide');
    }
  },
  mounted() {
    $('#addPlayerModal').on('shown.bs.modal', function() {
      $('#playerName').trigger('focus');
    });
  }
};
</script>

<style>
.c-pointer {
  cursor: pointer;
}
</style>