# __PERSONAL SHOPPER__ WEB FRONT-END
#### This project is based on Next.js, Typescript, and Sass.

<br>

## Directory Structure
---
### /pages
+ Views for users, composed of components, layout, and if you need providers.
+ [learn more](https://nextjs.org/docs/basic-features/pages)
### /public
+ Locate static file in here. The directory name must not be changed.
+ [learn more](https://nextjs.org/docs/basic-features/static-file-serving)
### /src
+ Mainly we write code in here.
+ ### /components
    + The storage for reusable materials.
+ ### /layouts
    + The skeleton of a page. 
    + It defines relationship among header, main, footer, or nav.
+ ### /lib
    + Write utility functions like fetcher, date convert, 
+ ### /providers
    + Write Context API(React).
    + It is for dealing with Global data like an authentication.
    + But you can also use the Context API for lifting state up from children you can't expect.
+ ### /styles
    + Write CSS.
    + Maybe you can make another /components, /layout, /providers under this directory.
