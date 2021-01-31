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

const ResponsesChartCard = ({dates}) => {
  const [showMode, setShowMode] = useState('this-week');

  const weekday = moment().weekday();

  // This Week
  let minTick1 = 999, maxTick1 = 0, stepSize1 = 5, responsesChartData1;
  {
    const labels = [];
    const data = [];
  
    for (let i = 1; i <= 7; i ++) {
      const date = moment().subtract(weekday+1-i, 'days');
  
      let yValue = 0;
      if (dates) {
        for (const d of dates) {
          if (d === date.format('YYYY-MM-DD')) {
            yValue ++;
          }
        }
      }
  
      const xValue = (i === 1 || date.date() === 1) ? date.format('Do, MMM') : date.format('Do');
  
      minTick1 = (minTick1 > yValue) ? yValue : minTick1;
      maxTick1 = (maxTick1 < yValue) ? yValue : maxTick1;
  
      labels.push(xValue);
      data.push(yValue);
    }
  
    stepSize1 = Math.floor((maxTick1-minTick1) / 4) + 1;
    stepSize1 = stepSize1 < 5 ? 5 : stepSize1;
    maxTick1 = minTick1 + stepSize1 * 4;
  
    responsesChartData1 = {
      labels: labels,
      datasets: [
        {
          label: '',
          data: data,
          borderColor: colors.themeColor2,
          pointBackgroundColor: colors.foregroundColor,
          pointBorderColor: colors.themeColor2,
          pointHoverBackgroundColor: colors.themeColor2,
          pointHoverBorderColor: colors.foregroundColor,
          pointRadius: 4,
          pointBorderWidth: 2,
          pointHoverRadius: 5,
          fill: true,
          borderWidth: 2,
          backgroundColor: colors.themeColor2_10,
        },
      ],
    };
  }

  // Last Week
  let minTick2 = 999, maxTick2 = 0, stepSize2 = 5, responsesChartData2;
  {
    const labels = [];
    const data = [];
  
    for (let i = 1; i <= 7; i ++) {
      const date = moment().subtract(weekday+8-i, 'days');
  
      let yValue = 0;
      for (const d of dates) {
        if (d === date.format('YYYY-MM-DD')) {
          yValue ++;
        }
      }
  
      const xValue = (i === 1 || date.date() === 1) ? date.format('Do, MMM') : date.format('Do');
  
      minTick2 = (minTick2 > yValue) ? yValue : minTick2;
      maxTick2 = (maxTick2 < yValue) ? yValue : maxTick2;
  
      labels.push(xValue);
      data.push(yValue);
    }
  
    stepSize2 = Math.floor((maxTick2-minTick2) / 4) + 1;
    stepSize2 = stepSize2 < 5 ? 5 : stepSize2;
    maxTick2 = minTick2 + stepSize2 * 4;
  
    responsesChartData2 = {
      labels: labels,
      datasets: [
        {
          label: '',
          data: data,
          borderColor: colors.themeColor2,
          pointBackgroundColor: colors.foregroundColor,
          pointBorderColor: colors.themeColor2,
          pointHoverBackgroundColor: colors.themeColor2,
          pointHoverBorderColor: colors.foregroundColor,
          pointRadius: 4,
          pointBorderWidth: 2,
          pointHoverRadius: 5,
          fill: true,
          borderWidth: 2,
          backgroundColor: colors.themeColor2_10,
        },
      ],
    };
  }

  // This Month
  let minTick3 = 999, maxTick3 = 0, stepSize3 = 5, responsesChartData3;
  {
    const labels = [];
    const data = [];
  
    for (let i = 1; i <= 30; i ++) {
      const date = moment().subtract(30-i, 'days');
  
      let yValue = 0;
      if (dates) {
        for (const d of dates) {
          if (d === date.format('YYYY-MM-DD')) {
            yValue ++;
          }
        }
      }
  
      const xValue = (i === 1 || date.date() === 1) ? date.format('Do, MMM') : date.format('Do');
  
      minTick3 = (minTick3 > yValue) ? yValue : minTick3;
      maxTick3 = (maxTick3 < yValue) ? yValue : maxTick3;
  
      labels.push(xValue);
      data.push(yValue);
    }
  
    stepSize3 = Math.floor((maxTick3-minTick3) / 4) + 1;
    stepSize3 = stepSize3 < 5 ? 5 : stepSize3;
    maxTick3 = minTick3 + stepSize3 * 4;
  
    responsesChartData3 = {
      labels: labels,
      datasets: [
        {
          label: '',
          data: data,
          borderColor: colors.themeColor2,
          pointBackgroundColor: colors.foregroundColor,
          pointBorderColor: colors.themeColor2,
          pointHoverBackgroundColor: colors.themeColor2,
          pointHoverBorderColor: colors.foregroundColor,
          pointRadius: 4,
          pointBorderWidth: 2,
          pointHoverRadius: 5,
          fill: true,
          borderWidth: 2,
          backgroundColor: colors.themeColor2_10,
        },
      ],
    };
  }

  return (
    <Card className="dashboard-filled-line-chart">
      <CardBody>
        <div className="float-left float-none-xs">
          <div className="d-inline-block">
            <h5 className="d-inline">
              <IntlMessages id="dashboards.responses" />
            </h5>
            <span className="text-muted text-small d-block">
              <IntlMessages id="dashboards.daily-total-responses" />
            </span>
          </div>
        </div>

        <div className="btn-group float-right float-none-xs mt-2">
          <UncontrolledDropdown>
            <DropdownToggle caret color="secondary" className="btn-xs" outline>
              {(showMode === 'this-week') ? (
                <IntlMessages id="summary.this-week" />
              ) : (showMode === 'last-week') ? (
                <IntlMessages id="summary.last-week" />
              ) : (
                <IntlMessages id="summary.this-month" />
              )}
            </DropdownToggle>
            <DropdownMenu right>
              {(showMode !== 'this-week') && (
              <DropdownItem onClick={() => {setShowMode('this-week')}}>
                <IntlMessages id="summary.this-week" />
              </DropdownItem>
              )}
              {(showMode !== 'last-week') && (
              <DropdownItem onClick={() => {setShowMode('last-week')}}>
                <IntlMessages id="summary.last-week" />
              </DropdownItem>
              )}
              {(showMode !== 'this-month') && (
              <DropdownItem onClick={() => {setShowMode('this-month')}}>
                <IntlMessages id="summary.this-month" />
              </DropdownItem>
              )}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </CardBody>

{(console.log(showMode))}

      <div className="chart card-body pt-0">
        {(showMode === 'this-week') ? (
          <AreaChart 
            shadow 
            data={responsesChartData1}
            mintick={minTick1}
            maxtick={maxTick1}
            stepSize={stepSize1}
          />
        ) : (showMode === 'last-week') ? (
          <AreaChart 
            shadow 
            data={responsesChartData2}
            mintick={minTick2}
            maxtick={maxTick2}
            stepSize={stepSize2}
          />
        ) : (
          <AreaChart 
            shadow 
            data={responsesChartData3}
            mintick={minTick3}
            maxtick={maxTick3}
            stepSize={stepSize3}
          />
        )}
      </div>
    </Card>
  );
};

export default ResponsesChartCard;
