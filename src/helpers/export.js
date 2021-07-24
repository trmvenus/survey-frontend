import $ from "jquery";

import * as SurveyCore from "survey-core";
import * as widgets from "surveyjs-widgets";
import * as SurveyPDF from "survey-pdf";

//widgets.icheck(SurveyCore, $);
widgets.prettycheckbox(SurveyCore);
widgets.select2(SurveyCore, $);
widgets.inputmask(SurveyCore);
widgets.jquerybarrating(SurveyCore, $);
widgets.jqueryuidatepicker(SurveyCore, $);
widgets.nouislider(SurveyCore);
widgets.select2tagbox(SurveyCore, $);
//widgets.signaturepad(SurveyCore);
widgets.sortablejs(SurveyCore);
widgets.ckeditor(SurveyCore);
widgets.autocomplete(SurveyCore, $);
widgets.bootstrapslider(SurveyCore);

export const savePDF = (filename, surveyJson, resultJson = {}) => {
  var surveyPDF = new SurveyPDF.SurveyPDF(surveyJson);
  surveyPDF.data = resultJson;
  surveyPDF.save(filename);
};

export const exportToPPT = (reportsData) => {
  console.log(reportsData)
}

export const exportToExcel = (reportsData) => {
  console.log()
}