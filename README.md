## My Games Collection

a quick application to store/display my games collections

### TODO: 
- [X] configure project
- [X] fix grid height
- [X] configure DB
- [X] configure routes
  - [X] POST
  - [X] GET
  - [X] PATCH
  - [X] DELETE
- [X] make adding page
- [X] make searchbar
- [X] add api key security
- [X] add details page
- [X] add filter by console
- [X] add delete option
- [X] add edit options
- [X] add pagination
- [ ] fix spagheti on getGameById
- [X] add buttons to filter
- [X] add wishlisted games
- [ ] ~~change to mongoose~~
- [ ] treat delete errors
- [X] make bought date only required if bought
- [X] add played tag
- [X] add select for platform
- [ ] add a easy way to show what games are not complete


## Known Bugs
- [X] fix platform changing on update
- [X] on responsive search close, changee search to ''


## game entry format

```json
{
  bought:Boolean,
  title:String,
  platform:Enum??,
  mainImage:String,
  boughtDate:number
}
```

### future ideas
- [ ] add "light" mode
- [ ] add indie games list
- [ ] add automation with different apis
- [ ] add scanning price tag
- [ ] ADD MULTIPLE USERS