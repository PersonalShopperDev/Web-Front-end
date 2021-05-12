# __PERSONAL SHOPPER__ WEB FRONT-END
#### This project is based on Next.js, Typescript, and Sass.

<br>

## Naming Convention
### Javscript & Typescript
|Name|Convention|
|---|---|
|file|kebab-case|
|function|camelCase|
|variable|camelCase|
|constant|UPPER_SNAKE_CASE|
|interface|PascalCase|
|class|PascalCase|
|component|PascalCase|
|type|PascalCase|
|enum|Don't use it. Use string union|

### Sass

|Name|Convention|
|---|---|
|local variable|kebab-case|
|Global variable|G-kebab-case|
|keyframes|kebab-case|
|selector|camelCase|
|mixin|camelCase|
|function|camelCase|

<br>

## Directory Structure
### /pages
+ Import Layout, and inject into it components like header, navigation, and templates or something.
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
+ ### /providers
    + Write Context API(React).
    + It is for dealing with Global data like an authentication.
    + But you can also use the Context API for lifting state up from children you can't expect.
+ ### /templates
    + Main View composed of complex components.
    + It will be needed when we make have to make them communicate between header and main elements, and nav with footer but we don't want to write complex code in /pages.
### /sass
+ Write CSS.
+ Maybe you can make another /components, /layout, /providers under this directory just like /src.
### /lib
+ Write utility functions like fetcher, date convert, and whatever.
