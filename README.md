
## Accion API
---
## Requirements

For development, you will need Node.js and a node global package, Angular and File Zilla for deployment

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the   installer.
  
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

 If the installation was successful, you should be able to run the following command.
    
      $ node --version
      v14.15.4
    
      $ npm --version
      6.14.10
If you need to update `npm`, you can make it using `npm`, just open again the command line and run
    
      $ npm install npm -g
      
### Install project form git lab 

- Installation 

 Run
  
      $ git clone https://gitlab.com/RubikPay/accion.git
      
      $ cd accion
      $ npm install

    
 to clone your project

### Angular

- #### Angular Installation
After npm is installed, you can use it(npm) to install your angular application

 - to install angular run:
        npm install -g @angular/cli
 - run 
        cd projectname 
    to open the project
 - Run 
        npm install 
    to install dependencies
 - to launch your application run:
        ng serve
 - to build for production deployment run:
        ng build --prod

 after building the app for production, a dist folder is created in your project

### File Zilla

 - Deployment to server
 
 For deployment, Install file zilla form https://filezilla-project.org/download.php?platform=win64
 
 - Create your server username and password
 -Follow the path /var/www where wakanda and web.accion folders are located in file zilla
 -Open any of the folder you want to deploy in from your server
 -In file zilla , copy the dist folder from your local and paste in the server
 -launch your browser to comfirm deployment
 
 
 
 
