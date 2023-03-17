#!/usr/bin/python3

import subprocess
import time
import os


"""modifier le nom des services en fonction du nom des dossiers 
ATTENTION NE PAS MODIFIER L'ORDRE DES SERVICE (juste renommer)"""

services = ["archive_service", "session_service", "badge_service",
            "language_service", "beforedraft_service", "exercice_service"]

for service in services:
    path = "./{0}".format(service)
    # branch = input("Nom de la branch {0}: ".format(service))
    commitMessage = input("Ecrire le commit: ")

    os.chdir(path)
    print("Current working directory: {0}".format(os.getcwd()))

    subprocess.run("git add .", shell=True)
    subprocess.run('git commit -m "{0}"'.format(commitMessage), shell=True)

    if service == services[0]:
        subprocess.run('git push git@bitbucket.org:knut5/archiveservice.git', shell=True)
    elif service == services[1]:
        subprocess.run('git push git@bitbucket.org:knut5/sessionservice.git', shell=True)
    elif service == services[2]:
        subprocess.run('git push git@bitbucket.org:knut5/badgeservice.git', shell=True)
    elif service == services[3]:
        subprocess.run('git push git@bitbucket.org:knut5/languageservice.git', shell=True)
    elif service == services[4]:
        subprocess.run('git push git@bitbucket.org:knut5/beforedraftservice.git', shell=True)
    elif service == services[5]:
        subprocess.run('git push git@bitbucket.org:knut5/exerciceservice.git', shell=True)
    else:
        print("le nom d'un service ne correspond pas au nom du dossier correspondant.")


    print("S'il n'y a pas d'erreur, le push à bien été effectué depuis {0}".format(service))
    time.sleep(1)
    os.chdir("/home/coco/19_projets/bewebAcademy/test_services")

print("Services push avec succès")
