import requests
from bs4 import BeautifulSoup as bs
import json
import shutil
import time

url = requests.get("https://opoznai.bg/charts/type:searched/page:2")

soup = bs(url.text,"html.parser")

images = soup.select(".article_box[allimgs]")

names= soup.select(".article_content h3")
locs = soup.select(".article_tlocation_main")
destinations = []


for name,loc in zip(names,locs):
    parsed = {"destination":name.text.replace('"',""),"location":loc.text.replace('"',"")}
    destinations.append(parsed)

destinations.pop(14)

json_res = json.dumps(destinations, ensure_ascii=False)

print(json_res)

img_list = []
i=50
for n in images:
    img_list.append(n.get("allimgs").replace("323x185","900x600").replace("600x450","900x600").split(","))




# 
# for dest in img_list:
#     time.sleep(1)
#     y=0
#     for url in dest:
#         req = requests.get(url,stream=True)
#
#         if req.status_code == 200 :
#             req.raw.decode_content = True
#
#             with open(f"downloads/dest_{i}_image_{y}.jpg","wb") as f:
#                 shutil.copyfileobj(req.raw, f)
#         y+=1
#     i+=1