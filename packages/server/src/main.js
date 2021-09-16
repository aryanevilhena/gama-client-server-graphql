// import { createServer } from 'http';
// import { readFile } from 'fs'
// import { resolve } from 'path';
// import { parse } from 'querystring';
// import cors from 'cors';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.applyMiddleware({
    app,
    cors: {
        origin: 'http://localhost:3000',
    },
    bodyParserConfig: true,
});

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;
const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server is listening at http://${HOSTNAME}:${PORT}.`);
});


// server.get('/status', (_, response) => {
//     response.send({
//         status: 'Okay',
//     });
// });

// const enableCors = cors({ origin: 'http://localhost:3000'});

// server
//     .options('/authenticate', enableCors)
//     .post('/authenticate', enableCors, express.json(), (request, response) => {
//         console.log(
//         'Email', request.body.email,
//         'Password', request.body.password);
//     response.send({
//         Okay: true,
//     });
// });


// const server = createServer((request, response) => {
//     switch(request.url){
//         case '/status': {
//             response.writeHead(200, {
//                 'Content-Type': 'application/json',
//             });
//             response.write(
//                 JSON.stringify()
//             );
//             response.end();
//             break;
//         }
//         case '/sign-in': {
//             const path = resolve(__dirname, './pages/sign-in.html')
//             readFile(path, (error, file) => {
//                 if(error){
//                     response.writeHead(500, 'Can\'t process HTML file');
//                     response.end();
//                     return;
//                 }

//                 response.writeHead(200);
//                 response.write(file);
//                 response.end();
//             });
//             break;
//         }
//         case '/home': {
//             const path = resolve(__dirname, './pages/home.html')
//             readFile(path, (error, file) => {
//                 if(error){
//                     response.writeHead(500, 'Can\'t process HTML file');
//                     response.end();
//                     return;
//                 }

//                 response.writeHead(200);
//                 response.write(file);
//                 response.end();
//             });
//             break;
//         }
//         case '/authenticate': {
//             let data = '';
//             request.on('data', (chunk) => {
//                 data+= chunk;
//             });
//             request.on('end', () => {
//                 const params = parse(data);
//                 response.writeHead(301, {
//                     Location: '/home',
//                 });
//                 response.end();
//             })
//             break;
//         }

//         default: {
//             response.writeHead(404, 'Service not found');
//             response.end();
//         }
//     }
// });
