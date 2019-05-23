echo Commit message?
read msg
echo ""
sudo git add -A
git commit -m "$msg"
git push origin master