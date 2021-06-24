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

const SummaryCard = ({
  reportData = []
}) => {
  console.log(reportData)
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

          {(question.type === 'text') && (
            <></>
          )}
          {(question.type === 'checkbox' 
            || question.type === 'radiogroup'
            || question.type === 'dropdown'
            || question.type === 'barrating'
            || question.type === 'imagepicker'
            || question.type === 'boolean'
            ) && (
            <>
              <Row>
                <Col className='mr-3'>
                  <Table striped>
                    <thead>
                      <tr>
                        <th width='70%'><IntlMessages id='report.answer'/></th>
                        <th width='10%'><IntlMessages id='report.count'/></th>
                        <th width='10%'><IntlMessages id='report.percent'/></th>
                        {('score' in question) && (
                        <th width='10%'><IntlMessages id='report.score'/></th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                    {question.choices.map((choice, j) => (
                      <tr key={j}>
                        <td>
                          {choice.text}
                        </td>
                        <td>
                          {choice.count}
                        </td>
                        <td>
                          {(choice.count * 100 / question.responses).toFixed(2)}%
                        </td>
                        {('score' in question) && (
                        <td>
                          {choice.score}
                        </td>
                        )}
                      </tr>
                    ))}
                    </tbody>
                  </Table>
                </Col>
                <div>
                  <Badge color='info p-3'>
                    <h5>
                      <IntlMessages id='summary.total-responses' />{': '}{question.responses}
                    </h5>
                    {("score" in question) && (
                    <h5>
                      <IntlMessages id='report.score' />{': '}{question.score}%
                    </h5>
                    )}
                  </Badge>
                </div>
              </Row>
              <Row className='mb-3'>
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
              </Row>
            </>
          )}
          {(question.type === 'matrix') && (
            <>
            {question.rows.map((row, j) => (
              <React.Fragment key={j}>
                <CardSubtitle className='text-primary'>
                  {i+1}.{j+1} {row.text}
                </CardSubtitle>
                <Row className='mb-3'>
                  <Col className='mr-3'>
                    <Table striped>
                      <thead>
                        <tr>
                          <th width='70%'><IntlMessages id='report.answer'/></th>
                          <th width='10%'><IntlMessages id='report.count'/></th>
                          <th width='10%'><IntlMessages id='report.percent'/></th>
                          {('score' in question) && (
                          <th width='10%'><IntlMessages id='report.score'/></th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                      {question.columns.map((column, k) => (
                        <tr key={k}>
                          <td>
                            {column.text}
                          </td>
                          <td>
                            {row.counts[k]}
                          </td>
                          <td>
                            {(row.counts[k] * 100 / row.responses).toFixed(2)}%
                          </td>
                          {('score' in question) && (
                          <td>
                            {column.score}
                          </td>
                          )}
                        </tr>
                      ))}
                      </tbody>
                    </Table>
                  </Col>
                  <div>
                    <Badge color='info p-3'>
                      <h5>
                        <IntlMessages id='summary.total-responses' />{': '}{row.responses}
                      </h5>
                      {("score" in row) && (
                      <h5>
                        <IntlMessages id='report.score' />{': '}{row.score}%
                      </h5>
                      )}
                    </Badge>
                  </div>
                </Row>
                
                <Row className='mb-3'>
                  <Colxx lg={6} md={12} className='mb-4'>
                    <div className='chart-container'>
                      {drawLineChart(question, true, j)}
                    </div>
                  </Colxx>
                  <Colxx lg={6} md={12} className='mb-4'>
                    <div className='chart-container'>
                      {drawPolarAreaChart(question, true, j)}
                    </div>
                  </Colxx>
                  <Colxx lg={6} md={12} className='mb-4'>
                    <div className='chart-container'>
                      {drawDoughnutChart(question, true, j)}
                    </div>
                  </Colxx>
                  <Colxx lg={6} md={12} className='mb-4'>
                    <div className='chart-container'>
                      {drawBarChart(question, true, j)}
                    </div>
                  </Colxx>
                </Row>
              </React.Fragment>
            ))}
            </>
          )}
          {(question.type === 'matrixdropdown') && (
            <>
            {question.choices.map((choice, j) => 
            <React.Fragment key={j}>
              <CardSubtitle className='text-primary'>
                {i+1}.{j+1} {choice.text}
              </CardSubtitle>
              <Row className='mb-3'>
                <Col>
                  <Table striped>
                    <thead>
                      <tr>
                        <th></th>
                        {question.columns.map((col, k) => 
                          <th key={k}>{col.text}</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {question.rows.map((row, k) => 
                      <tr key={k}>
                        <td>
                          {row.text}
                        </td>
                        {question.columns.map((col, p) => 
                          <td key={p}>
                            {choice.count[k][p]}
                          </td>
                        )}
                      </tr>
                      )}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </React.Fragment>
            )}
            <Row>
              <Col>
                <Badge color='info p-3'>
                  <h5>
                    <IntlMessages id='summary.total-responses' />{': '}{question.responses}
                  </h5>
                  {("score" in question) && (
                  <h5>
                    <IntlMessages id='report.score' />{': '}{question.score}%
                  </h5>
                  )}
                </Badge>
              </Col>
            </Row>
            </>
          )}
        </CardBody>
      </Card>
    ))}
    {(reportData.overallscore != 0) && (
      <Card className='mb-4'>
        <CardBody className='text-center'>
          <h5 className='text-primary'>
            <IntlMessages id='report.overall-score'/>
          </h5>
          <h1 className='text-primary'>
            {reportData.overallscore}%
          </h1>
        </CardBody>
      </Card>
    )}
    </>
  )
}

export default SummaryCard;