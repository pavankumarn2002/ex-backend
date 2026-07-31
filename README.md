npm init 

npm install -D typescript ts-node-dev

npx tsc --init

in tsconfig file add these two "rootDir": "./src","outDir": "./dist",

npm install nodemon

and add "dev":"nodemon ./src/index.ts" in types of package.json

npm install express cors dotenv bcryptjs jsonwebtoken pg cookie-parser

npm i --save-dev @types/jsonwebtoken

npm install --save-dev @types/cookie-parser

npm install @types/express @types/cors @types/bcryptjs @types/node @types/pg @types/cookie-parser


Add in tsconfig :-
---------------------

{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
   "module": "ESNext",
    "target": "ES2023",
    "types": [],
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "strict": true,
    "jsx": "react-jsx",
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true,
     "moduleResolution": "bundler"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}

And then install :-
---------------------
npm install --save-dev @types/node
npm install --save-dev tsx

change script in package,json
"scripts": {
    "dev": "nodemon --exec tsx ./src/index.ts"
  }

to install prisma :-
-----------------------
https://www.prisma.io/docs/prisma-orm/add-to-existing-project/postgresql


after connecting with db and creat a modal in prisma and then run 

npx prisma db push
