# Response

## user

```
{

		"user": {
				"_id": String,
				"email": String,
				"password": String,
				"username": String,
				"accountname": String,
				"intro": String,
				"hearts": [],
				"isfollow": [],
				"following": [],
				"follower": [],
				"followerCount": Number,
				"followingCount": Number,
				"image": String,
				"token": String
		}

}
```

## image upload

```
 {
 		"fieldname": String,
 		"originalname": String,
 		"encoding": String,
 		"mimetype": String,
 		"destination": String,
 		"filename": String,
 		"path": String,
 		"size": Number
 }
```

## post

```
{
    "post": [
        {
            "id": String,
            "content": String,
            "image": String,
            "createdAt": String,
            "updatedAt": String,
            "hearted": false,
            "heartCount": 0,
            "commentCount": 0,
            "author": {
                "_id": "작성자 id",
                "username": "2",
                "accountname": "2",
                "intro": "",
                "image": "http://146.56.183.55:5050/Ellipse.png",
                "isfollow": true,
                "following": [],
                "follower": [
                    "follower id"
                ],
                "followerCount": 1,
                "followingCount": 0
            }
        }
    ]
}
```

## comment

```
{
    "comment": {
        "id": Sting,
        "content": Sting,
        "createdAt": Sting,
        "author": {
            "_id": "작성자 id",
            "username": "1",
            "accountname": "1",
            "intro": "1",
            "image": "1",
            "isfollow": false,
            "following": [],
            "follower": [],
            "followerCount": 0,
            "followingCount": 0
        }
    }
}
```

## product

```
{
		"product": {
				"id": String,
				"itemName": String,
				"price": Number,
				"link": String,
				"itemImage": String,
				"author": {
						"_id": "작성자 id",
						"username": "2",
						"accountname": "2",
						"intro": "2",
						"image": "2",
            "isfollow": false,
						"following": [],
						"follower": [
								"팔로워 한 사용자의 id"
						],
						"followerCount": 1,
						"followingCount": 0
				}
		}
}
```

## user 관련

### 회원가입 res

```
"user": {
		    "_id": String,
		    "username": String,
		    "email": String,
		    "accountname": String,
				"intro": String,
		    "image": String,
    }
}
```

### 로그인 res

```
{
    "user": {
        "_id": String,
        "username": String,
        "email": String,
        "accountname": String,
        "image": String,
        "token": String
    }
}
```

### 프로필 정보 불러오기 res

```
[
		{
		    "user": {
		        "_id": String,
		        "username": String,
		        "accountname": String,
		        "image": String,
		        "isfollow": false,
		        "following": [],
		        "follower": [],
		        "followerCount": 0,
		        "followingCount": 0
		    }
		}
]
```

### 프로필 수정

```
{
    "user": {
        "_id": String,
        "username": String,
        "accountname": String,
        "intro": String,
        "image": String,
        "following": [],
        "follower": [],
        "followerCount": Number,
        "followingCount": Number
    }
}
```

### 다른 사람 프로필 불러오기, 팔로우 하기

```
{
    "profile": {
        "_id": String,
        "username": String,
        "accountname": String,
        "intro": String,
        "image": String,
				"isfollow": Boolean,
        "following": [],
        "follower": [],
        "followerCount": Number,
        "followingCount": Number
    }
}
```

### 팔로잉 리스트 (내가 팔로우한)

```
[
		{
        "_id": String,
        "username": String,
        "accountname": String,
        "intro": String,
        "image": String,
				"isfollow": Boolean,
        "following": [],
        "follower": [
            "접속한 사용자의 id"
        ],
        "followerCount": 1,
        "followingCount": 0
    }
]
```

### 검색

```
[
    {
        "_id": String,
        "username": String,
        "accountname": String,
        "following": [],
        "follower": [],
        "followerCount": Number,
        "followingCount": Number
    }
]
```

## post 관련

```
{
    "post": [
        {
            "id": String,
            "content": String,
            "image": String,
            "createdAt": String,
            "updatedAt": String,
            "hearted": false,
            "heartCount": 0,
            "commentCount": 0,
            "author": {
                "_id": "작성자 id",
                "username": "2",
                "accountname": "2",
                "intro": "",
                "image": "http://146.56.183.55:5050/Ellipse.png",
                "isfollow": true,
                "following": [],
                "follower": [
                    "follower id"
                ],
                "followerCount": 1,
                "followingCount": 0
            }
        }
    ]
}
```

```json
"author": {
                "_id": "작성자 id",
                "username": "2",
                "accountname": "2",
                "intro": "",
                "image": "http://146.56.183.55:5050/Ellipse.png",
                "isfollow": true,
                "following": [],
                "follower": [
                    "follower id"
                ],
                "followerCount": 1,
                "followingCount": 0
            }
```

## Comment 관련

### Comment

```json
{
    "comment": {
        "id": Sting,
        "content": Sting,
        "createdAt": Sting,
        "author": {
            "_id": "작성자 id",
            "username": "1",
            "accountname": "1",
            "intro": "1",
            "image": "1",
            "isfollow": false,
            "following": [],
            "follower": [],
            "followerCount": 0,
            "followingCount": 0
        }
    }
}
```
