# Personal Website Backend
The back-end for my personal website.

## Table of Contents
* [HTTP Requests](#http-requests)

## HTTP Requests

Note: for requests that have permissions a valid token obtained from ``` localhost:3000/api/users/signin``` must be provided as a header in the form: ``` Key: "Authorization", Value: "Bearer <token>"```

### Projects

#### Get all projects
&nbsp;&nbsp;Endpoint: ```GET: localhost:3000/api/projects```

&nbsp;&nbsp;Permissions Required: *none*

#### Get specific project
&nbsp;&nbsp;Endpoint: ```GET: localhost:3000/api/projects/:projectID```

&nbsp;&nbsp;Permissions Required: *none*

#### Create new project
&nbsp;&nbsp;Endpoint: ```POST: localhost:3000/api/projects```

&nbsp;&nbsp;Permissions Required: **create-project**

&nbsp;&nbsp;Body: 

```
{
  "name": String (required),
  "description": String (required),
  "thumbnailImage": File (required),
  "galleryImages": Array of Files (optional),
  "links": String Map of Strings (optional),
  "tags": Array of Strings (optional)
}
```

#### Update existing project
&nbsp;&nbsp;Endpoint: ```PATCH: localhost:3000/api/projects/:projectID```

&nbsp;&nbsp;Permissions Required: **edit-project**

&nbsp;&nbsp;Body: 

```
{
  "name": String (required),
  "description": String (required),
  "thumbnailImage": File (required),
  "galleryImages": Array of Files (optional),
  "links": String Map of Strings (optional),
  "tags": Array of Strings (optional)
}
```

Note: at the moment, updating the thumbnail image is not implemented

#### Delete project
&nbsp;&nbsp;Endpoint: ```DELETE: localhost:3000/api/projects/:projectID```

&nbsp;&nbsp;Permissions Required: **delete-project**

### Users
#### Signup user
&nbsp;&nbsp;Endpoint: ```POST: localhost:3000/api/users/signup```

&nbsp;&nbsp;Permissions Required: *none*

&nbsp;&nbsp;Body: 

```
{
  "email": Email String (required),
  "password": String (required)
}
```

#### Signin user

&nbsp;&nbsp;Endpoint: ```POST: localhost:3000/api/users/signup```

&nbsp;&nbsp;Permissions Required: *none*

&nbsp;&nbsp;Body: 

```
{
  "email": Email String (required),
  "password": String (required)
}
```

#### Edit user

&nbsp;&nbsp;Endpoint: ```PATCH: localhost:3000/api/users/:userID```

&nbsp;&nbsp;Permissions Required: **edit-user** or *self*

#### Delete user

&nbsp;&nbsp;Endpoint: ```DELETE: localhost:3000/api/users/:userID```

&nbsp;&nbsp;Permissions Required: **delete-user** or *self*


### Themes
#### Get all themes
&nbsp;&nbsp;Endpoint: ```GET: localhost:3000/api/theme```

&nbsp;&nbsp;Permissions Required: *none*

#### Get specific theme
&nbsp;&nbsp;Endpoint: ```GET: localhost:3000/api/theme/:themeID```

&nbsp;&nbsp;Permissions Required: *none*

#### Create theme
&nbsp;&nbsp;Endpoint: ```POST: localhost:3000/api/theme```

&nbsp;&nbsp;Permissions Required: **create-theme**

&nbsp;&nbsp;Body: 

```
{
  "name": String (required),
  "<property>": RGB String (required)
  ...
}
```

Click [here](api/constants/themeItems.js) to see a list of all theme properties.

#### Edit theme
&nbsp;&nbsp;Endpoint: ```PATCH: localhost:3000/api/theme/:themeID```

&nbsp;&nbsp;Permissions Required: **edit-theme**

&nbsp;&nbsp;Body: 

```
{
  "name": String (optional),
  "<property>": RGB String (optional)
  ...
}
```

#### Delete theme

&nbsp;&nbsp;Endpoint: ```DELETE: localhost:3000/api/theme/:themeID```

&nbsp;&nbsp;Permissions Required: **delete-theme**


#### Contact

#### Send contact email
&nbsp;&nbsp;Endpoint: ```POST: localhost:3000/api/contact```

&nbsp;&nbsp;Permissions Required: *none*

&nbsp;&nbsp;Body: 

```
{
  "email": Email String (required),
  "name": String (required),
  "subject": String (required),
  "message": String (required)
}
```
