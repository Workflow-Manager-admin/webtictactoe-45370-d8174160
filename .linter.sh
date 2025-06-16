#!/bin/bash
cd /home/kavia/workspace/code-generation/webtictactoe-45370-d8174160/webtictactoe
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

