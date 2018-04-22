## General contribution guidelines

* Have a look at open issues. Pick an unassigned issue. If doubtful, discuss on the issue itself.
* You can also create a new issue for a feature or bug.
* Make sure you are assigned to the issue before you start working on it.
* Make sure you are not working on more than 2 issues at once.
* While sending a PR make sure you follow one issue per PR rule.
* Make sure the Issue and PR template are correctly filled.
* Make sure to stick to the good commit message guidelines as closely as possible as explained below.


### Writing good commit message

##### The format
The format of a commit message can be separated in three distinct parts separated by a blank line: the message summary, body, and footer. The summary is required but the other two sections are optional. When a change is very simple, a message summary is usually enough.

```md
Message Summary
<blank line>
Message Body
<blank line>
Message Footer
```

##### Message Summary
Give a summary of your change in around 50 characters or less
Use the imperative mood in the subject line
```md
# Bad
❯ I added a README.md to the project
# Good
❯ Add README.md to the project
```
* No dot at the end
* Capitalize first letter


##### Message Body
* Wrap the body at around 72 characters
* You have to do it manually because Git doesn't do it for you. If you don't then your paragraphs will flow off the edge of the screen when something like git log.
* Leave out the details about how a change was made
* When a commit is explained, focus on the why and what. Details about how a change was made can be explored simply by taking a look at the code. If the code being committed necessitates extra explanation, then this is best handled with source comments.
* Bullet points are okay to use

##### Message Footer
* Close issues using keywords
* Add references to other issues if applicable
* Example: `See also: #112, #113`
* Mention breaking changes if applicable

##### Sample of a Good Commit Message
```md
Strip trailing and leading spaces from scope names

Recorded scopes previously contained trailing and leading
spaces. This caused scope validation to fail.   

Closes #112
```
