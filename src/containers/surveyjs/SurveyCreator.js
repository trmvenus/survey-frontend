import React, { useEffect, useState } from "react";
import * as SurveyKo from "survey-knockout";
import * as SurveyJSCreator from "survey-creator";
import "survey-creator/survey-creator.css";

import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import "jquery-bar-rating/dist/themes/css-stars.css";
import "jquery-bar-rating/dist/themes/fontawesome-stars.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";

//import "icheck/skins/square/blue.css";
import "pretty-checkbox/dist/pretty-checkbox.css";

import * as widgets from "surveyjs-widgets";

SurveyJSCreator.StylesManager.applyTheme("default");

//widgets.icheck(SurveyKo, $);
widgets.prettycheckbox(SurveyKo);
widgets.select2(SurveyKo, $);
widgets.inputmask(SurveyKo);
widgets.jquerybarrating(SurveyKo, $);
widgets.jqueryuidatepicker(SurveyKo, $);
widgets.nouislider(SurveyKo);
widgets.select2tagbox(SurveyKo, $);
//widgets.signaturepad(SurveyKo);
widgets.sortablejs(SurveyKo);
widgets.ckeditor(SurveyKo);
widgets.autocomplete(SurveyKo, $);
widgets.bootstrapslider(SurveyKo);

const SurveyCreator = ({json = {}, saveSurvey = null}) => {

  var surveyCreator;
  
  const saveMySurvey = (saveNo, callback) => {
    if (saveSurvey)
      saveSurvey(surveyCreator.JSON);
    
    !!callback && callback(saveNo, true);
  };

  useEffect(() => {
    let options = { 
      showJSONEditorTab: false,
      showTranslationTab: true,
      showLogicTab: true,
      showState: true,
      showOptions: false,
      isAutoSave: false,
    };

    surveyCreator = new SurveyJSCreator.SurveyCreator(
      null,
      options
    );

    surveyCreator.toolbox.removeItem("panel");
    surveyCreator.toolbox.removeItem("paneldynamic");
    surveyCreator.toolbox.removeItem("matrixdynamic");

    surveyCreator.saveSurveyFunc = saveMySurvey;

    surveyCreator.render("surveyCreatorContainer");
    
    surveyCreator.changeText(JSON.stringify(json));
  }, []);

  return (<div>
    <script type="text/html" id="custom-tab-survey-templates">
      {`<div id="test">TEST</div>`}
    </script>

    <div id="surveyCreatorContainer" />
  </div>);
}

export default SurveyCreator;
