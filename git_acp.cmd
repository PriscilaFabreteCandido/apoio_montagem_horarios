@echo off

set /p commitMessage=Digite a mensagem do commit: 

git add .
git commit -m "%commitMessage%"
git push


pause
