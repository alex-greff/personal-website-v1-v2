# Personal Website Server
The back-end server for my personal website built using [NodeJS](https://nodejs.org/en/) and [Express](https://expressjs.com/).

## Table of Contents
* [Roles](#roles)
* [HTTP Requests](#http-requests)
    * [Projects](#projects)
    * [experience](#experience)
    * [Users](#users)
    * [Themes](#themes)
    * [Music](#music)
    * [Contact](#contact)

## Roles

These are the difference user roles available:

``` yml
admin: 
    can:
        - edit-user
        - delete-user
    inherits:
        - editor
        - artist
        - manager
editor:
    can: 
        - create-project
        - edit-project
        - delete-project
        - create-experience
        - edit-experience
        - delete-experience
        - override-about
        - edit-about
    inherits:
        - default
artist:
    can:
        - create-theme
        - edit-theme
        - delete-theme
    inherits:
        - default
manager:
    can: 
        - create-artist
        - edit-artist
        - delete-artist
        - view-client-ID
        - regenerate-client-ID
    inherits:
        - default
default:
    can:
        - edit-self
        - delete-self
```





## HTTP Requests

Note: for requests that have permissions a valid JWT token obtained from ``` [...]/api/users/login``` must be provided as a header in the form: ``` Key: "Authorization", Value: "Bearer <token>"```



### Projects

#### Get all projects
&nbsp;&nbsp;Endpoint: ```GET: [...]/api/projects```

&nbsp;&nbsp;Permissions Required: *none*

#### Get specific project
&nbsp;&nbsp;Endpoint: ```GET: [...]/api/projects/:projectID```

&nbsp;&nbsp;Permissions Required: *none*

#### Create new project
&nbsp;&nbsp;Endpoint: ```POST: [...]/api/projects```

&nbsp;&nbsp;Permissions Required: **create-project**

&nbsp;&nbsp;Body: 

```json
{
    "name": "String (required)",
    "summary": "String/Markdown file (required)",
    "description": "String/Markdown file (optional)",
    "thumbnailImage": "Image File (required)",
    "galleryImages": "Array of Image Files (optional)",
    "links": "Object of Link Type to Link String (optional)",
    "tags": "Array of Tag Strings (optional)",
    "startDate": "Date (optional)",
    "endDate": "Date (optional)"
}
```

#### Update existing project
&nbsp;&nbsp;Endpoint: ```PATCH: [...]/api/projects/:projectID```

&nbsp;&nbsp;Permissions Required: **edit-project**

&nbsp;&nbsp;Body: 

```json
{
    "name": "String (optional)",
    "summary": "String/Markdown file (optional)",
    "description": "String/Markdown file (optional)",
    "thumbnailImage": "Image File (optional)",
    "galleryImages": "Array of Image Files (optional)",
    "links": "Object of Link Type to Link String (optional)",
    "tags": "Array of Tag Strings (optional)",
    "startDate": "Date (optional)",
    "endDate": "Date (optional)"
}
```

#### Delete project
&nbsp;&nbsp;Endpoint: ```DELETE: [...]/api/projects/:projectID```

&nbsp;&nbsp;Permissions Required: **delete-project**



# Experience

#### Get all experience
&nbsp;&nbsp;Endpoint: ```GET: [...]/api/experience```

&nbsp;&nbsp;Permissions Required: *none*

#### Get specific experience
&nbsp;&nbsp;Endpoint: ```GET: [...]/api/experience/:experienceID```

&nbsp;&nbsp;Permissions Required: *none*

#### Create new experience
&nbsp;&nbsp;Endpoint: ```POST: [...]/api/experience```

&nbsp;&nbsp;Permissions Required: **create-experience**

&nbsp;&nbsp;Body: 

```json
{
    "title": "String (required)",
    "company": "String (required)",
    "companyLink": "String (optional)",
    "summary": "String/Markdown file (required)",
    "tags": "Array of Tag Strings (optional)",
    "startDate": "Date (optional)",
    "endDate": "Date (optional)"
}
```

#### Update existing experience
&nbsp;&nbsp;Endpoint: ```PATCH: [...]/api/experience/:experienceID```

&nbsp;&nbsp;Permissions Required: **edit-experience**

&nbsp;&nbsp;Body: 

```json
{
    "title": "String (optional)",
    "company": "String (optional)",
    "companyLink": "String (optional)",
    "summary": "String/Markdown file (optional)",
    "tags": "Array of Tag Strings (optional)",
    "startDate": "Date (optional)",
    "endDate": "Date (optional)"
}
```

#### Delete experience
&nbsp;&nbsp;Endpoint: ```DELETE: [...]/api/experience/:experienceID```

&nbsp;&nbsp;Permissions Required: **delete-experience**



### Users

#### Signup user
&nbsp;&nbsp;Endpoint: ```POST: [...]/api/users/signup```

&nbsp;&nbsp;Permissions Required: *none*

&nbsp;&nbsp;Body: 

``` json
{
    "email": "Email String (required)",
    "password": "String (required)"
}
```

#### Signin user

&nbsp;&nbsp;Endpoint: ```POST: [...]/api/users/signup```

&nbsp;&nbsp;Permissions Required: *none*

&nbsp;&nbsp;Body: 

``` json
{ 
    "email": "Email String (required)",
    "password": "Password String (required)"
}
```

#### Edit user

&nbsp;&nbsp;Endpoint: ```PATCH: [...]/api/users/:userID```

&nbsp;&nbsp;Permissions Required: **edit-user** or **edit-self**

``` json
{ 
    "email": "New Email String (optional)",
    "password": "New Password String (optional)"
}
```

#### Delete user

&nbsp;&nbsp;Endpoint: ```DELETE: [...]/api/users/:userID```

&nbsp;&nbsp;Permissions Required: **delete-user** or **delete-self**



### Themes

#### Get all themes
&nbsp;&nbsp;Endpoint: ```GET: [...]/api/theme```

&nbsp;&nbsp;Permissions Required: *none*

#### Get specific theme
&nbsp;&nbsp;Endpoint: ```GET: [...]/api/theme/:themeID```

&nbsp;&nbsp;Permissions Required: *none*

#### Create theme
&nbsp;&nbsp;Endpoint: ```POST: [...]/api/theme```

&nbsp;&nbsp;Permissions Required: **create-theme**

&nbsp;&nbsp;Body: 

``` json
{
    "name": "String (required)",
    "baseTheme": "Boolean (optional)",
    "BASE": "Base Object (optional)",
    "subSections": "SubSections Object (optional)"
}
```

See [here](client/src/themes/definitiions/index.js) to see the theme definition for this site.

#### Edit theme
&nbsp;&nbsp;Endpoint: ```PATCH: [...]/api/theme/:themeID```

&nbsp;&nbsp;Permissions Required: **edit-theme**

&nbsp;&nbsp;Body: 

``` json
{
    "name": "String (optional)",
    "baseTheme": "Boolean (optional)",
    "BASE": "Base Object (optional)",
    "subSections": "SubSections Object (optional)"
}
```

#### Delete theme

&nbsp;&nbsp;Endpoint: ```DELETE: [...]/api/theme/:themeID```

&nbsp;&nbsp;Permissions Required: **delete-theme**



### Music

#### Get all tracks
&nbsp;&nbsp;Endpoint ```GET: [...]/api/music```

&nbsp;&nbsp;Permissions Required: *none*

#### Get all artist profiles
&nbsp;&nbsp;Endpoint ```GET: [...]/api/music/artists```

&nbsp;&nbsp;Permissions Required: *none*

### Get artist profile
&nbsp;&nbsp;Endpoint ```GET: [...]/api/music/artists/:artistID```

&nbsp;&nbsp;Permissions Required: *none*

### Create artist profile
&nbsp;&nbsp;Endpoint ```POST: [...]/api/music/artists```

&nbsp;&nbsp;Permissions Required: **create-artist**

&nbsp;&nbsp;Body: 

``` json
{
    "username": "SoundCloud Username String (required)",
    "tracks": "Array of track names (optional)"
}
```

### Edit artist profile
&nbsp;&nbsp;Endpoint ```PATCH: [...]/api/music/artists/:artistID```

&nbsp;&nbsp;Permissions Required: **edit-artist**

&nbsp;&nbsp;Body: 

``` json
{
    "username": "SoundCloud Username String (optional)",
    "tracks": "Array of track names (optional)"
}
```

### Delete artist profile
&nbsp;&nbsp;Endpoint ```DELETE: [...]/api/music/artists/:artistID```

&nbsp;&nbsp;Permissions Required: **delete-artist**

#### View client ID
&nbsp;&nbsp;Endpoint ```GET: [...]/api/music/clientID```

&nbsp;&nbsp;Permissions Required: **view-client-ID**

#### Regenerate client ID
&nbsp;&nbsp;Endpoint ```PATCH: [...]/api/music/clientID```

&nbsp;&nbsp;Permissions Required: **regenerate-client-ID**



### Contact

#### Send contact email
&nbsp;&nbsp;Endpoint: ```POST: [...]/api/contact```

&nbsp;&nbsp;Permissions Required: *none*

&nbsp;&nbsp;Body: 

``` json
{
    "email": "Email String (required)",
    "name": "String (required)",
    "subject": "String (required)",
    "message": "String (required)"
}
```
