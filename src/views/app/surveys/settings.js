import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { 
  Row,
  Button,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label
} from 'reactstrap';
import Switch from 'rc-switch';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
// Redux
import {
  shareSurveyItem,
  changeStyleSurveyItem,
  activeSurveyItem,
  setMultiResponsesSurveyItem,
} from '../../../redux/actions';
import IconButton from '@material-ui/core/IconButton';
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import Popover from '@material-ui/core/Popover';
import { SketchPicker } from 'react-color';
// Components
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { NotificationManager } from '../../../components/common/react-notifications';
import { FormikReactSelect } from '../../../containers/form-validations/FormikFields' ;
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
// Containers
import Breadcrumb from '../../../containers/navs/Breadcrumb';

// Helpers
import IntlMessages from '../../../helpers/IntlMessages';

import { FONT_FAMILY_ITEMS } from '../../../constants/style'

// CSS
import 'rc-switch/assets/index.css';
import { event } from 'jquery';
export const FONT_SIZE = [
  {
    id: "7.5",
    url: "#",
    text: "7.5px",
  },
  {
    id: "8",
    url: "#",
    text: "8px",
  },
  {
    id: "9",
    url: "#",
    text: "9px",
  },
  {
    id: "10",
    url: "#",
    text: "10px",
  },
  {
    id: "11",
    url: "#",
    text: "11px",
  },
  {
    id: "12",
    url: "#",
    text: "12px",
  },
  {
    id: "14",
    url: "#",
    text: "14px",
  },
  {
    id: "16",
    url: "#",
    text: "16px",
  },
  {
    id: "18",
    url: "#",
    text: "18px",
  },
  {
    id: "22",
    url: "#",
    text: "22px",
  },
  {
    id: "24",
    url: "#",
    text: "24px",
  },
  {
    id: "26",
    url: "#",
    text: "26px",
  },
  {
    id: "32",
    url: "#",
    text: "32px",
  },
  {
    id: "36",
    url: "#",
    text: "36px",
  },
  {
    id: "42",
    url: "#",
    text: "42px",
  },
]
const SurveySettings = ({ 
  match,
  surveyid,

  surveyItem,
  error,
  loading,
  changeStyleSurveyItemAction,
  shareSurveyItemAction,
  activeSurveyItemAction,
  setMultiResponsesSurveyItemAction,
 }) => {
  const [active, setActive] = useState(false);  
  const [share, setShare] = useState(false);
  const [anchorElTColor, setAnchorElTcolor] = useState(null);
  const [multiResponses, setMultiResponses] = useState(false);
  const user = []
  const  hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
      a:1
    } : undefined;
  }
  const [state, setState] = useState({
    fontSize: '',
    fontFamily: '',
  });
  const openTcolorPopover = Boolean(anchorElTColor);
  const id_TColor = openTcolorPopover ? 'simple-popover11' : undefined;
  const [textColor, setTextColor] = React.useState(hexToRgb("#000000"))
  const [hexTextColor, setHexTextColor] = React.useState("#000000")
  const [bold, setBold] = useState(false)
  const [underline, setUnderline] = useState(false);
  const [italic, setItalic] = useState(false)
  const history = useHistory();
  const categories = [
    { label: 'University 1', value: 'uni-1', key: 0 },
    { label: 'University 2', value: 'uni-2', key: 1 },
    { label: 'University 3', value: 'uni-3', key: 2 },
  ];
  const UserSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required!')
      .min(3, 'Name must be longer than 3 characters!'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
    password: Yup.string()
      .required('Password is required!')
      .min(6, 'Password must be longer than 6 characters!'),
    role: Yup.string()
      .required('Role is required'),
  });
  const handleActiveSurvey = (checked) => {
    setActive(checked);
    activeSurveyItemAction({id: surveyid});
  }

  const handleShareSurvey = (checked) => {
    setShare(checked);
    shareSurveyItemAction({id: surveyid});
  }

  const handleSetMultiResponsesSurvey = (checked) => {
    setMultiResponses(checked);
    setMultiResponsesSurveyItemAction({id: surveyid});
  }

  useEffect(() => {
    if (surveyItem) {
      setActive(surveyItem.is_active);
      setShare(surveyItem.is_share);
      setMultiResponses(surveyItem.is_multi_responses);
      setHexTextColor(surveyItem.color||'#000000')
      setTextColor(hexToRgb(surveyItem.color||'#000000'))
      setState({
        fontSize:surveyItem.font_size,
        fontFamily:surveyItem.font_family
      })
      setBold(surveyItem.bold)
      setItalic(surveyItem.italic)
      setUnderline(surveyItem.underline)
      document.documentElement.style.setProperty("--text-color", surveyItem.color||'#000000')
      console.log("surveyItem==>>", surveyItem)
    }
  }, [surveyItem]);

  useEffect(() => {
    if (error) {
      NotificationManager.warning(error.message??error, 'Edit Survey Error', 3000, null, null, '');
    }
  }, [error]);
  const updateStyles = () =>{
    console.log("add==>>", textColor, state.fontSize)
    changeStyleSurveyItemAction({id:surveyid, tColor:hexTextColor, fontSize:state.fontSize, fontFamily: state.fontFamily, underline:underline, bold: bold, italic:italic})
  }
  const handleCloseFormatColorPopOver = () => {
    setAnchorElTcolor(null);
};
const  handleChangeTxtColor = (color, event) => {
  console.log(color.rgb)
  setTextColor(color.rgb)
  setHexTextColor(color.hex)
  console.log(textColor)
  document.documentElement.style.setProperty("--text-color", color.hex)
}
const hanldleFormatColorTextButton = (event) => {
  setAnchorElTcolor(event.currentTarget);
};
const handleChangeFont = (event) => {
  const name = event.target.name 
  setState({
    ...state,
    [name]: event.target.value,
  });
};
const handleChangeFontFamily = (event) => {
  const name = event.target.name 
  setState({
    ...state,
    [name]: event.target.value,
  });
};
// useEffect(()=> {
//   document.documentElement.style.setProperty("--text-color",textColor)
//   setTextColor(hexToRgb(textColor))
// },[textColor])
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            {loading && (
            <h1>
              {surveyItem.name}
            </h1>
            )}

            <div className="text-zero top-right-button-container">
              <Button
                color='outline-primary'
                size="lg"
                className="top-right-button mr-1"
                onClick={() => history.goBack()}
                >
                <IntlMessages id='pages.back' />
              </Button>
            </div>

            <Breadcrumb match={match} />
          </div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx lg="6" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>
                <IntlMessages id='survey.settings' />
              </CardTitle>
              <FormGroup className="mb-4">
                <label className="h6">
                  <IntlMessages id="settings.active" />
                </label>
                <Switch
                  className="custom-switch custom-switch-primary mb-2"
                  checked={active}
                  onChange={handleActiveSurvey}
                />
                <label>
                  <IntlMessages id="settings.active-description" />
                </label>
              </FormGroup>
              <FormGroup className="mb-4">
                <label className="h6">
                  <IntlMessages id="settings.share" />
                </label>
                <Switch
                  className="custom-switch custom-switch-primary mb-2"
                  checked={share}
                  onChange={handleShareSurvey}
                />
                <label>
                  <IntlMessages id="settings.share-description" />
                </label>
              </FormGroup>
              <FormGroup className="mb-4">
                <label className="h6">
                  <IntlMessages id="settings.multi-responses" />
                </label>
                <Switch
                  className="custom-switch custom-switch-primary mb-2"
                  checked={multiResponses}
                  onChange={handleSetMultiResponsesSurvey}
                />
                <label>
                  <IntlMessages id="settings.multi-responses-description" />
                </label>
              </FormGroup>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx lg="6" className="mb-4">
          <Card style={{height:"100%"}}>
            <CardBody>
              <CardTitle>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                  <IntlMessages id='survey.settings' /> | <IntlMessages id='menu.style' />
                  <Button color="secondary" outline onClick={updateStyles}>
                     <IntlMessages id="menu.save" />
                  </Button>
                </div>
                
              </CardTitle>
              <Row>
                <IconButton className = { bold ? "toolSelected" : ""} component="span" onClick={() => setBold(!bold)}>
                  <FormatBoldIcon/>         
                </IconButton>
                <IconButton className= { italic ? "toolSelected" : ""} component="span" onClick={() => setItalic(!italic)}>
                    <FormatItalicIcon/>         
                </IconButton>
                <IconButton className = { underline ? "toolSelected" : ""}  component="span" onClick={() => setUnderline(!underline)}>
                    <FormatUnderlinedIcon/>         
                </IconButton>
              </Row>
              <Row>
                   <div style={{display:'flex',alignItems:'center'}}>
                        <label className="h6" style={{marginBottom:'0'}}>
                          <IntlMessages id="settings.font-color" />
                        </label>
                        <IconButton  aria-describedby={id_TColor}  onClick={hanldleFormatColorTextButton} className='FormatColorTextIcon' component="span" >
                            <FormatColorTextIcon/>         
                        </IconButton>
                        <Popover
                          id={id_TColor}
                          open={openTcolorPopover}
                          anchorEl={anchorElTColor}
                          onClose={handleCloseFormatColorPopOver}
                          anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                          }}
                          transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                          }}
                      >
                          <SketchPicker color={ textColor } onChangeComplete={ handleChangeTxtColor } />
                      </Popover>
                   </div>
                  
              </Row>
              <label>
                  <IntlMessages id="settings.font-color-description" />
              </label>
              <Row>
                   <div style={{display:'flex',alignItems:'center'}}>
                        <label className="h6" style={{marginBottom:'0',marginRight:'15px'}}>
                          <IntlMessages id="settings.font-size" />
                        </label>
                        <FormControl>
                          <Select
                              native
                              value={state.fontSize}
                              onChange={handleChangeFont}
                              inputProps={{
                                  name: 'fontSize',
                                  id: 'fontSize-native-simple',
                              }}
                              >
                              <option aria-label="None" value="" />
                              {FONT_SIZE.map((item)=>(
                                  <option value={item.text}>{item.text}</option>
                              ))}
                              {/* <option value={10}>Ten</option>
                              <option value={20}>Twenty</option>
                              <option value={30}>Thirty</option> */}

                          </Select>
                      </FormControl> 
                   </div>  
              </Row>
              <label>
                  <IntlMessages id="settings.font-size-description" />
              </label>
              <Row>
                   <div style={{display:'flex',alignItems:'center'}}>
                        <label className="h6" style={{marginBottom:'0',marginRight:'15px'}}>
                          <IntlMessages id="settings.font-family" />
                        </label>
                        <FormControl>
                          <Select
                              native
                              value={state.fontFamily}
                              onChange={handleChangeFontFamily}
                              inputProps={{
                                  name: 'fontFamily',
                                  id: 'fontFamily-native-simple',
                              }}
                              >
                              <option aria-label="None" value="" />
                              {FONT_FAMILY_ITEMS.map((item)=>(
                                  <option value={item.text}>{item.text}</option>
                              ))}

                          </Select>
                      </FormControl> 
                   </div>  
              </Row>
              <label>
                  <IntlMessages id="settings.font-family-description" />
              </label>
            </CardBody>
          </Card>
        </Colxx>
      
      </Row>
    </>
  )
};

const mapStateToProps = ({ survey }) => {
  const {
    surveyItem,
    error,
    loading
  } = survey;

  return {
    surveyItem,
    error,
    loading
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    shareSurveyItemAction: shareSurveyItem,
    changeStyleSurveyItemAction: changeStyleSurveyItem,
    activeSurveyItemAction: activeSurveyItem,
    setMultiResponsesSurveyItemAction: setMultiResponsesSurveyItem,
  })(SurveySettings)
);