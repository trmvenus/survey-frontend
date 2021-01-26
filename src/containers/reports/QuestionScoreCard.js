import React from 'react';
import {
  Card, 
  CardBody, 
  CardTitle, 
  Table, 
  Badge
} from 'reactstrap';

// Helpers
import IntlMessages from '../../helpers/IntlMessages';

const QuestionScoreCard = ({
  reportData = []
}) => {

  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle className="text-primary">
          <IntlMessages id='report.question-score'/>
        </CardTitle>

        <Table striped bordered className='align-middle text-center'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th width='50%' scope='col'><IntlMessages id='report.question' /></th>
              <th width='10%' scope='col'><IntlMessages id='report.responses' /></th>
              <th width='10%' scope='col'><IntlMessages id='report.points-obtained' /></th>
              <th width='10%' scope='col'><IntlMessages id='report.total-points' /></th>
              <th width='10%' scope='col'><IntlMessages id='report.score' /></th>
            </tr>
          </thead>
          <tbody>
          {reportData.questions.map((question, i) => (
            <tr key={i}>
              <td>{i+1}</td>
              <td>{question.questiontitle}</td>
              <td>{question.responses}</td>
              <td>{question.pointsobtained}</td>
              <td>{question.totalpoints}</td>
              <td>{question.score}</td>
            </tr>
          ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  ) 
}

export default QuestionScoreCard;