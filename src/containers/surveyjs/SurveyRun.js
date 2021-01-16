import React, { useEffect, useState } from "react";
import * as Survey from "survey-react";
import * as widgets from "surveyjs-widgets";
import "survey-react/survey.css";

import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import "jquery-bar-rating/dist/themes/css-stars.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";

import "pretty-checkbox/dist/pretty-checkbox.css";

//import "icheck/skins/square/blue.css";
window["$"] = window["jQuery"] = $;
//require("icheck");

// export { MyQuestion } from "./MyQuestion";

Survey.StylesManager.applyTheme("default");

//widgets.icheck(Survey, $);
widgets.prettycheckbox(Survey);
widgets.select2(Survey, $);
widgets.inputmask(Survey);
widgets.jquerybarrating(Survey, $);
widgets.jqueryuidatepicker(Survey, $);
widgets.nouislider(Survey);
widgets.select2tagbox(Survey, $);
//widgets.signaturepad(Survey);
widgets.sortablejs(Survey);
widgets.ckeditor(Survey);
widgets.autocomplete(Survey, $);
widgets.bootstrapslider(Survey);

const SurveyPage = ({surveyJson = {}, resultJson = {}, timeSpent=0, handleOnUpdate}) => {

	const model = new Survey.Model(surveyJson);
	model.data = resultJson;	
	model.timeSpent = timeSpent;
	model.pages[0].timeSpent = timeSpent;

	var timerId;

	const onValueChanged = (result) => {
		handleOnUpdate(result.data, timeSpent)
	}
	
	const onComplete = (result) => {
		clearInterval(timerId);
		handleOnUpdate(result.data, timeSpent, true);
	}

	useEffect(() => {
		timerId = window.setInterval(function() {
			timeSpent ++;
		}, 1000);
	}, [])

	return (
	<div className="container">
		<Survey.Survey
			model={model}
			onComplete={onComplete}
			onValueChanged={onValueChanged}
		/>
	</div>
	);
}

export default SurveyPage;