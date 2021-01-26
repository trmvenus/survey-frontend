const getTitle = (item, locale) => {
	if ("title" in item) {
		const title = item.title;
		if (typeof title === "string" || typeof title === "number") {
			return title;
		} else {
			if (locale in title) {
				return title[locale];
			} else {
				if ("default" in title) {
					return title["default"];
				} else {
					return item.name;
				}
			}
		}
	} else {
		return item.name;
	}
}

const getText = (item, locale) => {
	if ("text" in item) {
		const text = item.text;
		if (typeof text === "string" || typeof text === "number") {
			return text;
		} else {
			if (locale in text) {
				return text[locale];
			} else {
				if ("default" in text) {
					return text["default"];
				} else {
					return item.value;
				}
			}
		}
	} else {
		return item.value;
	}
}

const getLabel = (text, defaultValue, locale) => {
	if (typeof text === "string" || typeof text == 'number') {
		return text;
	} else {
		if (locale in text) {
			return text[locale];
		} else {
			if ("default" in text) {
				return text["default"];
			} else {
				return defaultValue;
			}
		}
	}
}

const getChoicesOfQuestion = (element, locale) => {
	var choices = [];
	switch (element.type) {
		case "checkbox":
		case "radiogroup":
		case "dropdown":
		case "imagepicker":
			if (!element.choices)
				break;
			for (let item of element.choices) {
				var choice;
				if (typeof item === 'string' || typeof item === 'number') {
					choice = { value: item, text: item };
				} else {
					choice = { value: item.value, text: getText(item, locale) };
					if ("score" in item) {
						choice.score = item.score;
					}
				}
				choice.count = 0;
				choices.push(choice);
			}
			break;
		case "rating":
			if ("rateValues" in element) {
				for (let item of element.rateValues) {
					var choice;
					if (typeof item === 'string' || typeof item === 'number') {
						choice = { value: item, text: item };
					} else {
						choice = { value: item.value, text: getText(item, locale) };
						if ("score" in item) {
							choice.score = item.score;
						}
					}
					choice.count = 0;
					choices.push(choice);
				}
			} else {
				let rateMin = 1;
				let rateMax = 5;
				let rateStep = 1;
				if ("rateMax" in element) {
					rateMax = element.rateMax;
				}
				if ("rateMin" in element) {
					rateMin = element.rateMin;
				}
				if ("rateStep" in element) {
					rateStep = element.rateStep;
				}

				for (var i = rateMin; i <= rateMax; i += rateStep) {
					choices.push({ value: i, text: i, count: 0 });
				}
			}
			break;
		case "boolean":
			var labelTrue = { value: true, count: 0 };
			if ("labelTrue" in element) {
				labelTrue.text = getLabel(element.labelTrue, "YES", locale);
				if (typeof element.labelTrue !== "string" && "score" in element.labelTrue) {
					labelTrue.score = element.labelTrue.score;
				}
			} else {
				labelTrue.text = "YES"
			}
			choices.push(labelTrue);

			var labelFalse = { value: false, count: 0 };
			if ("labelFalse" in element) {
				labelFalse.text = getLabel(element.labelFalse, "NO", locale);
				if (typeof element.labelFalse !== "string" && "score" in element.labelFalse) {
					labelFalse.score = 0;
				}
			} else {
				labelFalse.text = "NO"
			}
			choices.push(labelFalse);
			break;
	}

	return choices;
}

export const getQuestions = (surveyjson, locale) => {
	var pages = [];
	if ("pages" in surveyjson) {
		for (let page of surveyjson.pages) {
			var questions = [];
			if ("elements" in page) {
				for (let element of page.elements) {
					var question = {}

					question["name"] = element.name;
					question["title"] = getTitle(element, locale);
					question["type"] = element.type;
					question["choices"] = getChoicesOfQuestion(element, locale);

					questions.push(question);
				}
			}

			pages.push({ title: getTitle(page, locale), questions: questions });
		}
	}
	return pages;
}

export const getPagesCount = (survey) => {
	try {
		if (survey && survey.pages)
			return survey.pages.length;
		else
			return 0;
	} catch (error) {
		console.log(">>>>: src/helpers/Utils.js : getPagesCount -> error", error);
		return 0;
	}
}

export const getQuestionsCount = (survey) => {
	try {
		if (survey && survey.pages) {
			var questions = 0;
			for (let page of survey.pages) {
				questions += page.elements ? page.elements.length : 0;
			}
			return questions;
		}
		else
			return 0;
	} catch (error) {
		console.log(">>>>: src/helpers/Utils.js : getQuestionsCount -> error", error);
		return 0;
	}
}

export const getQuestionOptions = (questions) => {
	const questionOptions = [];
	for (let page of questions) {
		const pageOptions = [];
		for (let question of page.questions) {
			if (['boolean', 'radiogroup', 'dropdown', 'imagepicker', 'rating'].includes(question.type)) {
				pageOptions.push({
					label: question.title,
					value: question.name,
				});
			}
		}
		questionOptions.push({
			label: page.title,
			options: pageOptions,
		})
	}
	return questionOptions;
}

export const getSummaryQuestions = (questions) => {
	const summaryQuestions = [];
	for (let page of questions) {
		for (let question of page.questions) {
			if (['boolean', 'radiogroup', 'dropdown', 'imagepicker', 'rating', 'checkbox', 'matrix', 'matrixdropdown'].includes(question.type)) {
				summaryQuestions.push(question);
			}
		}
	}
	return summaryQuestions;
}

export const getCrossTabQuestionOptions = (questions) => {
	const ctQuestionOptions = [];
	for (let page of questions) {
		const pageOptions = [];
		for (let question of page.questions) {
			if (['boolean', 'radiogroup', 'dropdown', 'imagepicker', 'rating', 'checkbox'].includes(question.type)) {
				pageOptions.push({
					label: question.title,
					value: question.name,
				});
			}
		}
		ctQuestionOptions.push({
			label: page.title,
			options: pageOptions,
		})
	}
	return ctQuestionOptions;
}

export const getOpenEndQuestionOptions = (questions) => {
	const oeQuestionOptions = [];
	for (let page of questions) {
		const pageOptions = [];
		for (let question of page.questions) {
			if (['text', 'comment'].includes(question.type)) {
				pageOptions.push({
					label: question.title,
					value: question.name,
				});
			}
		}
		oeQuestionOptions.push({
			label: page.title,
			options: pageOptions,
		})
	}
	return oeQuestionOptions;
}

const getColumnsOfMatrx = (element, locale) => {
	const columns = [];
	if (element.type == "matrix") {
		for (let item of element.columns) {
			var choice;
			if (typeof item === 'string' || typeof item === 'number') {
				choice = { value: item, text: item };
			} else {
				choice = { value: item.value, text: getText(item, locale) };
				if ("score" in item) {
					choice.score = item.score;
				}
			}
			columns.push(choice);
		}
	}
	return columns;
}

const getColumnsOfMatrxDropDown = (element, locale) => {
	const columns = [];
	if (element.type == "matrixdropdown") {
		for (let item of element.columns) {
			var choice;
			if (typeof item === 'string' || typeof item === 'number') {
				choice = { value: item, text: item };
			} else {
				choice = { value: item.name, text: getTitle(item, locale) };
				if ("score" in item) {
					choice.score = item.score;
				}
			}
			columns.push(choice);
		}
	}
	return columns;
}

const getRowsOfMatrix = (element, locale) => {
	const rows = [];
	if (element.type == "matrix" || element.type == "matrixdropdown") {
		for (let item of element.rows) {
			var choice;
			if (typeof item === 'string' || typeof item === 'number') {
				choice = { value: item, text: item };
			} else {
				choice = { value: item.value, text: getText(item, locale) };
				if ("score" in item) {
					choice.score = item.score;
				}
			}

			choice.responses = 0;
			choice.counts = Array(element.columns.length).fill(0);

			rows.push(choice);
		}
	}
	return rows;
}

const getChoicesOfMatrix = (element, locale) => {
	const choices = [];
	if (element.type == "matrix" || element.type == "matrixdropdown") {
		for (let item of element.choices) {
			var choice;
			if (typeof item === 'string' || typeof item === 'number') {
				choice = { value: item, text: item };
			} else {
				choice = { value: item.value, text: getText(item, locale) };
				if ("score" in item) {
					choice.score = item.score;
				}
			}
			choices.push(choice);
		}
	}
	return choices;
}

export const filterResults = (results, filter) => {
	return results.filter((result) => {
		let edate = result.created_at;
		result = result.json;

		var isFilter = true;
		if (filter.conditionFilter == true) {
			if (filter.conditions) {
				for (let cond of filter.conditions) {
					isFilter = isFilter && ((result[cond.question] == cond.option) == (cond.operator == "equal"));
				}
			}
		}
		if (filter.dateFilter == true) {
			let startDate = new Date(filter.startDate);
			let endDate = new Date(filter.endDate);
			let reportDate = new Date(edate);

			isFilter = isFilter && ((startDate <= reportDate) && (reportDate <= endDate));
		}

		return isFilter;
	});
}

export const hasScore = (element) => {
	let score = 0;
	switch (element.type) {
		case "boolean":
			break;
		case "rating":
			if (!element.score || !("choices" in element.score)) {
				break;
			}
		case "radiogroup":
		case "dropdown":
		case "imagepicker":
		case "checkbox":
			for (let choice of element.choices) {
				if (typeof choice == "object" && "score" in choice) {
					score = (score < choice.score ? choice.score : score);
				}
			}
			break;

	}
	element.score = score;
	return element.score != 0;
}

export const genSummaryReport = function (surveyjson, results, content, locale) {
	var questions = [];

	try {
		if ("pages" in surveyjson) {
			for (let page of surveyjson.pages) {
				if ("elements" in page) {
					for (let element of page.elements) {

						if ("pillar" in content) {
							if (!("pillar" in element)) {
								continue;
							} else if (element.pillar != content.pillar) {
								continue;
							}
						}
						if ("invisibles" in content && content.invisibles.length != 0) {
							if (content.invisibles.includes(element.name)) {
								continue;
							}
						}

						element.title = getTitle(element, locale);

						var question = {};
						question.name = element.name;
						question.title = element.title;
						question.type = element.type;
						question.responses = 0;

						var isEmpty = false;

						switch (element.type) {
							case "checkbox":
								question.choices = getChoicesOfQuestion(element);

								for (let result of results) {
									result = result.json;
									if (element.name in result) {
										var selecteditems = result[element.name];
										for (let selecteditem of selecteditems) {
											var pos = question.choices.findIndex(x => x.value === selecteditem);
											if (pos != -1) {
												question.choices[pos].count++;
												question.responses++;
											}
										}
									}
								}

								var hasScore = false;
								var maxScore = 0;
								for (let choice of question.choices) {
									if ("score" in choice) {
										hasScore = true;
										maxScore = (maxScore < choice.score ? choice.score : maxScore);
									}
								}

								if (hasScore) {
									question.totalscore = 0;
									question.maxscore = maxScore * question.responses;
									for (let choice of question.choices) {
										if ("score" in choice) {
											question.totalscore += choice.count * choice.score;
										}
									}
									question.score = (question.totalscore * 100 / question.maxscore).toFixed(2);
								}

								break;
							case "radiogroup":
							case "dropdown":
							case "imagepicker":
							case "rating":
							case "boolean":
								question.choices = getChoicesOfQuestion(element);

								for (let result of results) {
									result = result.json;
									if (element.name in result) {
										var pos = question.choices.findIndex(x => x.value === result[element.name]);
										if (pos != -1) {
											question.choices[pos].count++;
											question.responses++;
										}
									}
								}

								var hasScore = false;
								var maxScore = 0;
								for (let choice of question.choices) {
									if ("score" in choice) {
										hasScore = true;
										maxScore = (maxScore < choice.score ? choice.score : maxScore);
									}
								}

								if (hasScore) {
									question.totalscore = 0;
									question.maxscore = maxScore * question.responses;
									for (let choice of question.choices) {
										if ("score" in choice) {
											question.totalscore += choice.count * choice.score;
										}
									}
									question.score = (question.totalscore * 100 / question.maxscore).toFixed(2);
								}
								break;
							case "matrix":
								question.columns = getColumnsOfMatrx(element, locale);
								question.rows = getRowsOfMatrix(element, locale);

								for (let result of results) {
									result = result.json;
									if (element.name in result) {
										var res = result[element.name];
										for (let row of question.rows) {
											if (row.value in res) {
												pos = question.columns.findIndex(x => x.value == res[row.value]);

												if (pos != -1) {
													row.counts[pos]++;
													row.responses++;
												}
											}
										}
										question.responses++;
									}
								}

								var hasScore = false;
								var maxScore = 0;
								for (let column of question.columns) {
									if ("score" in column) {
										hasScore = true;
										maxScore = (maxScore < column.score ? column.score : maxScore);
									}
								}

								if (hasScore) {
									question.totalscore = 0;
									question.maxscore = 0;
									for (let row of question.rows) {
										row.totalscore = 0;
										row.maxscore = maxScore * row.responses;
										for (var i = 0; i < question.columns.length; i++) {
											let column = question.columns[i];
											if ("score" in column) {
												row.totalscore += row.counts[i] * column.score;
											}
										}

										question.totalscore += row.totalscore;
										question.maxscore += row.maxscore;

										if (row.maxscore != 0) {
											row.score = ((row.totalscore * 100) / row.maxscore).toFixed(2);
										}
									}

									if (question.maxscore != 0) {
										question.score = ((question.totalscore * 100) / question.maxscore).toFixed(2);
									}
								}
								break;
							case 'matrixdropdown':
								question.columns = getColumnsOfMatrxDropDown(element, locale);
								question.rows = getRowsOfMatrix(element, locale);
								question.choices = getChoicesOfMatrix(element, locale);

								for (let choice of question.choices) {
									choice.count = [];
									for (let i = 0; i < question.rows.length; i++) {
										choice.count[i] = Array(question.columns.length).fill(0);
									}
								}

								for (let result of results) {
									result = result.json;
									if (element.name in result) {
										var res = result[element.name];
										for (let i = 0; i < question.rows.length; i++) {
											const row = question.rows[i];
											if (row.value in res) {
												var rowres = res[row.value];

												for (let j = 0; j < question.columns.length; j++) {
													const col = question.columns[j];
													if (col.value in rowres) {
														pos = question.choices.findIndex(x => x.value == rowres[col.value]);

														question.choices[pos].count[i][j]++;
													}
												}
											}
										}
										question.responses++;
									}
								}

								var hasScore = false;
								var maxScore = 0;
								for (let choice of question.choices) {
									if ("score" in choice) {
										hasScore = true;
										maxScore = (maxScore < choice.score ? choice.score : maxScore);
									}
								}

								if (hasScore) {
									question.totalscore = 0;
									question.maxscore = 0;
									for (let choice of question.choices) {
										if ("score" in choice) {
											let sum = 0;
											for (let i = 0; i < question.rows.length; i++) {
												for (let j = 0; j < question.columns.length; j++) {
													sum += choice.count[i][j];
												}
											}

											choice.totalscore = choice.score * sum;

											question.totalscore += choice.totalscore;
										}
									}

									question.maxscore = maxScore * question.rows.length * question.columns.length * question.responses;

									if (question.maxscore != 0) {
										question.score = ((question.totalscore * 100) / question.maxscore).toFixed(2);
									}
								}

								break;
							default:
								isEmpty = true;
								break;
						}

						if (!isEmpty) {
							questions.push(question);
						}
					}
				}
			}
		}

		var totalscore = 0;
		var maxscore = 0;
		var overallscore = 0;
		for (let question of questions) {
			if ("score" in question) {
				totalscore += question.totalscore;
				maxscore += question.maxscore;
			}
		}

		if (maxscore != 0) {
			overallscore = ((totalscore * 100) / maxscore).toFixed(2);
		}

		if ("orders" in content) {
			var sortedquestions = [];
			for (let qname of content.orders) {
				var question = questions.find((x) => x.name == qname);
				if (question) {
					sortedquestions.push(question);
				}
			}
			for (let question of questions) {
				if (content.orders.includes(question.name)) {
					continue;
				}
				sortedquestions.push(question);
			}

			questions = sortedquestions;
		} else {
			content.orders = [];
		}

		return {
			result: "success",
			questions: questions,
			overallscore: overallscore,
			totalscore: totalscore,
			maxscore: maxscore
		};
	} catch (e) {
		console.log("Error occurred while writing cross-tab report");
		console.log(e);

		return {
			result: "error",
			message: "Error occurred while writing open-end report"
		}
	}
}

export const genCrossTabReport = (surveyjson, results, content, locale) => {
	try {
		var datatable = [];
		var totalresponse = 0;
		var rowquestion = null;
		var colquestion = null;
		var rowresponses = [];
		var colresponses = [];

		if ("pages" in surveyjson) {
			for (let page of surveyjson.pages) {
				if ("elements" in page) {
					for (let element of page.elements) {
						if (element.name == content.horizontal) {
							rowquestion = {
								name: element.name,
								title: getTitle(element, locale),
								choices: getChoicesOfQuestion(element, locale),
							};
						}
						if (element.name == content.vertical) {
							colquestion = {
								name: element.name,
								title: getTitle(element, locale),
								choices: getChoicesOfQuestion(element, locale)
							};
						}
					}
				}
			}
		}

		if (rowquestion != null && colquestion != null) {
			datatable = [];
			for (let rowno in rowquestion.choices) {
				datatable[rowno] = [];
				for (let colno in colquestion.choices) {
					datatable[rowno][colno] = { response: 0, percent: 0.0 };
				}
			}

			rowresponses = Array(rowquestion.choices.length).fill(0);
			colresponses = Array(colquestion.choices.length).fill(0);

			for (let result of results) {
				result = result.json;
				if (rowquestion.name in result && colquestion.name in result) {
					var rowname = result[rowquestion.name];
					var colname = result[colquestion.name];

					var rowno = rowquestion.choices.findIndex(x => x.value.toString() === rowname.toString());
					var colno = colquestion.choices.findIndex(x => x.value.toString() === colname.toString());

					if (rowno != -1 && colno != -1) {
						datatable[rowno][colno].response++;
						rowresponses[rowno]++;
						colresponses[colno]++;
						totalresponse++;
					}
				}
			}

			for (let row in rowquestion.choices) {
				for (let col in colquestion.choices) {
					datatable[row][col].percent = (100 * datatable[row][col].response / rowresponses[row]).toFixed(2);
				}
			}
		} else {
			return {
				result: "error",
				message: "Couldn't find questions that was used to write this report."
			}
		}

		return {
			result: "success",
			datatable: datatable,
			rowquestion: rowquestion,
			colquestion: colquestion,
			rowresponses: rowresponses,
			colresponses: colresponses,
			totalresponse: totalresponse
		}
	} catch (e) {
		console.log("Error occurred while writing cross-tab report");
		console.log(e);

		return {
			result: "error",
			message: "Error occurred while writing open-end report"
		}
	}
}

export const genOpenEndReport = (surveyjson, results, content, locale) => {
	var answers = [];
	var totalresponse = 0;
	try {
		var openendquestion = null;
		if ("pages" in surveyjson) {
			for (let page of surveyjson.pages) {
				if ("elements" in page) {
					for (let element of page.elements) {
						if (element.name == content.openend) {
							openendquestion = element;
						}
					}
				}
			}
		}

		if (openendquestion != null) {
			for (let result of results) {
				const json = result.json;
				if (openendquestion.name in json) {
					answers.push({ name: result.username, text: json[openendquestion.name] });
					totalresponse++;
				}
			}
		} else {
			return {
				result: "error",
				message: "Couldn't find a question that was used to write this report."
			}
		}
	} catch (e) {
		console.log("Error occurred while writing open-end report");
		console.log(e);

		return {
			result: "error",
			message: "Error occurred while writing open-end report"
		}
	}

	return {
		result: "success",
		answers: answers,
		totalresponse: totalresponse
	};
}

export const genQuestionScoreReport = (surveyjson, results, content, locale) => {
	var questions = [];
	try {
		if ("pages" in surveyjson) {
			for (let page of surveyjson.pages) {
				if ("elements" in page) {
					for (let element of page.elements) {
						if (["boolean", "radiogroup", "dropdown", "imagepicker", "rating", "checkbox"].includes(element.type)) {
							if (hasScore(element)) {
								var responses = 0;
								var pointsobtained = 0;
								var totalpoints = 0;
								var score = 0;

								var questiontitle = getTitle(element);

								if (element.type == 'boolean') {
									for (let result of results) {
										result = result.json;
										if (element.name in result) {
											responses++;

											if (result[element.name]) {
												pointsobtained += element.score;
											}

										}
									}
								} else if (element.type == 'radiogroup' || element.type == 'dropdown' || (element.type == 'imagepicker' && !("multiselect" in element))) {
									for (let result of results) {
										result = result.json;
										if (element.name in result) {
											responses++;

											var value = result[element.name];

											for (let choice of element.choices) {
												if (choice.value == value) {
													if ("score" in choice) {
														pointsobtained += choice.score;
													}
												}
											}
										}
									}
								} else if (element.type == 'checkbox' || (element.type == 'imagepicker' && ("multiselect" in element))) {
									for (let result of results) {
										result = result.json;
										if (element.name in result) {
											responses++;

											var values = result[element.name];

											for (let value of values) {
												for (let choice of element.choices) {
													if (choice.value == value) {
														if ("score" in choice) {
															pointsobtained += choice.score;
														}
													}
												}
											}
										}
									}
								}

								totalpoints = element.score * responses;
								score = (100 * pointsobtained / totalpoints).toFixed(2);

								questions.push({
									questiontitle: questiontitle,
									responses: responses,
									pointsobtained: pointsobtained,
									totalpoints: totalpoints,
									score: score
								});
							}
						}
					}
				}
			}
		}
	} catch (e) {
		console.log("Error occurred while writing question-score report");
		console.log(e);

		return {
			result: "error",
			message: "Error occurred while writing open-end report"
		}
	}

	return {
		result: "success",
		questions: questions
	};
}

export const getAllQuestions = (surveyjson, locale) => {
	var questions = [];
	var qno = 0;
	if ("pages" in surveyjson) {
		for (let page of surveyjson.pages) {
			if ("elements" in page) {
				for (let element of page.elements) {
					var question = {}

					question.no = qno++;
					question.name = element.name;
					question.title = getTitle(element, locale);
					question.type = element.type;

					if (["radiogroup", "dropdown", "imagepicker", "rating", "boolean"].includes(element.type)) {
						if ((element.type == "imagepicker") && ("multiselect" in element)) {
							question.choiceable = 2;
						} else {
							question.choiceable = 1; // single select
							question.choices = getChoicesOfQuestion(element, locale);
						}
					} else if (["matrix", "checkbox"].includes(element.type)) {
						question.choiceable = 2;
					} else {
						question.choiceable = 0;
					}

					questions.push(question);
				}
			}
		}
	}
	return questions;
}

export const getChoiceOptions = (questions, questionName) => {
	for (const page of questions) {
		for (const question of page.questions) {
			if (question.name === questionName) {
				return question.choices.map(choice => ({ value: choice.value, label: choice.text }));
			}
		}
	}
	return [];
}