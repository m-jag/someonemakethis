import sys
static1 = '<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">'
static2 = ' <a href="'
static3 = '">'
static4 = '</a></p>&mdash; '
static5 = ' <a href="'
static6 = '">'
static7 = '</a></blockquote>

rawInput = sys.argv[1]
rawInput.strip()
parseText = rawInput.split('"text" : "')[1]
tempString = parseText
parseText = parseText.split('","is_quote_status"')[0]
print(parseText)
parseId = tempString.split('NumberLong("')[1]
tempString = parseId
parseId = parseId.split('"),"favorite_')[0]
print(parseId)
parseAvatar = tempString.split('"profile_image_url" : "')[1]
tempString = parseAvatar
parseAvatar = parseAvatar.split('","following" :')[0]
print(parseAvatar)
parseAddress = tempString.split('"screen_name" : "')[1]
tempString = parseAddress
parseAddress = parseAddress.split('","lang"')[0]
print(parseAddress)
parseName = tempString.split('"name" : "')[1]
tempString = parseName
parseName = parseName.split('","notifications"')[0]
print(parseName)
parseUrl = 'https://twitter.com/'+parseAddress+'/status/'+parseId
print(parseUrl)
parseFullUrl = parseUrl
parseDate = tempString.split('ISODate("')[1]
parseDate = parseDate.split('T')[0]

code = static1 + parseText + static2 + parseUrl + static3 + parseAvatar + static4 + parseName + " " + parseAddress + static5 + parseFullUrl + static6 + parseDate + static7

print(code)
sys.stdout.flush()
