
<template>
  <div v-if="loaded">
    <bar-chart :chartData="chartData" :options="this.chartOptions" />
  </div>
</template>

<script>
import BarChart from './base-charts/BarChart';

export default {
  name: 'ShotsChart',
  props: ['players'],
  components: { BarChart },
  data() {
    return {
      loaded: false,
      chartData: null,
      chartOptions: {
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0
          }
        },
        scales: {
          xAxes: [
            {
              beginAtZero: true,
              time: {
                unit: 'number'
              },
              gridLines: {
                display: false,
                drawBorder: false
              },
              ticks: {
                autoSkip: false,
                maxTicksLimit: 6
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 5,
                maxTicksLimit: 5,
                padding: 10
              },
              gridLines: {
                color: 'rgb(234, 236, 244)',
                zeroLineColor: 'rgb(234, 236, 244)',
                drawBorder: false,
                borderDash: [2],
                zeroLineBorderDash: [2]
              }
            }
          ]
        },
        legend: {
          display: true
        },
        tooltips: {
          titleMarginBottom: 10,
          titleFontColor: '#6e707e',
          titleFontSize: 14,
          backgroundColor: 'rgb(255,255,255)',
          bodyFontColor: '#858796',
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10,
          callbacks: {
            label: function(tooltipItem, chart) {
              var datasetLabel =
                chart.datasets[tooltipItem.datasetIndex].label || '';
              return datasetLabel + ': ' + tooltipItem.yLabel;
            }
          }
        },
        ...this.options
      }
    };
  },
  mounted() {
    this.chartData = this.getChartData();
    this.loaded = this.chartData !== null;
  },
  watch: {
    players: function(vue, old) {
      this.chartData = this.getChartData();
      this.loaded = this.chartData !== null;
    }
  },
  methods: {
    getChartData: function() {
      if (!this.players || this.players.length === 0) return this.chartData;

      const labels = this.players.map(x => x.name);
      const shots = this.players.map(x => x.shots);

      const trickShots = isDisaster =>
        this.players.map(x => {
          const map = x.tags.filter(tag => !!tag.isDisaster === isDisaster);
          if (map.length > 1) return map.reduce((a, b) => a.count + b.count);
          else if (map.length === 1) return map[0].count;
          return 0;
        });

      const tricks = trickShots(false);
      const disasters = trickShots(true);

      // TODO : Possibly change to assignment instead of direct update.
      this.chartOptions.scales.yAxes[0].ticks.max = Math.max(
        ...tricks,
        ...disasters,
        ...shots
      );

      return {
        labels: labels,
        datasets: [
          {
            label: 'Consecutive',
            backgroundColor: '#4e73df',
            hoverBackgroundColor: '#2e59d9',
            borderColor: '#4e73df',
            data: shots
          },
          {
            label: 'Trick',
            backgroundColor: '#1cc88a',
            hoverBackgroundColor: '#2e59d9',
            borderColor: '#1cc88a',
            data: tricks
          },
          {
            label: 'Disasters',
            backgroundColor: '#e74a3b',
            hoverBackgroundColor: '#2e59d9',
            borderColor: '#e74a3b',
            data: disasters
          }
        ]
      };
    }
  }
};
</script>