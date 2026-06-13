/**
 * Google Form → Register API (staging)
 * Same as prod script; only REGISTER_URL differs.
 */

var REGISTER_URL = "https://slruck3a27.execute-api.ap-south-1.amazonaws.com/prod/register";

var ENTRY_KEYS = {
  FIRST_NAME: "entry.1907368519",
  SURNAME: "entry.1208177102",
  EMAIL: "entry.44984313",
  DOB: "entry.1640555608",
  WHATSAPP: "entry.1030588086",
  COUNTRY: "entry.1418652324",
  CITY: "entry.142785906",
  CONTEXT: "entry.79544609",
};

function normalizeTitle(title) {
  return String(title || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function matchEntryKey(title) {
  var t = normalizeTitle(title);
  if (!t) return null;

  if (t.indexOf("first") !== -1 && t.indexOf("name") !== -1) {
    return ENTRY_KEYS.FIRST_NAME;
  }
  if (t.indexOf("surname") !== -1 || t.indexOf("last name") !== -1) {
    return ENTRY_KEYS.SURNAME;
  }
  if (t.indexOf("email") !== -1) {
    return ENTRY_KEYS.EMAIL;
  }
  if (t.indexOf("birth") !== -1 || t.indexOf("dob") !== -1) {
    return ENTRY_KEYS.DOB;
  }
  if (t.indexOf("whatsapp") !== -1 || t.indexOf("phone") !== -1) {
    return ENTRY_KEYS.WHATSAPP;
  }
  if (
    t === "country" ||
    (t.indexOf("country") !== -1 &&
      t.indexOf("phone") === -1 &&
      t.indexOf("code") === -1)
  ) {
    return ENTRY_KEYS.COUNTRY;
  }
  if (t.indexOf("city") !== -1) {
    return ENTRY_KEYS.CITY;
  }
  if (
    t.indexOf("context") !== -1 ||
    t.indexOf("interested") !== -1 ||
    t.indexOf("genmyo") !== -1
  ) {
    return ENTRY_KEYS.CONTEXT;
  }

  return null;
}

function responseValue(response) {
  if (response == null) return "";
  if (Array.isArray(response)) return response.join(", ").trim();
  return String(response).trim();
}

function buildRegisterPayload(e) {
  var payload = {};
  if (!e || !e.response) return payload;

  var itemResponses = e.response.getItemResponses();
  for (var i = 0; i < itemResponses.length; i++) {
    var itemResponse = itemResponses[i];
    var title = itemResponse.getItem().getTitle();
    var entryKey = matchEntryKey(title);
    if (!entryKey) continue;
    payload[entryKey] = responseValue(itemResponse.getResponse());
  }

  return payload;
}

function onFormSubmit(e) {
  var payload = buildRegisterPayload(e);
  var options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  };

  var response = UrlFetchApp.fetch(REGISTER_URL, options);
  var status = response.getResponseCode();
  var body = response.getContentText();

  Logger.log("register status=" + status + " body=" + body);

  if (status === 409) {
    Logger.log("User already registered (409)");
    return;
  }

  if (status < 200 || status >= 300) {
    throw new Error("Register API failed: " + status + " " + body);
  }
}

function debugLastResponseMapping() {
  var form = FormApp.getActiveForm();
  var responses = form.getResponses();

  if (responses.length === 0) {
    Logger.log("No form responses yet.");
    return;
  }

  var latest = responses[responses.length - 1];
  var payload = buildRegisterPayload({ response: latest });

  Logger.log("Mapped payload from latest response:");
  Logger.log(JSON.stringify(payload, null, 2));
}
