/* eslint-disable prefer-rest-params */
import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js';

import { barChartOptions } from './config';

const Bar = ({ 
  data, 
  shadow = false,
  mintick = 300,
  maxtick = 800,
  stepSize = 100,
}) => {
  const chartContainer = useRef(null);
  const [, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      if (shadow) {
        Chart.defaults.global.datasets.barWithShadow =
          Chart.defaults.global.datasets.bar;
        Chart.defaults.barWithShadow = Chart.defaults.bar;
        Chart.controllers.barWithShadow = Chart.controllers.bar.extend({
          draw(ease) {
            Chart.controllers.bar.prototype.draw.call(this, ease);
            const {
              chart: { ctx },
            } = this;
            ctx.save();
            ctx.shadowColor = 'rgba(0,0,0,0.2)';
            ctx.shadowBlur = 7;
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 7;
            ctx.responsive = true;
            Chart.controllers.bar.prototype.draw.apply(this, arguments);
            ctx.restore();
          },
        });
      }

      barChartOptions.scales.yAxes[0].ticks.stepSize = stepSize;
      barChartOptions.scales.yAxes[0].ticks.min = mintick;
      barChartOptions.scales.yAxes[0].ticks.max = maxtick;

      const context = chartContainer.current.getContext('2d');
      const newChartInstance = new Chart(context, {
        type: shadow ? 'barWithShadow' : 'bar',
        options: barChartOptions,
        data,
      });
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, data, shadow]);

  return <canvas ref={chartContainer} />;
};

export default Bar;
