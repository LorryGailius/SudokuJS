# XML Schema

1. Paprastas tipas, apribojantis kokį nors Schema standartinį tipą,
```xml
    <xs:simpleType name="PositiveInteger">
        <xs:restriction base="xs:integer">
            <xs:minInclusive value="0" />
        </xs:restriction>
    </xs:simpleType>
```

2. Prasmingas sąrašo tipas (list type)
```xml
    <xs:complexType name="StatsType">
        <xs:sequence>
            <xs:element name="stat" type="rpg:StatType" maxOccurs="unbounded" />
        </xs:sequence>
    </xs:complexType>
```

3. Sudėtingi tipai su paprastu turiniu
```xml
    <xs:element name="gmailAddress">
        <xs:simpleType>
            <xs:restriction base="xs:string">
                <xs:pattern
                    value="[a-zA-Z0-9_]+@gmail.com" />
            </xs:restriction>
        </xs:simpleType>
    </xs:element>
```

```xml
    <xs:complexType name="StatType">
        <xs:attribute name="name" type="xs:string" />
        <xs:attribute name="value" type="xs:integer" />
    </xs:complexType>
```

4. Sudėtingi tipai su sudėtingu turiniu
```xml
    <xs:complexType name="EnemyType">
        <xs:sequence>
            <xs:element name="health" type="rpg:PositiveInteger" />
            <xs:element name="damage" type="rpg:PositiveInteger" />
        </xs:sequence>
        <xs:attribute name="race" type="xs:string" />
    </xs:complexType>
```

```xml

```

5. PositiveInteger tipas apriboja žaidėjo health ir damage reikšmes, jos visada turi būti teigiamos

6. Sudėtingas tipas su mišriu turiniu
```xml
    <xs:complexType name="PlayerType">
        <xs:sequence>
            <xs:element name="birthday" type="xs:date" />
            <xs:element name="health" type="rpg:PositiveInteger" />
            <xs:element name="damage" type="rpg:PositiveInteger" />
            <xs:element name="items" type="rpg:ItemsType" />
            <xs:element name="login" type="rpg:LoginType" />
        </xs:sequence>
        <xs:attribute name="name" type="xs:string" use="required" />
        <xs:attribute name="class" type="xs:string" use="required" />
    </xs:complexType>
```

7. choice valdymo struktūra,
```xml
    <xs:complexType name="LoginType">
        <xs:choice>
            <xs:element name="facebook">
                <xs:simpleType>
                    <xs:restriction base="xs:string">
                        <xs:pattern value="[a-zA-Z0-9_]{0,15}" />
                    </xs:restriction>
                </xs:simpleType>
            </xs:element>
            <xs:element name="gmailAddress">
                <xs:simpleType>
                    <xs:restriction base="xs:string">
                        <xs:pattern
                            value="[a-zA-Z0-9_]+@gmail.com" />
                    </xs:restriction>
                </xs:simpleType>
            </xs:element>
        </xs:choice>
    </xs:complexType>
```

8. Bent viena nuoroda (keyref) į unikalumo ribojimą (unique) arba raktą (key)
```xml
    <xs:element name="game" type="rpg:GameType">
        <xs:key name="playerNameKey">
            <xs:selector xpath=".//rpg:player" />
            <xs:field xpath="@name" />
        </xs:key>
        <xs:keyref name="playerRef" refer="rpg:playerNameKey">
            <xs:selector xpath=".//rpg:items/rpg:item" />
            <xs:field xpath="@owner" />
        </xs:keyref>
    </xs:element>
```