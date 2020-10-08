// UPDATE role SET title="SW Eng" WHERE id = 1;
query = "UPDATE role SET title=/ WJERE id = ?"
connection.query(query, ([{title: "SW Eng"}, {id: 1}], function(err) {

}))