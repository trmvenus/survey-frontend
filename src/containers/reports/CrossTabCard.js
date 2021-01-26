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

const CrossTabCard = ({
  reportData = []
}) => {

  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle className="text-primary">
          {reportData.rowquestion.title}&nbsp;&nbsp;&nbsp;<span className='text-success'>VS</span>&nbsp;&nbsp;&nbsp;{reportData.colquestion.title}
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
              <th className='align-middle' scope='col' rowSpan={2}>{reportData.rowquestion.title}</th>
              <th className='align-middle' scope='col' colSpan={reportData.colquestion.choices.length}>{reportData.colquestion.title}</th>
              <th className='align-middle' scope='col' rowSpan={2}><IntlMessages id='report.total'/></th>
            </tr>
            <tr>
              {reportData.colquestion.choices.map((col, j) => (
                <th scope='col' key={`th_${j}`}>{col.text}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          {reportData.rowquestion.choices.map((row, i) => (
            <tr key={`tr_${i}`}>
              <th className='align-middle' scope='row'>{reportData.rowquestion.choices[i].text}</th>
              {reportData.colquestion.choices.map((col, j) => (
              <td key={`tr_td_${j}`}>
                <span>{reportData.datatable[i][j].response}</span><br/>
                <span className='text-muted'>{reportData.datatable[i][j].percent}%</span>
              </td>
              ))}
              <td className='align-middle'>{reportData.rowresponses[i]}</td>
            </tr>     
          ))}
            <tr>
              <th className='align-middle' scope='row'><IntlMessages id='report.total'/></th>
              {reportData.colquestion.choices.map((item, j) => (
                <td key={`td_${j}`}>
                  {reportData.colresponses[j]}
                </td>
              ))}
              <td className='align-middle'>{reportData.totalresponse}</td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  ) 
}

export default CrossTabCard;