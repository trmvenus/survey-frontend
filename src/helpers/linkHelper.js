import { shareEmailSurveyPath } from "../constants/defaultValues";

export const getRandomLinkId = () => {
  return 'xxxyxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 26 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return String.fromCharCode(97 + v);
  });
};

export const getDefaultEmailLinkContent = (link_id, contacts_file = "") => {
  return `
  <p>Hello, {FirstName}.</p>
  <p>{enter your message here}</p>
  <p>
    <a href="${shareEmailSurveyPath}${link_id}&mode=${contacts_file}">
      Click here to run the survey.
    </a>
  </p>
  <p>Thank you for your time and feedback. We appreciate it.</p>
  <p>Regards.</p>
  <p>@SurveyWizardSite,</p>
  <p>Please note that this message was sent to: {EmailAddress}.</p>
  `;
}

export const getDefaultLinkContent = (link_id, mode) => {
  if (mode == "sms")
    return `Hello, {FirstName}.
    Nice to meet you.
    I hope to listen your review about my survey.
    If you want to review, Please click here.
    "${shareEmailSurveyPath}${link_id}&mode=${mode}"
    Thank you for your time and feedback. We appreciate it.
    Regards.
    @SurveyWizardSite.`;
  else if(mode == "facebook") 
    return `Hello, {FirstName}.
    Nice to meet you.
    I hope to listen your review about my survey.
    If you want to review, Please click here.
    "${shareEmailSurveyPath}${link_id}&mode=${mode}"
    Thank you for your time and feedback. We appreciate it.
    Regards.
    @SurveyWizardSite.  
    Please note that this message was sent to: {EmailAddress}.`;
  else if(mode == "twitter") 
    return `Hello, {FirstName}.
    Nice to meet you.
    I hope to listen your review about my survey.
    If you want to review, Please click here.
    "${shareEmailSurveyPath}${link_id}&mode=${mode}"
    Thank you for your time and feedback. We appreciate it.
    Regards.
    @SurveyWizardSite.  
    Please note that this message was sent to: {EmailAddress}.`;
}


