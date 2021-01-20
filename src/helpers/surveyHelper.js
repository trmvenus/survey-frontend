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
  switch(element.type) {
		case "checkbox":
		case "radiogroup":
		case "dropdown":
		case "imagepicker":
			if (!element.choices)
				break;
			for (let item of element.choices) {
				var choice;
				if (typeof item === 'string' || typeof item === 'number') {
					choice = {value: item, text: item};
				} else {
					choice = {value: item.value, text: getText(item, locale)};
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
						choice = {value: item, text: item};
					} else {
						choice = {value: item.value, text: getText(item, locale)};
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

				for (var i = rateMin; i <= rateMax; i+=rateStep) {
					choices.push({value: i, text: i, count: 0});
				}
			}
			break;
		case "boolean":
				var labelTrue = {value: "true", count: 0};
				if ("labelTrue" in element) {
					labelTrue.text = getLabel(element.labelTrue, "YES", locale);
					if (typeof element.labelTrue !== "string" && "score" in element.labelTrue) {
							labelTrue.score = element.labelTrue.score;
					}
				} else {
					labelTrue.text = "YES"
				}
				choices.push(labelTrue);

				var labelFalse = {value: "false", count: 0};
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

			pages.push({title: getTitle(page, locale), questions: questions});
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
      if(['boolean', 'radiogroup', 'dropdown', 'imagepicker', 'rating'].includes(question.type)) {
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

export const getCrossTabQuestionOptions = (questions) => {
  const ctQuestionOptions = [];
  for (let page of questions) {
    const pageOptions = [];
    for (let question of page.questions) {
      if(['boolean', 'radiogroup', 'dropdown', 'imagepicker', 'rating', 'checkbox'].includes(question.type)) {
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
      if(['text', 'comment'].includes(question.type)) {
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