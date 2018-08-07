## GeekSkool-- Meet-Up Project

 ### Pre-requisites
 
 * Node (v8 or higher)
 * Redis (v2.8 or higher)
 * Webpack (v4)

 ### How to run the application Locally
 
 * clone/download the repository: git clone git://github.com/geekskool/bangalorejs.git
 * run command "npm i" to install dependencies and devDependencies
 * start redis server using 'redis-server'
 * run command "npm run dev-server" to start the express server
 * run command "npm start" to watch for local js changes
 * type localhost:3000 in browser

### Features / Fixes
* Add loaders/spinners to async components.
* Deep checking of change in the state of event in eventdetails page for better UX.
* Some svgs are not part of the bundle but loaded from CDN (delete comment button, inverted caret dropdown in the header, carousel scroll buttons). They can be part of the bundle.
* Disable buttons to prevent quick multiple clicks.