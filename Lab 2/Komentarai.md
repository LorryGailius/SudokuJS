# JSON
Kadangi json neturi komentaru surasiau reikalavimus cia

1. Panaudoti ```string```, ```array```, ```integer```, ```number```

2. 76 eilute
```json
        "type": {
          "anyOf": [{ "type": "string", "enum": ["weapon", "consumable"] }]
        },
```

3. ```minimum``` (35/36 eilute)
```format``` (30 eilute)
```pattern``` (44/54 eilute)
```type``` </br>
4. 44/54 eilutes
```regex 
[a-zA-Z0-9_]{0,15}
```
```regex
[a-zA-Z0-9_]+@gmail.com
```

5. Panaudoti ```oneOf```(38 eilute) ir ```anyOf```(76 eilute)
6. 
```json
  "type": "object",
  "properties": {
    "game": {
      "type": "object",
      "properties": {
        "players": {
          "$ref": "#/definitions/playerList"
        },
        "enemies": {
          "$ref": "#/definitions/enemieList"
        }
      },
      "required": ["players", "enemies"]
    }
  },
```