import requests
import json

client_id = "nBcrF_omljd_AL2WOV0n"
client_secret = "QuroIWuHzI"
query = "파이썬"
encText = query.encode('utf-8')
url = f"https://openapi.naver.com/v1/search/local.json?query=&display=5"


headers = {
    "X-Naver-Client-Id": client_id,
    "X-Naver-Client-Secret": client_secret
}


response = requests.get(url, headers=headers)


if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print("Error:", response.status_code)
