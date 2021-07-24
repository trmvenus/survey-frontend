import React, { useState } from 'react';
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
import { date } from 'yup';

const colors = ThemeColors();

const ResponsesChartCard = ({ className = '', controls = true, dates=[], }) => {
  
  const [isThisWeek, setThisWeek] = useState(true);

  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const data = [0, 0, 0, 0, 0, 0, 0];
  let maxValue =0
  const weekday = moment().weekday();

  const v1 = isThisWeek ? 1 : 7;
  
  for (let i = 1; i <= 7; i ++) {
    const date = moment().subtract(v1+(weekday-i), 'days');

    for (const d of dates) {
      if (moment.utc(d).local().format('YYYY-MM-DD') === date.format('YYYY-MM-DD')) {
        data[i-1] ++;
      }
    }
    if(maxValue<data[i-1]){maxValue=data[i-1]}

    labels[i-1] = date.format('Do, MMM');
  }
  
  const areaChartData = {
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
              <IntlMessages id="summary.survey-responses" />
            </h5>
          </div>
        </div>
        {controls && (
          <div className="btn-group float-right float-none-xs mt-2">
            <UncontrolledDropdown>
              <DropdownToggle caret color="primary" className="btn-xs" outline>
                {(isThisWeek) ? (
                  <IntlMessages id="summary.this-week" />
                ) : (
                  <IntlMessages id="summary.last-week" />
                )}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={() => setThisWeek(!isThisWeek)}>
                  {(isThisWeek) ? (
                    <IntlMessages id="summary.last-week" />
                  ) : (
                    <IntlMessages id="summary.this-week" />
                  )}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        )}
      </CardBody>

      <div className="chart card-body pt-0">
        <AreaChart shadow data={areaChartData} mintick={0} maxtick={maxValue} />
      </div>
    </Card>
  );
};

export default ResponsesChartCard;
