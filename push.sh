echo Commit message?
read msg
echo ""
git add -A
git commit -m "$msg"
git push origin master