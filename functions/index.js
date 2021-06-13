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

// Updates the search index when new videos entries are created or updated.
exports.indexentry = functions.database
    .ref("/videos/{videoId}")
    .onWrite(async (data, context) => {
      const index = client.initIndex(ALGOLIA_POSTS_INDEX_NAME);
      const firebaseObject = {
        title: data.after.val().title,
        createDate: data.after.val().createDate,
        description: data.after.val().description,
        owner: data.after.val().owner,
        url: data.after.val().url,
        objectID: context.params.videoId,
      };

      await index.saveObject(firebaseObject);
    });
