import urllib.parse
from urllib.request import urlopen
import re
import json

def lambda_handler(event, context):
    print(event)
    print(context)
    url = json.loads(event.get('body', '{}')).get('url')
    print(url)
    regex = r'[^\x00-\x7F]'
    matchedList = re.findall(regex, url)
    for m in matchedList:
        url = url.replace(m, urllib.parse.quote_plus(m, encoding = "utf-8"))
    print(url)
    
    try:
        response = urllib.request.urlopen(url)
        content = response.read()
    except urllib.error.HTTPError as e:
        print(e.code)
        print(e.read())
        if e.code == 404:
            content = b'\x04\x00\x04'
        else:
            content = b'\x04\x00\x00'
    
    print('コンテンツ:')
    print(content)
    
    try:
        tmpContent = content.decode('utf-8')
    except:
        print('cannot decode to utf-8. now running hex()..')
        content = content.hex()
        print(content)
    
    return {
        'statusCode': 200,
        'body': content
    }
