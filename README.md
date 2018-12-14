# Simple Small Business App
Allows the user to create invoices and quotes and send them to customers.

View at [https://plownomore.azurewebsites.net/index.html](https://plownomore.azurewebsites.net/index.html)
#  Frontend
The frontend is written in angular with many dependencies. It can run locally in a browser.

To run the project locally follow the steps below.

```bash
npm install node -g
cd frontend
npm install
npm run start
```

#### Note: you might run into issues signing into the app with Facebook. To fix this issue make sure you setup https locally using [these steps](https://medium.com/@rubenvermeulen/running-angular-cli-over-https-with-a-trusted-certificate-4a0d5f92747a).

---
#  Backend
The backend is an express app.

To run the project locally, copy and paste the script below:
```bash
npm install node -g
npm install nodemon -g
cd backend
npm install
nodemon
```

#### Note: the frontend points to the deployed site. To test locally you need to change the baseUrl in globals to the proper localhost link.


## Want to help?
Feel free to fork the project and make pull requests. For any questions contact yaser @ [yaser.ca](https:yaser.ca)

## Cool commands
Line count
```bash
find ../ | xargs wc -l
```

