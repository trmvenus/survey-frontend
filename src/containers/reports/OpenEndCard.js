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

const OpenEndCard = ({
  reportData = []
}) => {

  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle className="text-primary">
          <IntlMessages id='report.open-end'/>
        </CardTitle>

        <div className="float-right mb-3">
          <Badge color='info p-3'>
            <h5>
              <IntlMessages id='summary.total-responses' />{': '}{reportData.totalresponse}
            </h5>
          </Badge>
        </div>

        <Table striped bordered className='align-middle text-center'>
          <thead>
            <tr>
              <th scope='col' width='25%'><IntlMessages id='report.respondent-name' /></th>
              <th scope='col'><IntlMessages id='report.text' /></th>
            </tr>
          </thead>
          <tbody>
          {reportData.answers.map((data, i) => (
            <tr key={i}>
              <td>{data.name}</td>
              <td>{data.text}</td>
            </tr>
          ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  ) 
}

export default OpenEndCard;