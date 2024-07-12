# The '(?<=(?:^|\s)#)\d+(?=\s*$|\s+[^\d])' regex checks for first '#<issue-id>' in the PR body
# If there are symbols without spaces before and after '#<issue-id>' like '#1234:' or '.#1234',
# it will not be matched. If there are several '#<issue-id>' in the PR body, only the first one
# will be matched.
#
# !Outdated. That ^ regex is not working properly in Github Actions.
#
# The '(?<=#)\d+' regex checks for the number after '#' in the PR body ignoring any symbols before
# and after it. So 'ad#1234awd' will match '1234'.
ISSUE_NUMBER=$(echo $PR_BODY | grep -oP '(?<=#)\d+' | head -1)
# The '^0*[1-9]\d*(?=\D|$)|^0(?=\D|$)' regex checks for the first number in the branch name
# If the branch name starts with a number, it will be matched. If the branch name starts with '0',
# it will be mathced too. Regex matches only the first number in the branch name if there is no
# not-number symbols before it.
BRANCH_NUMBER=$(echo $BRANCH_NAME | grep -oP '^0*[1-9]\d*(?=\D|$)|^0(?=\D|$)')
echo "Issue number: $ISSUE_NUMBER"
echo "Branch number: $BRANCH_NUMBER"
if [ "$ISSUE_NUMBER" = "$BRANCH_NUMBER" ]; then
    echo "Issue number in PR comment matches branch number."
else
    echo "Error: Issue number in PR comment ($ISSUE_NUMBER) does not match branch name ($BRANCH_NUMBER)."
    exit 1
fi
