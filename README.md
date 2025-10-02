# Language Learning App

A language learning web app for learning and practicing Japanese with text, built with python and nextjs.

Currently in progress.

# The Vision

When I set out to learn Japanese in around 2014, I found myself in an online Japanese language learning community that was tightly in communion with the open source community. Thanks to the people on the many forums at the time (rip the rtk forum) I was introduced to github for the first time and used many open source language learning software tools in my journey.

This is a love letter to that scene.

# Feature progress

- [x] [Custom Japanese-English dictionary psql database](https://github.com/helboi4/japanese-dict-db) with indexing for kanji and kana words for quick lookup
- [x] API endpoint that parses large blocks of Japanese text into individual words and sends back json containing each word and its possible definitions from the db
- [ ] [ML model made with TensorFlow](https://github.com/helboi4/tensorflow-translation-model/tree/main) that understands how to translate Japanese into English
- [ ] API endpoint that calls the model and retruns English text
- [ ] Frontend textbox form that calls the above two endpoints on submit and displays the data
- [ ] Frontend interactive display of the original Japanese text that shows definitions on click of the word, side by side with english translation
- [ ] API endpoint that takes a list of saved words and creates an anki deck from them and download button on frontend
- [ ] Login functionality (user db, endpoints, UI)
- [ ] Functionality to keep saved words for later
- [ ] Proprietary SRS algorithm that saves users progress to the db
- [ ] Flashcard UI on new frontend page
- [ ] Implementation of smart flashcard ordering a la [morphman](https://github.com/kaegi/MorphMan)
