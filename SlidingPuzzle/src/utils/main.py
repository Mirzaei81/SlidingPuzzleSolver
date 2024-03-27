import os 
import json 
testcases = "./src/test/testCases"
for f in (os.listdir(testcases)):
    file = open(testcases+"/"+f)
    lines = file.read().split("\n")
    puzzle ={}
    size = int(lines[0])
    puzzle["size"]= size
    tile = []
    for j in range(1,size+1):
        tile.append(list(map(lambda x:int(x),lines[j].split())))
    puzzle["tiles"] = tile
    out =  open(f"./src/test/CasesJson/{f[:-4]}.json",'w')
    json.dump(puzzle,out,indent=6)
