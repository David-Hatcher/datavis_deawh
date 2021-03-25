import csv
arr = []
counties = {}
reader = open("data/arcos-fl-statewide-itemized.csv")
#reader = csv.DictReader(open("data/arcos-fl-statewide-itemized.csv"))
i = 0
write = open("sample.csv",'a')
for line in reader:
    write.write(line)
    i += 1
    if i > 100:
        break