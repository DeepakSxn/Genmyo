/**
 * Google Form -> Mirror Agent registration 
 *
 * Maps questions by TITLE so the same script works on staging and prod forms
 * (only change REGISTER_URL per environment).
 *
 * Expected question titles (case-insensitive substring match):
 *   First Name, Surname, Email, Date of Birth / DOB, WhatsApp / Phone,
 *   Country, City, Notes / Context
 */

var REGISTER_URL = "https://hb4ngs4y66.execute-api.ap-south-1.amazonaws.com/register";

function onFormSubmit(e) {
  var payload = buildRegisterPayload(e);
  if (!payload.phone) {
    Logger.log("ERROR: phone missing. Check form question titles. Payload=" + JSON.stringify(payload));
    return;
  }
  var res = UrlFetchApp.fetch(REGISTER_URL, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });
  Logger.log("register status=" + res.getResponseCode() + " body=" + res.getContentText());
}

function buildRegisterPayload(e) {
  var payload = {
    firstName: "",
    surname: "",
    email: "",
    dob: "",
    phone: "",
    country: "",
    city: "",
    notes: "",
  };

  e.response.getItemResponses().forEach(function (ir) {
    var title = String(ir.getItem().getTitle() || "").toLowerCase();
    var value = String(ir.getResponse() || "").trim();
    if (!value) return;

    if (title.indexOf("first name") >= 0 || title.indexOf("firstname") >= 0) {
      payload.firstName = value;
    } else if (title.indexOf("surname") >= 0 || title.indexOf("last name") >= 0) {
      payload.surname = value;
    } else if (title.indexOf("email") >= 0) {
      payload.email = value;
    } else if (title.indexOf("date of birth") >= 0 || title === "dob" || title.indexOf("birth") >= 0) {
      payload.dob = value;
    } else if (title.indexOf("whatsapp") >= 0 || title.indexOf("phone") >= 0 || title.indexOf("mobile") >= 0) {
      payload.phone = value;
    } else if (title.indexOf("country") >= 0) {
      payload.country = value;
    } else if (title.indexOf("city") >= 0) {
      payload.city = value;
    } else if (title.indexOf("note") >= 0 || title.indexOf("context") >= 0) {
      payload.notes = value;
    }
  });

  return payload;
}

/** Run once from Apps Script editor to verify mapping without submitting the form. */
function debugLastResponseMapping() {
  var form = FormApp.getActiveForm();
  var responses = form.getResponses();
  if (!responses.length) {
    Logger.log("No responses yet.");
    return;
  }
  var last = responses[responses.length - 1];
  var fakeEvent = { response: last };
  Logger.log(JSON.stringify(buildRegisterPayload(fakeEvent), null, 2));
}
