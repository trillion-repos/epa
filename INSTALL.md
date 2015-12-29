# Installation
Please  use one of the below options to install Trillion OpenEPA Visualization Platform

### Installation with Node.js
It is assumed that [node.js v0.10.36] is installed and configured on your system for these instructions.

#### Build
```sh
$ git clone git@github.com:trillion1-repos/18f.git
$ cd 18f
$ npm install
$ npm install -g forever

```

#### Run
```sh
$ forever start server.js
```
Once running the application can be accessed at -
* http://localhost:3000
* http://[your IP]:3000


[boot2docker]:http://boot2docker.io
[node.js v0.10.36]:https://nodejs.org
