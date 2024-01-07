---
title: SECA API v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="seca-api">SECA API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

This is an API for SECA funcionalities

Base URLs:
* <a href="http://localhost:3000">http://localhost:3000</a>

Email: <a href="mailto:A50471@alunos.isel.pt">Support</a> 
License: <a href="http://www.apache.org/licenses/LICENSE-2.0.html">Apache 2.0</a>

# Authentication

- HTTP Authentication, scheme: bearer 

<h1 id="seca-api-events">Events</h1>

## getPopularEvents

<a id="opIdgetPopularEvents"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/events/popular \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/events/popular HTTP/1.1
Host: localhost:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/events/popular',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/events/popular',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/events/popular', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/events/popular', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/events/popular");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/events/popular", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/events/popular`

*Get the s most popular events*

<h3 id="getpopularevents-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|s|query|integer|false|The number of returned events|
|p|query|integer|false|The page number of the returned events|

> Example responses

> 200 Response

```json
{
  "id": "G5v0Z9Yc3BZyy",
  "name": "Phoenix Suns vs. Memphis Grizzlies",
  "date": "2024-02-03T00:30:00Z",
  "segment": {
    "id": "KZFzniwnSyZfZ7v7nE",
    "name": "Sports"
  },
  "genre": {
    "id": "KnvZfZ7vAde",
    "name": "Basketball"
  }
}
```

<h3 id="getpopularevents-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful response|[Event](#schemaevent)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|#/components/responses/404NotFound|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## searchEvents

<a id="opIdsearchEvents"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/events/search?eventName=string \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/events/search?eventName=string HTTP/1.1
Host: localhost:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/events/search?eventName=string',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/events/search',
  params: {
  'eventName' => 'string'
}, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/events/search', params={
  'eventName': 'string'
}, headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/events/search', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/events/search?eventName=string");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/events/search", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/events/search`

*Get events by name*

<h3 id="searchevents-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|eventName|query|string|true|Name of the event to search|
|s|query|integer|false|Maximum number of events to return|
|p|query|integer|false|Number pages to skip|

> Example responses

> 200 Response

```json
[
  {
    "id": "G5v0Z9Yc3BZyy",
    "name": "Phoenix Suns vs. Memphis Grizzlies",
    "date": "2024-02-03T00:30:00Z",
    "segment": {
      "id": "KZFzniwnSyZfZ7v7nE",
      "name": "Sports"
    },
    "genre": {
      "id": "KnvZfZ7vAde",
      "name": "Basketball"
    }
  }
]
```

<h3 id="searchevents-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful response|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid Request because of a missing Parameter or invalid body content|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Resource not found|None|

<h3 id="searchevents-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» id|string(uuid)|true|none|none|
|» name|string|true|none|none|
|» date|string|true|none|none|
|» segment|object|true|none|none|
|»» id|string|false|none|none|
|»» name|string|false|none|none|
|» genre|object|true|none|none|
|»» id|string|false|none|none|
|»» name|string|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="seca-api-groups">Groups</h1>

## getGroups

<a id="opIdgetGroups"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/groups?token=497f6eca-6276-4993-bfeb-53cbbbba6f08 \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/groups?token=497f6eca-6276-4993-bfeb-53cbbbba6f08 HTTP/1.1
Host: localhost:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/groups?token=497f6eca-6276-4993-bfeb-53cbbbba6f08',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/groups',
  params: {
  'token' => 'string(uuid)'
}, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/groups', params={
  'token': '497f6eca-6276-4993-bfeb-53cbbbba6f08'
}, headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/groups', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/groups?token=497f6eca-6276-4993-bfeb-53cbbbba6f08");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/groups", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/groups`

*Get all groups of a user*

<h3 id="getgroups-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|token|query|string(uuid)|true|user token associated with the groups|

> Example responses

> 200 Response

```json
[
  {
    "groupId": "57b2a8e5-df74-4b9b-b8e1-80c48a894ed5",
    "description": "string",
    "userId": "36e3b1b0-cc72-498b-bd51-1385c5183b05"
  }
]
```

<h3 id="getgroups-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful response|Inline|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Access denied|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error not expected|None|

<h3 id="getgroups-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Group](#schemagroup)]|false|none|none|
|» groupId|string(uuid)|false|none|none|
|» description|string|true|none|Basketball games I want to watch|
|» userId|string(uuid)|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## deleteGroup

<a id="opIddeleteGroup"></a>

> Code samples

```shell
# You can also use wget
curl -X DELETE http://localhost:3000/api/groups?groupId=497f6eca-6276-4993-bfeb-53cbbbba6f08&token=497f6eca-6276-4993-bfeb-53cbbbba6f08 \
  -H 'Authorization: Bearer {access-token}'

```

```http
DELETE http://localhost:3000/api/groups?groupId=497f6eca-6276-4993-bfeb-53cbbbba6f08&token=497f6eca-6276-4993-bfeb-53cbbbba6f08 HTTP/1.1
Host: localhost:3000

```

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/groups?groupId=497f6eca-6276-4993-bfeb-53cbbbba6f08&token=497f6eca-6276-4993-bfeb-53cbbbba6f08',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.delete 'http://localhost:3000/api/groups',
  params: {
  'groupId' => 'string(uuid)',
'token' => 'string(uuid)'
}, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Authorization': 'Bearer {access-token}'
}

r = requests.delete('http://localhost:3000/api/groups', params={
  'groupId': '497f6eca-6276-4993-bfeb-53cbbbba6f08',  'token': '497f6eca-6276-4993-bfeb-53cbbbba6f08'
}, headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','http://localhost:3000/api/groups', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/groups?groupId=497f6eca-6276-4993-bfeb-53cbbbba6f08&token=497f6eca-6276-4993-bfeb-53cbbbba6f08");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "http://localhost:3000/api/groups", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /api/groups`

*Delete an existing group*

<h3 id="deletegroup-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|groupId|query|string(uuid)|true|token of the group that will be deleted|
|token|query|string(uuid)|true|token of the user that wants to delete a group|

<h3 id="deletegroup-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Group was successfully deleted|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Access denied|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Resource not found|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error not expected|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## postGroup

<a id="opIdpostGroup"></a>

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3000/api/groups?groupName=string&token=497f6eca-6276-4993-bfeb-53cbbbba6f08 \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:3000/api/groups?groupName=string&token=497f6eca-6276-4993-bfeb-53cbbbba6f08 HTTP/1.1
Host: localhost:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/groups?groupName=string&token=497f6eca-6276-4993-bfeb-53cbbbba6f08',
{
  method: 'POST',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:3000/api/groups',
  params: {
  'groupName' => 'string',
'token' => 'string(uuid)'
}, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:3000/api/groups', params={
  'groupName': 'string',  'token': '497f6eca-6276-4993-bfeb-53cbbbba6f08'
}, headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:3000/api/groups', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/groups?groupName=string&token=497f6eca-6276-4993-bfeb-53cbbbba6f08");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:3000/api/groups", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/groups`

*Create a new Group associated to a user*

<h3 id="postgroup-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|groupName|query|string|true|name given to the group that will be created|
|description|query|string|false|description of the group|
|token|query|string(uuid)|true|token of the user that wants to create a group|

> Example responses

> 201 Response

```json
[
  {
    "groupId": "57b2a8e5-df74-4b9b-b8e1-80c48a894ed5",
    "description": "string",
    "userId": "36e3b1b0-cc72-498b-bd51-1385c5183b05"
  }
]
```

<h3 id="postgroup-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Group Created successfully|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid Request because of a missing Parameter or invalid body content|Inline|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Access denied|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error not expected|None|

<h3 id="postgroup-responseschema">Response Schema</h3>

Status Code **201**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» groupId|string(uuid)|false|none|none|
|» description|string|true|none|Basketball games I want to watch|
|» userId|string(uuid)|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## getGroup

<a id="opIdgetGroup"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://localhost:3000/api/groups/group?groupId=497f6eca-6276-4993-bfeb-53cbbbba6f08&token=497f6eca-6276-4993-bfeb-53cbbbba6f08 \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
GET http://localhost:3000/api/groups/group?groupId=497f6eca-6276-4993-bfeb-53cbbbba6f08&token=497f6eca-6276-4993-bfeb-53cbbbba6f08 HTTP/1.1
Host: localhost:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/groups/group?groupId=497f6eca-6276-4993-bfeb-53cbbbba6f08&token=497f6eca-6276-4993-bfeb-53cbbbba6f08',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.get 'http://localhost:3000/api/groups/group',
  params: {
  'groupId' => 'string(uuid)',
'token' => 'string(uuid)'
}, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:3000/api/groups/group', params={
  'groupId': '497f6eca-6276-4993-bfeb-53cbbbba6f08',  'token': '497f6eca-6276-4993-bfeb-53cbbbba6f08'
}, headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','http://localhost:3000/api/groups/group', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/groups/group?groupId=497f6eca-6276-4993-bfeb-53cbbbba6f08&token=497f6eca-6276-4993-bfeb-53cbbbba6f08");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:3000/api/groups/group", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/groups/group`

*Get a specific group*

<h3 id="getgroup-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|groupId|query|string(uuid)|true|Token of the group to get|
|token|query|string(uuid)|true|user token associated with the specific group|

> Example responses

> 200 Response

```json
[
  {
    "groupId": "57b2a8e5-df74-4b9b-b8e1-80c48a894ed5",
    "description": "string",
    "userId": "36e3b1b0-cc72-498b-bd51-1385c5183b05"
  }
]
```

<h3 id="getgroup-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful response|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid Request because of a missing Parameter or invalid body content|Inline|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Access denied|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Resource not found|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error not expected|None|

<h3 id="getgroup-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» groupId|string(uuid)|false|none|none|
|» description|string|true|none|Basketball games I want to watch|
|» userId|string(uuid)|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## deleteEvent

<a id="opIddeleteEvent"></a>

> Code samples

```shell
# You can also use wget
curl -X DELETE http://localhost:3000/api/groups/group?groupId=497f6eca-6276-4993-bfeb-53cbbbba6f08&eventId=string&token=497f6eca-6276-4993-bfeb-53cbbbba6f08 \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
DELETE http://localhost:3000/api/groups/group?groupId=497f6eca-6276-4993-bfeb-53cbbbba6f08&eventId=string&token=497f6eca-6276-4993-bfeb-53cbbbba6f08 HTTP/1.1
Host: localhost:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/groups/group?groupId=497f6eca-6276-4993-bfeb-53cbbbba6f08&eventId=string&token=497f6eca-6276-4993-bfeb-53cbbbba6f08',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.delete 'http://localhost:3000/api/groups/group',
  params: {
  'groupId' => 'string(uuid)',
'eventId' => 'string',
'token' => 'string(uuid)'
}, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.delete('http://localhost:3000/api/groups/group', params={
  'groupId': '497f6eca-6276-4993-bfeb-53cbbbba6f08',  'eventId': 'string',  'token': '497f6eca-6276-4993-bfeb-53cbbbba6f08'
}, headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','http://localhost:3000/api/groups/group', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/groups/group?groupId=497f6eca-6276-4993-bfeb-53cbbbba6f08&eventId=string&token=497f6eca-6276-4993-bfeb-53cbbbba6f08");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "http://localhost:3000/api/groups/group", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /api/groups/group`

*Delete an event from a group*

<h3 id="deleteevent-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|groupId|query|string(uuid)|true|token of the group that will be altered|
|eventId|query|string|true|Id of the event that will be deleted|
|token|query|string(uuid)|true|token of the user that wants to delete an event from his group|

> Example responses

> 400 Response

```json
{
  "error": "Missing required parameter"
}
```

<h3 id="deleteevent-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Event was successfully deleted from the group|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid Request because of a missing Parameter or invalid body content|Inline|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Access denied|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Resource not found|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error not expected|None|

<h3 id="deleteevent-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## editGroup

<a id="opIdeditGroup"></a>

> Code samples

```shell
# You can also use wget
curl -X PUT http://localhost:3000/api/groups/group?token=497f6eca-6276-4993-bfeb-53cbbbba6f08&groupId=497f6eca-6276-4993-bfeb-53cbbbba6f08 \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
PUT http://localhost:3000/api/groups/group?token=497f6eca-6276-4993-bfeb-53cbbbba6f08&groupId=497f6eca-6276-4993-bfeb-53cbbbba6f08 HTTP/1.1
Host: localhost:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/groups/group?token=497f6eca-6276-4993-bfeb-53cbbbba6f08&groupId=497f6eca-6276-4993-bfeb-53cbbbba6f08',
{
  method: 'PUT',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.put 'http://localhost:3000/api/groups/group',
  params: {
  'token' => 'string(uuid)',
'groupId' => 'string(uuid)'
}, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.put('http://localhost:3000/api/groups/group', params={
  'token': '497f6eca-6276-4993-bfeb-53cbbbba6f08',  'groupId': '497f6eca-6276-4993-bfeb-53cbbbba6f08'
}, headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','http://localhost:3000/api/groups/group', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/groups/group?token=497f6eca-6276-4993-bfeb-53cbbbba6f08&groupId=497f6eca-6276-4993-bfeb-53cbbbba6f08");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "http://localhost:3000/api/groups/group", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /api/groups/group`

*Update a group, add an event or both. If parameter newEventId is null then the Group is just updated, otherwise the Event will be added to the group*

<h3 id="editgroup-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|token|query|string(uuid)|true|User token associated with the group|
|groupId|query|string(uuid)|true|Token of the group to be updated|
|newGroupName|query|string|false|New name for the group|
|newDescription|query|string|false|New description for the group|
|newEventId|query|string|false|New event to add to the group|

> Example responses

> 201 Response

```json
[
  {
    "groupId": "57b2a8e5-df74-4b9b-b8e1-80c48a894ed5",
    "description": "string",
    "userId": "36e3b1b0-cc72-498b-bd51-1385c5183b05"
  }
]
```

<h3 id="editgroup-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Group updated successfully|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid Request because of a missing Parameter or invalid body content|Inline|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Access denied|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error not expected|None|

<h3 id="editgroup-responseschema">Response Schema</h3>

Status Code **201**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» groupId|string(uuid)|false|none|none|
|» description|string|true|none|Basketball games I want to watch|
|» userId|string(uuid)|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="seca-api-users">Users</h1>

## postUser

<a id="opIdpostUser"></a>

> Code samples

```shell
# You can also use wget
curl -X POST http://localhost:3000/api/createUser?userName=string \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```http
POST http://localhost:3000/api/createUser?userName=string HTTP/1.1
Host: localhost:3000
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:3000/api/createUser?userName=string',
{
  method: 'POST',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'Authorization' => 'Bearer {access-token}'
}

result = RestClient.post 'http://localhost:3000/api/createUser',
  params: {
  'userName' => 'string'
}, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:3000/api/createUser', params={
  'userName': 'string'
}, headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'Authorization' => 'Bearer {access-token}',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','http://localhost:3000/api/createUser', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("http://localhost:3000/api/createUser?userName=string");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:3000/api/createUser", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /api/createUser`

*Create a new User*

<h3 id="postuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|userName|query|string|true|Name of the user that will be created|

> Example responses

> 201 Response

```json
{
  "userName": "Antonio Ascensão",
  "userId": "36e3b1b0-cc72-498b-bd51-1385c5183b05"
}
```

<h3 id="postuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|User created successfully|[User](#schemauser)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid Request because of a missing Parameter or invalid body content|Inline|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Error not expected|None|

<h3 id="postuser-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

# Schemas

<h2 id="tocS_Group">Group</h2>
<!-- backwards compatibility -->
<a id="schemagroup"></a>
<a id="schema_Group"></a>
<a id="tocSgroup"></a>
<a id="tocsgroup"></a>

```json
{
  "groupId": "57b2a8e5-df74-4b9b-b8e1-80c48a894ed5",
  "description": "string",
  "userId": "36e3b1b0-cc72-498b-bd51-1385c5183b05"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|groupId|string(uuid)|false|none|none|
|description|string|true|none|Basketball games I want to watch|
|userId|string(uuid)|true|none|none|

<h2 id="tocS_Event">Event</h2>
<!-- backwards compatibility -->
<a id="schemaevent"></a>
<a id="schema_Event"></a>
<a id="tocSevent"></a>
<a id="tocsevent"></a>

```json
{
  "id": "G5v0Z9Yc3BZyy",
  "name": "Phoenix Suns vs. Memphis Grizzlies",
  "date": "2024-02-03T00:30:00Z",
  "segment": {
    "id": "KZFzniwnSyZfZ7v7nE",
    "name": "Sports"
  },
  "genre": {
    "id": "KnvZfZ7vAde",
    "name": "Basketball"
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|true|none|none|
|name|string|true|none|none|
|date|string|true|none|none|
|segment|object|true|none|none|
|» id|string|false|none|none|
|» name|string|false|none|none|
|genre|object|true|none|none|
|» id|string|false|none|none|
|» name|string|false|none|none|

<h2 id="tocS_User">User</h2>
<!-- backwards compatibility -->
<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "userName": "Antonio Ascensão",
  "userId": "36e3b1b0-cc72-498b-bd51-1385c5183b05"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|userName|string|true|none|none|
|userId|integer(uuid)|true|none|none|

<h2 id="tocS_MissingParameter">MissingParameter</h2>
<!-- backwards compatibility -->
<a id="schemamissingparameter"></a>
<a id="schema_MissingParameter"></a>
<a id="tocSmissingparameter"></a>
<a id="tocsmissingparameter"></a>

```json
{
  "error": "Missing required parameter"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|error|string|false|none|none|

<h2 id="tocS_InvalidBody">InvalidBody</h2>
<!-- backwards compatibility -->
<a id="schemainvalidbody"></a>
<a id="schema_InvalidBody"></a>
<a id="tocSinvalidbody"></a>
<a id="tocsinvalidbody"></a>

```json
{
  "error": "Invalid body content"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|error|string|false|none|none|

<h1 id="storage">Storage</h1>

# Elastic

## TableType

| Name          | index  | Description                                               |
|---------------|--------|-----------------------------------------------------------|
| INDEX_USERS   | users  | storages the userName and password of each user           |
| INDEX_GROUPS  | groups | storages the GroupName, description, and a list of events |

### INDEX_GROUP

```json
{
  "_index":"groups","_id":"HCsLeowBsZ85YzGhBI4c","_version":3,"_seq_no":21,"_primary_term":2,"found":true,
  "_source":{
    "name":"Thuzys","description":"test1","userId":"BisueIwBsZ85YzGhG47_","events":[
      {
        "id":"Z7r9jZ1AdJ9uK","name":"New Orleans Pelicans vs. Phoenix Suns", 
        "image":"https://s1.ticketm.net/dam/a/b1c/4be191e2-6357-433c-a421-aa1ffb2e8b1c_1340051_EVENT_DETAIL_PAGE_16_9.jpg", 
        "sales":"1900-01-01T18:00:00Z - 2024-01-20T01:00:00Z","date":"2024-01-20T01:00:00Z","segment":"Sports", 
        "genre":"Basketball","subGenre":"NBA"
      }
  ], 
    "groupId":"HCsLeowBsZ85YzGhBI4c"
  }
}
```

### INDEX_USER

```json
{
  "_index":"users","_id":"BisueIwBsZ85YzGhG47_","_version":1,"_seq_no":0,"_primary_term":1,"found":true,
  "_source":
  {
    "password":"test","userName":"arthur"
  }
}
```
# Application Structure

## Server-Side (Node.js/Express):

### 1. Middleware and Dependencies:
- `cors`: Middleware for Cross-Origin Resource Sharing.
- `express`: Web framework for Node.js.
- `url`, `morgan`, `path`: Utility modules.
- `hbs`: Handlebars as the view engine.
- `passport`: Authentication middleware.
- `express-session`: Session middleware.

### 2. Initialization Functions:
- `secaWebInit`: Web application initialization.
- `secaApiInit`: API initialization.
- `secaDataElasticInit`: Initialization for Elasticsearch data.
- `secaServicesInit`: Initialization for services using Elasticsearch data.

### 3. Routes:
- Web and API routes for various functionalities.
- Authentication middleware (`secaSite.verifyAuthenticated`) for protected routes.
- API routes for group and event operations.

### 4. Passport Configuration:
- Serialization and deserialization for user authentication.

### 5. Static Files and Views:
- Serving static files (CSS, images) from the `public` directory.
- Handlebars as the view engine with partials.

### 6. Server Initialization:
- Server setup to listen on a specified port (`port` variable).

## Client-Side :

- **HTML/CSS/Client-Side Scripts:**
    - Likely, views are rendered using Handlebars on the server side.
    - Static files (CSS) served through `/site/css`.
    - A mix of server-rendered views and dynamic content loaded via client-side scripts.

- **Authentication Flow:**
    - Routes like `/site/auth` suggest authentication-related functionality.
    - Routes like `/site/signIn`, `/site/signUp`, `/site/signOut` handle user authentication.

- **Web Pages:**
    - Routes like `/site/home` and `/site/auth/home` render pages related to groups and events.

## Overall Structure:

- **MVC (Model-View-Controller):**
    - Likely follows an MVC pattern with routes, views (Handlebars), and services interacting with data.

- **Elasticsearch:**
    - Uses Elasticsearch for data storage with separate modules for users and groups.

- **API Endpoints:**
    - API routes (`/api/...`) for CRUD operations on groups, events, and user creation.

- **Web Application:**
    - Handles user authentication, group management, event management, etc.

# Elasticsearch and Web Application Mapping Overview

## 1. **Elasticsearch Indices:**
- Two primary indices: **INDEX_USERS** and **INDEX_GROUPS**.
- INDEX_USERS for user-related data and INDEX_GROUPS for group-related data.

## 2. **Server-Side Components (Express Application):**
- **Middleware:** Utilizes middleware such as `cors`, `morgan`, and `express-session` for enhanced functionality.
- **Routes:** Defines routes for handling web and API requests, including authentication routes.
- **Passport Configuration:** Implements serialization and deserialization for user authentication.
- **Static Files and Views:** Serves static files and utilizes Handlebars as the view engine.

## 3. **Client-Side Web Application Model:**
- **Group Class:** Represents a group with properties like `name`, `description`, `userId`, and `events` (array).
- **User Class:** Represents a user with properties `userName` and `password`.
- **Exported Functions:** Provides functions for various operations, including CRUD on groups, events, and users.

## 4. **Data Interaction:**
- **Initialization Functions:** Initializes Elasticsearch and application services.
- **Exported Functions:** Facilitate interaction with Elasticsearch for data retrieval and storage.
- **Class Instances:** Instances of Group and User classes handle data manipulation.

## 5. **Error Handling:**
- Custom error handling implemented for different scenarios, ensuring robustness.

## 6. **Additional Modules:**
- Imports external modules such as `tmEventsData` and `errors` for extended functionality.

## 7. **Web Application Workflow:**
- Users interact with the web application through defined routes.
- Data is stored and retrieved from Elasticsearch using the exported functions.
- Group and User classes encapsulate data and behavior, enhancing code organization.

## 8. **Conclusion:**
- Clear separation between client-side and server-side responsibilities.
- Elasticsearch serves as a persistent data store for user, group, and event-related information.
- Error handling ensures the application can manage potential issues during data operations.

# Getting started

## 1. **Installation steps:**
### Download Elasticsearch:
- Visit the official Elasticsearch website: https://www.elastic.co/downloads/elasticsearch.
- Download the version that is appropriate for your operating system.

### Unzip the Archive:
- Unzip the downloaded file to your preferred location.

### Configure Elasticsearch:
- Open the Elasticsearch configuration file. Typically, it's located in the config folder and is named elasticsearch.yml.
- Configure the settings according to your needs, such as the network port, allocated memory, etc.

### Access the Web Interface (Optional):
- **Open a web browser:**
  - Visit http://localhost:9200 to access the Elasticsearch web interface. This allows you to verify if Elasticsearch has started successfully.

## 2. **Start the server:**
- Initialize the elasticsearch application, running the elasticsearch.bat file located inside the unziped folder. The path should be something like "elasticsearch-8.11.2/bin" 
- Run the "seca-server.mjs" script
- **Open a web Browser:**
  - Visit http://localhost:3000/site/home for the web-site.
  - Visit http://localhost:3000/api/(...) for the API use.