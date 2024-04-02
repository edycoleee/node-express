# Siswa API Spec

## 1. Search Contact API

Endpoint : GET /api/siswa

Query params :

- name : Search by first_name or last_name, using like, optional
- email : Search by email using like, optional
- phone : Search by phone using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Silmi",
      "last_name": "Ayra",
      "email": "silmi@gmail.com",
      "phone": "32423423434"
    },
    {
      "id": 2,
      "first_name": "Nafi",
      "last_name": "Dhafin",
      "email": "afin@gmail.com",
      "phone": "112233445566"
    }
  ]
}
```

Response Body Error :

## 2. Get Contact API

Endpoint : GET /api/siswa/:id

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "first_name": "Silmi",
    "last_name": "Ayra",
    "email": "silmi@gmail.com",
    "phone": "32423423434"
  }
}
```

Response Body Error :

```json
{
  "errors": "Siswa is not found"
}
```

## 3. Create Siswa API

Endpoint : POST /api/siswa

Request Body :

```json
{
  "first_name": "Silmi",
  "last_name": "Ayra",
  "email": "silmi@gmail.com",
  "phone": "32423423434"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "first_name": "Silmi",
    "last_name": "Ayra",
    "email": "silmi@gmail.com",
    "phone": "32423423434"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email is not valid format"
}
```

## 4. Remove Contact API

Endpoint : DELETE /api/siswa/:id

Response Body Success :

```json
{
  "data": {
    {
  "first_name": "Silmi",
  "last_name": "Ayra",
  "email": "silmi@gmail.com",
  "phone": "32423423434"
}
  }
}
```

Response Body Error :

```json
{
  "errors": "Siswa is not found"
}
```

## 5. Update Contact API

Endpoint : PUT /api/siswa/:id

Request Body :

```json
{
  "first_name": "Silmi",
  "last_name": "Ayra",
  "email": "silmi@gmail.com",
  "phone": "32423423434"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "first_name": "Silmi",
    "last_name": "Ayra",
    "email": "silmi@gmail.com",
    "phone": "32423423434"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email is not valid format"
}
```