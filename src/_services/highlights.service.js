export const highlightsService = {
  getHightlights(players) {
    const highlights = {
      mostShots: '',
      mostTrickShots: '',
      mostDisasters: '',
      daysSinceLastDisaster: 0
    };

    highlights.mostShots = this.getMostShots(players).name;
    highlights.mostTrickShots = this.getMostTrickShots(players).name;
    highlights.mostDisasters = this.getMostDisasterShots(players).name;

    return highlights;
  },

  getMostShots(players) {
    return players.sort((a, b) => b.shots - a.shots)[0];
  },

  getMostTrickShots(players) {
    return this.getTrickShots(players, false)[0];
  },
  getMostDisasterShots(players) {
    return this.getTrickShots(players, true)[0];
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
      .sort((a, b) => b.totalShots - a.totalShots);
  }
};
