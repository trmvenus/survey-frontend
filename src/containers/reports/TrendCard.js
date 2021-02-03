import React from 'react';
import {
  Card, 
  CardBody, 
  CardTitle, 
  Row, 
  Col, 
  Table, 
  Badge
} from 'reactstrap';
import CardSubtitle from 'reactstrap/lib/CardSubtitle';

// Components
import { Colxx } from '../../components/common/CustomBootstrap';
import {
  DoughnutChart,
  LineChart,
  PolarAreaChart,
  BarChart,
} from '../../components/charts';

// Helpers
import IntlMessages from '../../helpers/IntlMessages';
import { ThemeColors } from '../../helpers/ThemeColors';

const TrendCard = ({
  reportData = []
}) => {
  const colors = ThemeColors();

  const drawLineChart = (question, isMatrix=false, rowno=0) => {
    let data, labels;

    if (isMatrix) {
      data = question.rows[rowno].counts;
      labels = question.columns.map(col => col.text);
    } else {
      data = question.choices.map(choice => choice.count);
      labels = question.choices.map(choice => choice.text);
    }

    const mintick = 0;
    const maxtick = Math.max.apply(null, data);
    const stepsize = Math.ceil(maxtick / 5);

    const lineChartData = {
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
          pointRadius: 6,
          pointBorderWidth: 2,
          pointHoverRadius: 8,
          fill: false,
        },
      ],
    };

    return (
      <LineChart 
        shadow 
        mintick={mintick}
        maxtick={maxtick}
        stepSize={stepsize}
        data={lineChartData}
      />
    )
  }

  const drawPolarAreaChart = (question, isMatrix=false, rowno=0) => {
    let data, labels;

    if (isMatrix) {
      data = question.rows[rowno].counts;
      labels = question.columns.map(col => col.text);
    } else {
      data = question.choices.map(choice => choice.count);
      labels = question.choices.map(choice => choice.text);
    }

    const polarAreaChartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          borderWidth: 2,
          borderColor: [colors.themeColor1, colors.themeColor2, colors.themeColor3, colors.themeColor4, colors.themeColor5, colors.themeColor6],
          backgroundColor: [
            colors.themeColor1_10,
            colors.themeColor2_10,
            colors.themeColor3_10,
            colors.themeColor4_10,
            colors.themeColor5_10,
            colors.themeColor6_10,
          ],
        },
      ],
    };

    return (
      <PolarAreaChart 
        shadow 
        data={polarAreaChartData}
      />
    )
  }

  const drawDoughnutChart = (question, isMatrix=false, rowno=0) => {
    let data, labels;

    if (isMatrix) {
      data = question.rows[rowno].counts;
      labels = question.columns.map(col => col.text);
    } else {
      data = question.choices.map(choice => choice.count);
      labels = question.choices.map(choice => choice.text);
    }

    const doughnutChartData = {
      labels: labels,
      datasets: [
        {
          label: '',
          borderColor: [colors.themeColor3, colors.themeColor2, colors.themeColor1],
          backgroundColor: [
            colors.themeColor3_10,
            colors.themeColor2_10,
            colors.themeColor1_10,
          ],
          borderWidth: 2,
          data: data,
        },
      ],
    };

    return (
      <DoughnutChart
        shadow 
        data={doughnutChartData}
      />
    )
  }

  const drawBarChart = (question, isMatrix=false, rowno=0) => {
    let data, labels;

    if (isMatrix) {
      data = question.rows[rowno].counts;
      labels = question.columns.map(col => col.text);
    } else {
      data = question.choices.map(choice => choice.count);
      labels = question.choices.map(choice => choice.text);
    }

    const mintick = 0;
    const maxtick = Math.max.apply(null, data);
    const stepsize = Math.ceil(maxtick / 5);

    const barChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Count',
          borderColor: colors.themeColor1,
          backgroundColor: colors.themeColor1_10,
          data: data,
          borderWidth: 2,
        },
      ],
    };

    return (
      <BarChart 
        shadow 
        mintick={mintick}
        maxtick={maxtick}
        stepSize={stepsize}
        data={barChartData}
      />
    )
  }

  return (
    <>
    {reportData.questions.map((question, i) => (
      <Card className="mb-4" key={i}>
        <CardBody>
          <CardTitle className="text-primary">
            {i+1}. {question.title}
          </CardTitle>
          <>
            <Row>
              <Col className='mr-3'>
                <Table striped>
                  <thead>
                    <tr>
                      <th width='70%'><IntlMessages id='report.duration-name'/></th>
                      <th width='15%'><IntlMessages id='report.responses'/></th>
                      <th width='15%'><IntlMessages id='report.overall-score'/></th>
                    </tr>
                  </thead>
                  <tbody>
                  {question.responses.map((response, j) => (
                    <tr key={j}>
                      <td>
                        {response.label}
                      </td>
                      <td>
                        {response.value}
                      </td>
                      <td>
                        {question.scores[j].value}%
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
            {/* <Row className='mb-3'>
              <Colxx lg={6} md={12} className='mb-4'>
                <div className='chart-container'>
                  {drawLineChart(question)}
                </div>
              </Colxx>
              <Colxx lg={6} md={12} className='mb-4'>
                <div className='chart-container'>
                  {drawPolarAreaChart(question)}
                </div>
              </Colxx>
              <Colxx lg={6} md={12} className='mb-4'>
                <div className='chart-container'>
                  {drawDoughnutChart(question)}
                </div>
              </Colxx>
              <Colxx lg={6} md={12} className='mb-4'>
                <div className='chart-container'>
                  {drawBarChart(question)}
                </div>
              </Colxx>
            </Row> */}
          </>
        </CardBody>
      </Card>
    ))}
    </>
  )
}

export default TrendCard;