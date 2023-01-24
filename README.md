# The Tool

# Installation And User Manual
## Script Installation
The tool can be installed in two ways. Depending on the circumstances and usage
goals of the user, one may prefer one method over the other. The first variant is the
installation with the provided shell scripts. The *install.sh* script installs all necessary
client packages and python requirements. It is only tested on machines with the
Linux operating system, with the terminals bash and zsh.

```Bash
./install.sh
```

It is important that [Node.js](https://nodejs.org/en/), [npm](https://www.npmjs.com/), [python](https://www.python.org/) and pip are installed and accessible
through the command line. After the script finishes the installation, the program can
be started with the *start.sh* script.

```Bash
./start.sh
```

The standard ports are 8000 for the webserver and 8001 for the WebSocket connection.
They are set as environment variables and can be changed in the scripts. Because
the client is compiled in the installation script, both scripts must be edited for a port
change.

## Manual Installation
The other variant is the manual setup, which is useful when contributing to the
software respectively in development scenarios. As before, the necessary runtimes,
programming languages, and package managers have to be installed. Then the client
libraries can be installed:

```Bash
cd frontend
npm i 
```

Once the packages are installed, the client development server can be started:

```Bash
npm run dev 
```

The development server detects changes in the client project folder and updates the
web page in case of changes in the Vue components. This is very handy because the state is remained. If the scripts of the general logic are changed, then an auto restart
is performed. Another helpful feature is the error handling of the development server.
Errors are shown on top of the web page and in the console, i.e. a fast feedback loop
for the developer.

Changes in the logic parts of the client should be tested in combination with the
backend. To install and start the backend, a virtual environment is recommended to
store all dependencies. This can be created with the following command:

```Bash
cd backend
python3 -m venv ./venv/
```

This step is not necessary, but a very common programming practice to have all the
needed software in one place. Every time new packages have to be installed or the
services have to be started, the virtual environment has to be started for the terminal
session.

```Bash
cd backend
source ./venv/bin/activate
```

All dependencies are stored in the requirements.txt file. New dependencies should be
listed here in the future when contributing to this software. The dependencies can
be installed with the following command:

```Bash
python3 -m pip install -r requirements.txt
```

To finally use the server, run the app.py file. The ports have to be unused in the
system at that time.

```Bash
python app.py
```

As mentioned earlier, the tool is not designed to run publicly on the internet because
it is not secure and can handle only one user at a time. Furthermore, the performance
of the compiled client version with the scripts is much higher than in the development
version. The web server and WebSocket are not encrypted with SSL or something
else. The browser plugin for Vue.js supports client development a lot.