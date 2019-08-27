export const highlightsService = {
  getHightlights(players) {
    const highlights = {
      mostShots: '',
      mostTrickShots: '',
      mostDisasters: '',
      daysSinceLastDisaster: 0
    };

    highlights.mostShots = this.getMostShots(this.players).name;
    highlights.mostTrickShots = this.getMostTrickShots(players).name;
    highlights.mostDisasters = this.getMostDisasterShots(players).name;
  },

  getMostShots(players) {
    return players.sort((a, b) => a.shots - b.shots)[0];
  },

  getMostTrickShots(players) {
    return this._getTrickShots(players, false)[0];
  },
  getMostDisasterShots(players) {
    return this._getTrickShots(players, true)[0];
  },
  getTrickShots(players, isDisaster) {
    return players
      .map(x => {
        const player = {
          ...x,
          totalShots: 0
        };
        const map = x.tags.filter(tag => !!tag.isDisaster === isDisaster);
        if (map.length > 1)
          player.totalShots = map.reduce((a, b) => a.count + b.count);
        else if (map.length === 1) player.totalShots = map[0].count;

        return player;
      })
      .sort((a, b) => a.totalShots - b.totalShots);
  }
};
