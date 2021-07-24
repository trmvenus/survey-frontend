import React, {useEffect, useState} from 'react';
import {
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';
import moment from 'moment';

import IntlMessages from '../../helpers/IntlMessages';
import { AreaChart } from '../../components/charts';
import { ThemeColors } from '../../helpers/ThemeColors';

const colors = ThemeColors();

const SurveyChartCard = ({ 
  className = '', 
  controls = true,

  dates,
}) => {
  const [showMode, setShowMode] = useState('this-week');

  const weekday = moment().weekday();

  const v1 = showMode === 'this-week' ? weekday+1 : showMode === 'last-week' ? weekday+8 : 30;
  const v2 = showMode === 'this-month' ? 30 : 7;

  let minTick = 999;
  let maxTick = 0;

  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const data = [0, 0, 0, 0, 0, 0, 0];

  for (let i = 1; i <= v2; i ++) {
    const date = moment().subtract(v1-i, 'days');

    data[i-1] = 0;
    if (dates) {
      for (const d of dates) {
        if (moment.utc(d).local().format('YYYY-MM-DD') === date.format('YYYY-MM-DD')) {
          data[i-1] ++;
        }
      }
    }

    minTick = (minTick > data[i-1]) ? data[i-1] : minTick;
    maxTick = (maxTick < data[i-1]) ? data[i-1] : maxTick;

    if (i === 1 || date.date() === 1) {
      labels[i-1] = date.format('Do, MMM');
    } else {
      labels[i-1] = date.format('Do');
    }
  }

  let stepSize = Math.floor((maxTick-minTick) / 4) + 1;
  stepSize = stepSize < 2 ? 2 : stepSize;
  maxTick = minTick + stepSize * 4;

  const surveyChartData = {
    labels: labels,
    datasets: [
      {
        label: '',
        data: data,
        borderColor: colors.themeColor1,
        pointBackgroundColor: colors.foregroundColor,
        pointBorderColor: colors.themeColor1,
        pointHoverBackgroundColor: colors.themeColor1,
        pointHoverBorderColor: colors.foregroundColor,
        pointRadius: 4,
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        fill: true,
        borderWidth: 2,
        backgroundColor: colors.themeColor1_10,
      },
    ],
  };

  return (
    <Card className={`${className} dashboard-filled-line-chart`}>
      <CardBody>
        <div className="float-left float-none-xs">
          <div className="d-inline-block">
            <h5 className="d-inline">
              <IntlMessages id="dashboards.surveys" />
            </h5>
            <span className="text-muted text-small d-block">
              <IntlMessages id="dashboards.daily-survey-created" />
            </span>
          </div>
        </div>
      </CardBody>

      <div className="chart card-body pt-0">
        <AreaChart
          shadow
          data={surveyChartData} 
          mintick={minTick} 
          maxtick={maxTick}
          stepSize={stepSize}
        />
      </div>
    </Card>
  );
};


export default SurveyChartCard;
