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
- [ ] add pagination
- [ ] fix spagheti on getGameById
- [ ] add buttons to filter
- [X] add wishlisted games
- [ ] ~~change to mongoose~~
- [ ] treat delete errors
- [ ] make bought date only required if bought
- [ ] add played tag


## Known Bugs
- [ ] fix platform changing on update
- [ ] on responsive search close, changee search to ''


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
- [ ] add scroll pagination/ lazy loading
