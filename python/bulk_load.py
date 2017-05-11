#! python2
import os
import json
import requests
token = raw_input('Please input the token that you were given: ')
path = name_of_dagr = raw_input('Enter the root path of the files you want to ingest: ')
name_of_dagr = raw_input('Enter the name of your new Dagr: ')
file_extension = raw_input('Enter the file extensions you want to add, or type n/a for all (no need for "."): ')


#prompt user for a file extention
#and name of Dagr they want to organize under 

root = path
res = {
    'name': name_of_dagr,
    'dagrs' : []
}
new_extensions = file_extension.replace(" ", "")
extensions = new_extensions.split(',')


for root, dirnames, filenames in os.walk(root):
    for filename in filenames:
        new_temp = filename.split(".")

        if file_extension=='n/a' or (len(new_temp) > 1 and new_temp[1] in extensions):
            obj = [
                filename,
                os.path.join(root, filename),
                os.path.getsize(os.path.join(root, filename))
            ]
            print(obj)
            res['dagrs'].append(obj)

# json1 = json.dumps(res)

# print(json1)

# headers = {'content-type': 'applicaiton/json'}
print(res)
r = requests.post("https://intense-reaches-84609.herokuapp.com/api/"+token+"/bulkupload", res)
print(r.status_code, r.reason);
#send a big json object and we can handle it with api endpoint
