# RUN IN DIRECTORY WHERE LAMBDA FUNCTION DIRECTORIES RESIDE
# Depending on input arguments, delete specified lambda functions, or create specified/all lambda functions
# Creating includes putting the node_modules and config.json from this directory into function directory before zipping it and uploading it
# Consequently, the config.json and node_modules for mysql (npm install mysql --save) must be in this directory
    # Examples:
    # Pick up all folders in current directory starting with 'dda-', bundle them with node_modules and config.json and create a lambda function for each on aws
        # python dda-lambdas.py all
    # Do the above only for specific lambda function
        # python dda-lambdas.py dda-jobs-get
    # Delete specified lambda functions
        # python dda-lambdas.py delete dda-jobs-get dda-jobs-put
import os
import zipfile
import sys
import shutil
import json


def main():
    # Get all directories present in the current directory that start with dda-
    dirs = []
    for name in os.listdir():
        if os.path.isdir(name) and name.startswith('dda-'):
            dirs.append(name)

    # Perform actions based on arguments
    arguments = sys.argv[1:]
    if arguments[0] == 'delete':
        for argument in arguments[1:]:
            delete_function_from_aws(argument)

    else:
        if arguments[0] == 'all':
            print("Zipping and sending all present directories.")
        else:
            if any(argument not in dirs for argument in arguments):
                print("You asked for a directory to be zipped and sent that doesn't exist.")
                exit()
            else:
                dirs = arguments

        for dir in dirs:
            copy_node_modules_config(dir)
            zip_up(dir)
            upload_zip(dir)
            os.remove(dir+".zip")
            remove_node_modules_config(dir)


def copy_node_modules_config(dir):
    print("Copying config.json and node_modules to directory.")
    if (not os.path.exists('config.json')) or (not os.path.exists('node_modules')):
        print("There is no config.json/node_nodules in the directory.")
        exit()
    if not os.path.exists(dir+'config.json'):
        shutil.copy('config.json',dir)
    if not os.path.exists(dir+'/node_modules'):
        shutil.copytree('node_modules',dir+'/node_modules')


def zip_up(fnxn_folder_to_upload):
    fnxn_folder_to_upload_zip = fnxn_folder_to_upload + ".zip"
    print("Zipping up "+fnxn_folder_to_upload)

    zip_file = zipfile.ZipFile(fnxn_folder_to_upload_zip, "w")
    for root, subdirs, files in os.walk(fnxn_folder_to_upload):
        length = len(fnxn_folder_to_upload)
        folder = root[length:]
        for file in files:
            zip_file.write(os.path.join(root, file), os.path.join(folder, file))
    zip_file.close()


def upload_zip(fnxn_folder_to_upload):
    with open(fnxn_folder_to_upload+'/config.json', 'r') as f:
        config = json.load(f)
    if not 'aws_role' in config:
        print("config.json requires to have aws_role in it to be associated with lambda function")
        exit()
    fnxn_folder_to_upload_zip = fnxn_folder_to_upload + ".zip"
    command = "aws lambda create-function --function-name "+fnxn_folder_to_upload+" --zip-file fileb://"+fnxn_folder_to_upload_zip+" --handler index.handler --runtime nodejs8.10 --role "+config['aws_role']
    print("Running command:\n"+command)
    res = os.system(command)
    if 255 == res:
        print("\nIf lambda function "+fnxn_folder_to_upload+" already exists, delete it first using arguments 'delete function_name'")


def remove_node_modules_config(dir):
    print("Removing config.json and node_modules from directory.")
    if os.path.exists(dir+'/config.json'):
        os.remove(dir+'/config.json')
    if os.path.exists(dir+'/node_modules'):
        shutil.rmtree(dir+'/node_modules')


def delete_function_from_aws(function_name):
    print("Deleting lambda function "+function_name+" from aws.")
    command="aws lambda delete-function --function-name "+function_name
    print("Running command:\n"+command)
    os.system(command)


main()
