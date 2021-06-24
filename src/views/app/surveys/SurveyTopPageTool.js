import React from 'react';
import { Row } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import IntlMessages from '../../../helpers/IntlMessages';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import {isCompleteUpdate1} from '../../../redux/result/actions'
import { 
    Button,
  } from 'reactstrap';
const SurveyTopPageTool = ({
    match,
    isCompleted,
    isCompletedUpdateAction,
    handleRun=null,
    is_multi_responses
    }) => {

  const history = useHistory();
  const handleGoBack = () => {
    history.goBack()
    isCompletedUpdateAction({
        isCompleted:false
    })
  }
  const handleReRun = () => {
      handleRun()
      isCompletedUpdateAction({
          isCompleted:false
      })
  }
  return (
    <>
     {isCompleted&&
        <>
            {is_multi_responses&&
                <div className="text-zero top-right-button-container">
                    <Button
                        color='outline-primary'
                        size="lg"
                        className="top-right-button mr-1"
                        onClick={() => handleGoBack()}
                        >
                        <IntlMessages id='pages.back' />
                    </Button>
                </div>
            }
            
            <div className="text-zero top-right-button-container">
                <Button
                    color='outline-primary'
                    size="lg"
                    className="top-right-button mr-1"
                    onClick={() =>handleReRun()}
                    >
                    <IntlMessages id='pages.rerun' />
                </Button>
            </div>
        </>
     }
    
    

    </>
  );
};

const mapStateToProps = ({ result }) => {
    const isCompleted = result.isCompleted;
    return {
        isCompleted,
    };
  };
  export default injectIntl(
    connect(mapStateToProps, {isCompletedUpdateAction:isCompleteUpdate1})(SurveyTopPageTool)
  );
