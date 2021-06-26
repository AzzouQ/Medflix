/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

const mail = functions.config().nodemail.mail;
const password = functions.config().nodemail.password;

const REPORT_PERCENTAGE = 0.1;

const mailTransport = nodemailer.createTransport({
  host: "smtp.mail.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: mail,
    pass: password,
  },
});

admin.initializeApp();

// Authenticate to Algolia Database.
// TODO: Make sure you configure the `algolia.app_id` and `algolia.api_key`
//  Google Cloud environment variables.
const algoliasearch = require("algoliasearch").default;
const client = algoliasearch(
    functions.config().algolia.app_id,
    functions.config().algolia.api_key,
);

// Name fo the algolia index
const ALGOLIA_POSTS_INDEX_NAME = "medflix";

const index = client.initIndex(ALGOLIA_POSTS_INDEX_NAME);

/**
 * Send mail if too much report.
 * @param {Object} videoObject Object that represent all the info of a video
 * @return {null}
 */
async function sendMail(videoObject) {
  const mailOptions = {
    from: "chichke@mail.com",
    to: "bastien.silhol@epitech.eu",
  };
    // Building Email message.
  mailOptions.subject = "Report";
  mailOptions.text = `title: ${videoObject.title}\n
                      id: ${videoObject.objectID}\n
                      url: ${videoObject.url}\n
                      like: ${videoObject.like}\n
                      view: ${videoObject.view}\n
                      owner: ${videoObject.owner}\n`;

  try {
    await mailTransport.sendMail(mailOptions);
  } catch (error) {
    functions.logger.error(
        "There was an error while sending the email:",
        error,
    );
  }
  return null;
}
// Updates the search index when new videos entries are created or updated.
exports.indexentry = functions.database
    .ref("/videos/{videoId}")
    .onWrite(async (data, context) => {
      if (data.before.val() &&
       data.before.val().flagged !== data.after.val().flagged) {
        return null;
      }

      const firebaseObject = {
        title: data.after.val().title,
        createDate: data.after.val().createDate,
        description: data.after.val().description,
        owner: data.after.val().owner,
        url: data.after.val().url,
        like: data.after.val().like,
        thumbnail: data.after.val().thumbnail,
        view: data.after.val().view,
        report: data.after.val().report,
        objectID: context.params.videoId,
      };

      await index.saveObject(firebaseObject);

      if (firebaseObject.report > firebaseObject.view * REPORT_PERCENTAGE &&
         data.after.val().flagged === false) {
        sendMail(firebaseObject);
        return data.after.ref.update({
          flagged: true,
        });
      }

      return null;
    });
