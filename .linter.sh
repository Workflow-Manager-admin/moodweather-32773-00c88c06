#!/bin/bash
cd /home/kavia/workspace/code-generation/moodweather-32773-00c88c06/moodweather_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

