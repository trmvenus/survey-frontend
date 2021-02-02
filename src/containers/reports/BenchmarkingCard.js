import React from 'react';
import { injectIntl } from 'react-intl';
import {
  Card,
  CardBody,
  CardTitle,
  Row,
} from 'reactstrap';

// Helpers
import IntlMessages from '../../helpers/IntlMessages';
import { ThemeColors } from '../../helpers/ThemeColors';

// Components
import { Colxx } from '../../components/common/CustomBootstrap';
import {
  RadarChart,
  BarChart,
} from '../../components/charts';
import report from '../../views/app/surveys/reports/report';

const colors = ThemeColors();

const BenchmarkingCard = ({
  intl,

  reportData = []
}) => {

  const { messages } = intl;

  const radarChartData = {
    datasets: [
      {
        label: reportData.question1.title,
        borderWidth: 2,
        pointBackgroundColor: colors.themeColor1,
        borderColor: colors.themeColor1,
        backgroundColor: colors.themeColor1_10,
        data: [reportData.question1.score, reportData.question1.responses, reportData.question1.totalscore],
      },
      {
        label: reportData.question2.title,
        borderWidth: 2,
        pointBackgroundColor: colors.themeColor2,
        borderColor: colors.themeColor2,
        backgroundColor: colors.themeColor2_10,
        data: [reportData.question2.score, reportData.question2.responses, reportData.question2.totalscore],
      },
    ],
    labels: [messages['report.score'], messages['report.responses'], messages['report.total-points']],
  };

  const barScoreChartData = {
    labels: [messages['report.score']],
    datasets: [
      {
        label: reportData.question1.title,
        borderColor: colors.themeColor1,
        backgroundColor: colors.themeColor1_10,
        data: [reportData.question1.score],
        borderWidth: 2,
      },
      {
        label: reportData.question2.title,
        borderColor: colors.themeColor2,
        backgroundColor: colors.themeColor2_10,
        data: [reportData.question2.score],
        borderWidth: 2,
      },
    ],
  };

  const barResponsesChartData = {
    labels: [messages['report.responses']],
    datasets: [
      {
        label: reportData.question1.title,
        borderColor: colors.themeColor1,
        backgroundColor: colors.themeColor1_10,
        data: [reportData.question1.responses],
        borderWidth: 2,
      },
      {
        label: reportData.question2.title,
        borderColor: colors.themeColor2,
        backgroundColor: colors.themeColor2_10,
        data: [reportData.question2.responses],
        borderWidth: 2,
      },
    ],
  };

  const barTotalPointsChartData = {
    labels: [messages['report.total-points']],
    datasets: [
      {
        label: reportData.question1.title,
        borderColor: colors.themeColor1,
        backgroundColor: colors.themeColor1_10,
        data: [reportData.question1.totalscore],
        borderWidth: 2,
      },
      {
        label: reportData.question2.title,
        borderColor: colors.themeColor2,
        backgroundColor: colors.themeColor2_10,
        data: [reportData.question2.totalscore],
        borderWidth: 2,
      },
    ],
  };

  const maxScore = reportData.question1.score > reportData.question2.score ? reportData.question1.score : reportData.question2.score;
  const maxResponses = reportData.question1.responses > reportData.question2.responses ? reportData.question1.responses : reportData.question2.responses;
  const maxTotalPoint = reportData.question1.totalscore > reportData.question2.totalscore ? reportData.question1.totalscore : reportData.question2.totalscore;

  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle className="text-primary">
          {reportData.question1.title}&nbsp;&nbsp;&nbsp;<span className='text-success'>VS</span>&nbsp;&nbsp;&nbsp;{reportData.question2.title}
        </CardTitle>

        <Row>
          <Colxx lg={12} md={6} sm={12} className='mb-4'>
            <div className='chart-container'>
              <RadarChart shadow data={radarChartData} />
            </div>
          </Colxx>
          <Colxx lg={4} md={6} >
            <div className='chart-container'>
              <BarChart 
                shadow 
                mintick={0}
                maxtick={(Math.floor(maxScore) / 4 + 1) * 4}
                stepSize={Math.floor(maxScore) / 4 + 1}
                data={barScoreChartData} 
              />
            </div>
          </Colxx>
          <Colxx lg={4} md={6} >
            <div className='chart-container'>
              <BarChart 
                shadow 
                mintick={0}
                maxtick={(Math.floor(maxResponses) / 4 + 1) * 4}
                stepSize={Math.floor(maxResponses) / 4 + 1}
                data={barResponsesChartData} 
              />
            </div>
          </Colxx>
          <Colxx lg={4} md={6} >
            <div className='chart-container'>
              <BarChart
                shadow 
                mintick={0}
                maxtick={(Math.floor(maxTotalPoint) / 4 + 1) * 4}
                stepSize={Math.floor(maxTotalPoint) / 4 + 1}
                data={barTotalPointsChartData} 
              />
            </div>
          </Colxx>

        </Row>
      </CardBody>
    </Card>
  )
}

export default injectIntl(BenchmarkingCard);