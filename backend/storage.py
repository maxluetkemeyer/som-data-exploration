import pandas as pd
import sqlalchemy

global data
data = pd.DataFrame()

global db
db = {}

global som
som = {}


# https://docs.sqlalchemy.org/en/20/core/engines.html
# dialect+driver://username:password@host:port/database
def getEngine():
    return sqlalchemy.create_engine(f"{db['variant']}://{db['user']}:{db['pass']}@{db['host']}:{db['port']}/{db['schema']}")  # ?charset=utf8mb4


# https://stackoverflow.com/questions/287871/how-do-i-print-colored-text-to-the-terminal
class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


def printTask(taskString):
    print(f"{bcolors.OKBLUE}{bcolors.BOLD}TASK: {taskString}{bcolors.ENDC}")


def printWarning(warningString):
    print(f"{bcolors.WARNING}{bcolors.BOLD}WARNING: {warningString}{bcolors.ENDC}")


def printSucces(message):
    print(f"{bcolors.OKGREEN}{bcolors.BOLD}{message}{bcolors.ENDC}")
