

export const getRandomLinkId = () => {
  return 'xxxyxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 26 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return String.fromCharCode(97+v);  
  });
};

export const getDefaultEmailLinkContent = (link_id) => {
  return `
  <p>Hello, {FirstName}.</p>
  <p>{enter your message here}</p>
  <p>
    <a href="${window.location.origin}/share/run?id=${link_id}">
      Click here to run the survey.
    </a>
  </p>
  <p>Thank you for your time and feedback. We appreciate it.</p>
  <p>Regards.</p>
  <p>@SurveyWizardSite,</p>
  <p>Please note that this message was sent to: {EmailAddress}.</p>
  `;
}